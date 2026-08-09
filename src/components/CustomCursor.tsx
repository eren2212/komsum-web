import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const ACCENT = "rgb(255, 107, 48)";
const DARK = "rgb(128, 128, 128)";

/** Relative luminance of an `rgb()/rgba()` string, or null if transparent. */
function luminance(rgb: string): number | null {
  const m = rgb.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const [r, g, b, a = 1] = m[1].split(",").map((s) => parseFloat(s));
  if (!a) return null; // fully transparent → keep looking up the tree
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

/** Walk up from an element to the first opaque background and read its luminance. */
function bgLuminanceAt(el: Element | null): number {
  let node: Element | null = el;
  while (node) {
    const l = luminance(getComputedStyle(node).backgroundColor);
    if (l !== null) return l;
    node = node.parentElement;
  }
  return 1; // assume light
}

const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor-grow]";

/**
 * CustomCursor — a soft "bubble" that trails the pointer, swells over links,
 * and flips colour for contrast: black on light/orange backgrounds, orange on
 * dark ones. Desktop (fine pointer) only; touch devices keep the native cursor.
 */
export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 35, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 500, damping: 35, mass: 0.8 });

  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState(DARK);
  const frame = useRef<number>();

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-bubble");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      // Sample background + interactivity at most once per frame.
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = undefined;
        const el = document.elementFromPoint(e.clientX, e.clientY);
        setHovering(!!el?.closest(INTERACTIVE));
        setColor(bgLuminanceAt(el) < 0.5 ? ACCENT : DARK);
      });
    };
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseenter", show);
    document.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", show);
      document.removeEventListener("mouseleave", hide);
      document.documentElement.classList.remove("cursor-bubble");
      if (frame.current) cancelAnimationFrame(frame.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 box-border bg-white/30"
        style={{ borderColor: color, borderStyle: "solid" }}
        animate={{
          width: hovering ? 64 : 22,
          height: hovering ? 64 : 22,
          borderWidth: 0.5,
          opacity: visible ? 1 : 0,
          borderRadius: hovering
            ? "42% 58% 56% 44% / 53% 46% 54% 47%"
            : "50%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
    </motion.div>
  );
}

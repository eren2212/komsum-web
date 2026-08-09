import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type CardsProgress = {
  /** True while the horizontal cards section is pinned in the viewport. */
  active: boolean;
  /** Index of the currently focused card. */
  index: number;
  /** Total number of cards. */
  count: number;
};

type Ctx = CardsProgress & {
  setCardsProgress: (p: Partial<CardsProgress>) => void;
};

const ScrollProgressContext = createContext<Ctx | null>(null);

export function ScrollProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CardsProgress>({
    active: false,
    index: 0,
    count: 5,
  });

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      setCardsProgress: (p) => setState((s) => ({ ...s, ...p })),
    }),
    [state]
  );

  return (
    <ScrollProgressContext.Provider value={value}>
      {children}
    </ScrollProgressContext.Provider>
  );
}

export function useScrollProgress() {
  const ctx = useContext(ScrollProgressContext);
  if (!ctx)
    throw new Error(
      "useScrollProgress must be used within a ScrollProgressProvider"
    );
  return ctx;
}

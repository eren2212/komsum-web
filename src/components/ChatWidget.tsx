import { useEffect, useRef, useState, type FormEvent } from "react";
import { sendChatMessage, type ChatTurn } from "../lib/chatApi";

type ChatMessage = {
  id: string;
  role: "user" | "model";
  text: string;
  isError?: boolean;
};

const STORAGE_KEY = "komsum_chat_history";
const SEND_COOLDOWN_MS = 1000;

const GREETING: ChatMessage = {
  id: "greeting",
  role: "model",
  text: "Merhaba! Ben Komşum'un dijital komşusuyum 👋 Uygulama hakkında merak ettiğin bir şey var mı?",
};

function loadHistory(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [GREETING];
    const parsed = JSON.parse(raw) as ChatMessage[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [GREETING];
  } catch {
    return [GREETING];
  }
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadHistory());
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const lastSentRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // sessionStorage unavailable (private mode, etc.) — conversation just won't persist
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    const now = Date.now();
    if (!trimmed || isLoading || now - lastSentRef.current < SEND_COOLDOWN_MS) return;
    lastSentRef.current = now;

    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", text: trimmed };
    const history: ChatTurn[] = messages
      .filter((m) => m.id !== "greeting" && !m.isError)
      .map((m) => ({ role: m.role, text: m.text }));

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const reply = await sendChatMessage(trimmed, history);
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "model", text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "model",
          text:
            err instanceof Error
              ? err.message
              : "Şu anda cevap veremiyorum, lütfen daha sonra tekrar dene.",
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([GREETING]);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end sm:bottom-6 sm:right-6">
      {isOpen && (
        <div
          role="dialog"
          aria-label="Komşum sohbet asistanı"
          className="mb-3 flex h-[70vh] max-h-[520px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-bg-dark px-5 py-4 text-white">
            <div>
              <p className="font-display text-lg leading-none">Komşum Asistanı</p>
              <p className="mt-1 text-xs text-white/80">Genelde birkaç saniyede yanıtlar</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleReset}
                aria-label="Sohbeti temizle"
                className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              >
                <ResetIcon />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Sohbeti kapat"
                className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto bg-bg-light px-4 py-4"
          >
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <p
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-bg-dark text-white"
                      : m.isError
                      ? "rounded-bl-sm border border-red-200 bg-red-50 text-red-700"
                      : "rounded-bl-sm bg-white text-text-dark shadow-sm ring-1 ring-black/5"
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm ring-1 ring-black/5">
                  <TypingDot delay="0ms" />
                  <TypingDot delay="150ms" />
                  <TypingDot delay="300ms" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t border-black/10 p-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Bir şey sor..."
              aria-label="Mesajınız"
              maxLength={2000}
              className="flex-1 rounded-full border border-black/10 bg-bg-light px-4 py-2.5 text-sm text-text-dark outline-none transition-colors focus:border-bg-dark"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Gönder"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-dark text-white transition-transform disabled:opacity-40 enabled:hover:scale-105 enabled:active:scale-95"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Sohbeti kapat" : "Sohbeti aç"}
        aria-expanded={isOpen}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-bg-dark text-white shadow-lg ring-2 ring-white/20 transition-transform hover:scale-105 active:scale-95"
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>
    </div>
  );
}

function TypingDot({ delay }: { delay: string }) {
  return (
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-text-muted"
      style={{ animationDelay: delay }}
    />
  );
}

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H9l-4.5 4V5.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 11.5 20 4l-6.5 17-3-7-7.5-2.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12a8 8 0 1 1 2.6 5.9M4 12V7m0 5h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

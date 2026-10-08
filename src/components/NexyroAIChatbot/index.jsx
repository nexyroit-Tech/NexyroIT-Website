import { useState, useEffect, useRef, useCallback } from "react";
import { chatAPI } from "../../services/chatbotAPI";

const SUGGESTED_QUESTIONS = [
  "What services does Nexyro IT provide?",
  "Tell me about Nexyro IT.",
  "What type of websites can you build?",
  "Can you develop a mobile application?",
  "Can I see your projects?",
  "I want to book a consultation.",
];

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content:
    "👋 Hi! I'm **Nexyro AI**, your intelligent assistant for Nexyro IT.\n\nI can help you learn about our services, projects, tech stack, development process, and even help you **schedule a free consultation** with our team.\n\nHow can I assist you today?",
  sources: [],
  timestamp: new Date(),
};

function formatMessage(text) {
  if (!text) return "";
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");
}

const TypingIndicator = () => (
  <div className="flex items-end gap-2 mb-4">
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#116466] to-[#D9B08C] flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
      AI
    </div>
    <div className="bg-white dark:bg-[#2C3531] border border-gray-200 dark:border-white/10 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
      <div className="flex gap-1.5 items-center h-5">
        <span
          className="w-2 h-2 rounded-full bg-[#116466] dark:bg-[#D9B08C] animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="w-2 h-2 rounded-full bg-[#116466] dark:bg-[#D9B08C] animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="w-2 h-2 rounded-full bg-[#116466] dark:bg-[#D9B08C] animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  </div>
);

const MessageBubble = ({ msg }) => {
  const isUser = msg.role === "user";
  return (
    <div
      className={`flex items-end gap-2 mb-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#116466] to-[#D9B08C] flex items-center justify-center flex-shrink-0 text-white text-xs font-bold shadow-md">
          AI
        </div>
      )}

      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[80%]`}>
        {/* Bubble */}
        <div
          className={`px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
            isUser
              ? "bg-gradient-to-br from-[#116466] to-[#0d4f50] text-white rounded-br-none"
              : "bg-white dark:bg-[#2C3531] border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-100 rounded-bl-none"
          }`}
          dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
        />

        {/* Sources */}
        {!isUser && msg.sources && msg.sources.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {msg.sources.map((src, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-full bg-[#116466]/10 dark:bg-[#D9B08C]/10 text-[#116466] dark:text-[#D9B08C] border border-[#116466]/20 dark:border-[#D9B08C]/20 font-medium"
              >
                📖 {src.source}
              </span>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 px-1">
          {new Date(msg.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D9B08C] to-[#FFCB9A] flex items-center justify-center flex-shrink-0 text-[#2C3531] text-xs font-bold shadow-md">
          U
        </div>
      )}
    </div>
  );
};

export default function NexyroAIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [hasOpened, setHasOpened] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setHasOpened(true);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const getConversationHistory = () =>
    messages
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }));

  const addMessage = (role, content, sources = []) => {
    const msg = {
      id: `${role}_${Date.now()}`,
      role,
      content,
      sources,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, msg]);
    if (role === "assistant" && !isOpen) {
      setUnreadCount((c) => c + 1);
    }
    return msg;
  };

  const sendMessage = async (text) => {
    const trimmed = (text || inputValue).trim();
    if (!trimmed || isLoading) return;

    setInputValue("");
    setShowSuggestions(false);
    setError(null);
    addMessage("user", trimmed);
    setIsLoading(true);

    try {
      const history = getConversationHistory();
      const data = await chatAPI.sendMessage(trimmed, history);
      addMessage("assistant", data.answer, data.sources || []);
    } catch (err) {
      console.error("Chat error:", err);
      setError("Connection issue. Please try again.");
      addMessage(
        "assistant",
        "I'm having trouble connecting to my knowledge base right now. Please try again in a moment, or contact Nexyro IT directly at **nexyroit@gmail.com** or **+92 3221793231**.",
        []
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([WELCOME_MESSAGE]);
    setShowSuggestions(true);
    setError(null);
    setInputValue("");
  };

  const toggleChat = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Tooltip hint on first load */}
        {!hasOpened && !isOpen && (
          <div className="animate-bounce bg-white dark:bg-[#2C3531] border border-gray-200 dark:border-white/10 shadow-lg rounded-xl px-3 py-2 text-xs text-gray-700 dark:text-gray-200 max-w-[160px] text-center">
            💬 Ask Nexyro AI anything!
          </div>
        )}

        <button
          id="nexyro-ai-toggle-btn"
          onClick={toggleChat}
          aria-label={isOpen ? "Close AI Assistant" : "Open Nexyro AI Assistant"}
          className={`relative flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-sm shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
            isOpen
              ? "bg-gray-700 text-white"
              : "bg-gradient-to-r from-[#116466] to-[#0d4f50] text-white hover:shadow-[#116466]/40 hover:shadow-lg"
          }`}
        >
          <span className="text-lg">{isOpen ? "✕" : "🤖"}</span>
          <span>{isOpen ? "Close" : "Ask Nexyro AI"}</span>
          {/* Unread badge */}
          {!isOpen && unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D9B08C] text-[#2C3531] text-xs rounded-full flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
          {/* Pulse ring */}
          {!isOpen && !hasOpened && (
            <span className="absolute inset-0 rounded-full animate-ping bg-[#116466]/30 pointer-events-none" />
          )}
        </button>
      </div>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[370px] max-w-[calc(100vw-24px)] flex flex-col rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
        style={{ maxHeight: "calc(100vh - 120px)" }}
        role="dialog"
        aria-label="Nexyro AI Assistant"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#116466] to-[#0d4f50]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl backdrop-blur-sm">
              🤖
            </div>
            <div>
              <h3 className="text-white font-bold text-sm leading-tight">Nexyro AI</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFCB9A] animate-pulse" />
                <span className="text-white/70 text-xs">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              id="nexyro-ai-clear-btn"
              onClick={clearConversation}
              title="Clear conversation"
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-xs"
            >
              🗑️
            </button>
            <button
              id="nexyro-ai-close-btn"
              onClick={toggleChat}
              title="Close"
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50 dark:bg-[#1e2825] custom-scrollbar"
          style={{ minHeight: "300px", maxHeight: "420px" }}
        >
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}

          {isLoading && <TypingIndicator />}

          {/* Suggested Questions */}
          {showSuggestions && messages.length === 1 && !isLoading && (
            <div className="mt-2 mb-1">
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-medium">
                Suggested questions:
              </p>
              <div className="flex flex-col gap-2">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    id={`suggestion-btn-${i}`}
                    onClick={() => sendMessage(q)}
                    className="text-left text-xs px-3 py-2 rounded-xl border border-[#116466]/30 dark:border-[#D9B08C]/20 text-[#116466] dark:text-[#D9B08C] hover:bg-[#116466]/10 dark:hover:bg-[#D9B08C]/10 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Error banner */}
        {error && (
          <div className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs border-t border-red-100 dark:border-red-800">
            ⚠️ {error}
          </div>
        )}

        {/* Input Area */}
        <div className="px-3 py-3 bg-white dark:bg-[#2C3531] border-t border-gray-200 dark:border-white/10">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              id="nexyro-ai-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about Nexyro IT..."
              rows={1}
              disabled={isLoading}
              className="flex-1 resize-none px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1e2825] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#116466] focus:border-transparent transition-all max-h-28 custom-scrollbar"
              style={{ lineHeight: "1.5" }}
            />
            <button
              id="nexyro-ai-send-btn"
              onClick={() => sendMessage()}
              disabled={!inputValue.trim() || isLoading}
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#116466] to-[#0d4f50] text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md"
              aria-label="Send message"
            >
              <svg className="w-4 h-4 rotate-45" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5 text-center">
            Powered by Nexyro IT
          </p>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { Sparkles, X, Send } from "lucide-react";

const mockConversation = [
  {
    id: 1,
    type: "ai",
    message: "Olá! Sou a Clara, sua assistente de IA. Como posso ajudar você hoje?",
    timestamp: "10:30",
  },
  {
    id: 2,
    type: "user",
    message: "Qual o status atual do sistema?",
    timestamp: "10:31",
  },
  {
    id: 3,
    type: "ai",
    message: "O sistema está operando com 99.982% de uptime. Throughput atual é de 1,284 req/min (+5.9% vs mês anterior). Latência P50 está em 112ms. Tudo funcionando perfeitamente! 🎉",
    timestamp: "10:31",
  },
  {
    id: 4,
    type: "user",
    message: "Existem erros críticos?",
    timestamp: "10:32",
  },
  {
    id: 5,
    type: "ai",
    message: "Não há erros críticos no momento. A taxa de erro está em apenas 0.23% (+12% vs mês anterior, mas ainda dentro do normal). O último erro registrado foi há 1h.",
    timestamp: "10:32",
  },
];

const suggestedQuestions = [
  "Qual o uptime atual?",
  "Analisar performance",
  "Ver últimos erros",
  "Status dos deploys",
];

export function ClaraAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(mockConversation);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user" as const,
      message: text,
      timestamp: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: "ai" as const,
        message:
          "Esta é uma resposta simulada da Clara. Em produção, aqui seria integrado com uma API de IA real.",
        timestamp: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[1000]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-all group"
          aria-label="Abrir assistente Clara"
        >
          <Sparkles size={24} className="text-white" />
          <span className="absolute right-16 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Pergunte para Clara
          </span>
        </button>
      ) : (
        <div className="w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
          {/* Header */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-5 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Sparkles size={20} className="text-purple-600" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Clara</h3>
                <p className="text-xs text-white/80">Assistente IA • Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
              aria-label="Fechar assistente"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4 scroll-smooth">
            {messages.length === 0 && (
              <div className="flex flex-col gap-2 mt-4">
                <p className="text-xs text-gray-500 text-center mb-2">
                  Perguntas sugeridas:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(q)}
                      className="bg-gray-100 text-gray-600 rounded-full px-4 py-2 text-xs hover:bg-gray-200 cursor-pointer transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.type === "user"
                      ? "bg-purple-600 text-white rounded-br-sm"
                      : "bg-white text-gray-900 border border-gray-200 rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <span
                    className={`text-xs mt-1 block ${
                      msg.type === "user" ? "text-purple-200" : "text-gray-400"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm p-4">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && sendMessage(inputValue)
                }
                placeholder="Digite sua pergunta..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm outline-none"
              />
              <button
                onClick={() => sendMessage(inputValue)}
                disabled={!inputValue.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-600 hover:text-purple-700 disabled:text-gray-300 transition-colors"
                aria-label="Enviar mensagem"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


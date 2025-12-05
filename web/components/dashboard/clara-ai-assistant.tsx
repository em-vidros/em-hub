"use client";

import { useState, useCallback, useMemo, memo } from "react";
import { Sparkles, X, Send } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

interface ClaraAIAssistantProps {
  /**
   * Quando definido, o componente passa a ser controlado externamente.
   * Caso contrário, usa o estado interno padrão (floating button).
   */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Variante visual:
   * - "floating": comportamento original (botão flutuante no canto).
   * - "sheet": ocupa a tela inteira, ideal para mobile.
   */
  variant?: "floating" | "sheet";
  /**
   * Esconde o gatilho padrão (botão flutuante) quando controlado de fora.
   */
  hideDefaultTrigger?: boolean;
}

function ClaraAIAssistantComponent({
  open,
  onOpenChange,
  variant = "floating",
  hideDefaultTrigger = false,
}: ClaraAIAssistantProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [messages, setMessages] = useState(mockConversation);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  const handleOpen = useCallback(() => setOpen(true), [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const sendMessage = useCallback(async (text: string) => {
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
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value),
    []
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        sendMessage(inputValue);
      }
    },
    [inputValue, sendMessage]
  );

  const handleSendClick = useCallback(() => {
    sendMessage(inputValue);
  }, [inputValue, sendMessage]);

  const suggestedQuestionsButtons = useMemo(
    () =>
      suggestedQuestions.map((q, idx) => (
        <Button
          key={idx}
          variant="outline"
          onClick={() => sendMessage(q)}
          className="bg-gray-100 text-gray-600 rounded-full px-4 py-2 text-xs hover:bg-gray-200 h-auto"
        >
          {q}
        </Button>
      )),
    [sendMessage]
  );

  const messagesList = useMemo(
    () =>
      messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[75%] px-3 py-2 rounded-lg ${
              msg.type === "user"
                ? "bg-teal-600 text-white"
                : "bg-white text-gray-900 border border-gray-200"
            }`}
          >
            <p className="text-sm leading-relaxed">{msg.message}</p>
            <span
              className={`text-xs mt-1 block ${
                msg.type === "user" ? "text-teal-200" : "text-gray-400"
              }`}
            >
              {msg.timestamp}
            </span>
          </div>
        </div>
      )),
    [messages]
  );

  const shell = (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
            <Sparkles className="text-teal-600" size={18} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Clara</h3>
            <p className="text-xs text-gray-500">Assistente IA</p>
          </div>
        </div>
        <SheetClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            aria-label="Fechar assistente"
          >
            <X size={18} />
          </Button>
        </SheetClose>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3 scroll-smooth">
        {messages.length === 0 && (
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-xs text-gray-500 text-center mb-2">
              Perguntas sugeridas:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedQuestionsButtons}
            </div>
          </div>
        )}

        {messagesList}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg px-3 py-2">
              <div className="flex gap-1">
                <div
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-100 bg-white">
        <div className="relative">
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua pergunta..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-gray-50 focus:bg-white"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSendClick}
            disabled={!inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-teal-600 hover:text-teal-700 disabled:text-gray-300"
            aria-label="Enviar mensagem"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );

  if (variant === "sheet") {
    return (
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="h-[90vh] max-w-xl rounded-t-3xl p-0 lg:hidden"
        >
          {shell}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 z-[1000]">
      <div
        className="relative transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: isOpen ? "400px" : "44px",
          height: isOpen ? "600px" : "44px",
          borderRadius: isOpen ? "1rem" : "9999px",
          backgroundColor: isOpen ? "#FFFFFF" : "rgba(20, 184, 166, 0.3)",
          backdropFilter: isOpen ? "none" : "blur(8px)",
          boxShadow: isOpen
            ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            : "0 4px 12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(20, 184, 166, 0.1)",
          transform: isOpen ? "scale(1)" : "scale(1)",
        }}
      >
        {!isOpen && !hideDefaultTrigger && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleOpen}
            className="absolute inset-0 h-full w-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Abrir assistente Clara"
          >
            <Sparkles className="text-teal-600" size={20} strokeWidth={1.5} />
          </Button>
        )}
        {isOpen && shell}
      </div>
    </div>
  );
}

export const ClaraAIAssistant = memo(ClaraAIAssistantComponent);


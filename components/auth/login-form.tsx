"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const VALID_EMAIL = "admin@emvidros.com";
const VALID_PASSWORD = "admin123";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState(VALID_EMAIL);
  const [password, setPassword] = useState(VALID_PASSWORD);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const isValid = email === VALID_EMAIL && password === VALID_PASSWORD;

    if (!isValid) {
      setError("Credenciais inválidas. Tente novamente.");
      setIsSubmitting(false);
      return;
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem("emhub_auth", "true");
    }

    router.push("/diretoria");
  }

  return (
    <div className="w-full max-w-sm rounded-xl bg-card p-8 shadow-sm">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-semibold tracking-tight">
          EM Hub – EM Vidros
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Acesse o painel para acompanhar os indicadores da operação.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {error ? (
          <p className="text-sm font-medium text-destructive">{error}</p>
        ) : null}
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Use <span className="font-medium">{VALID_EMAIL}</span> /
          <span className="font-medium"> {VALID_PASSWORD}</span> para testar.
        </p>
      </form>
    </div>
  );
}



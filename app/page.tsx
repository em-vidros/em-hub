"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/diretoria");
    } else {
      router.replace("/login");
    }
  }, [router]);

  // Pequeno placeholder enquanto redireciona.
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted">
      <p className="text-xs text-muted-foreground">
        Redirecionando para o painel...
      </p>
    </main>
  );
}

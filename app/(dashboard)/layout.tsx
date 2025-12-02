"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  PieChart,
  Package,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Gauge,
  Shield,
  DollarSign,
  CheckCircle2,
  Users,
  Boxes,
  Workflow,
  AlertTriangle,
  BarChart3,
  Target,
  Zap,
  UserRound,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clearAuthFlag, isAuthenticated } from "@/lib/auth";
import { ClaraAIAssistant } from "@/components/dashboard/clara-ai-assistant";

interface NavSection {
  title?: string;
  items: Array<{ href: string; label: string; icon: any }>;
}

const NAV_SECTIONS: NavSection[] = [
  {
    items: [
      { href: "/", label: "Visão Geral", icon: LayoutDashboard },
    ],
  },
  {
    title: "Operacional",
    items: [
      { href: "/diretoria", label: "Diretoria", icon: UserRound },
      { href: "/producao", label: "Produção", icon: Activity },
      { href: "/comercial", label: "Comercial", icon: PieChart },
      { href: "/estoque", label: "Estoque", icon: Package },
    ],
  },
  {
    title: "Insights",
    items: [
      { href: "/performance", label: "Performance", icon: TrendingUp },
      { href: "/eficiencia", label: "Eficiência", icon: Gauge },
      { href: "/seguranca", label: "Segurança", icon: Shield },
      { href: "/custos", label: "Custos", icon: DollarSign },
      { href: "/qualidade", label: "Qualidade", icon: CheckCircle2 },
    ],
  },
  {
    title: "Análises",
    items: [
      { href: "/clientes", label: "Clientes", icon: Users },
      { href: "/produtos", label: "Produtos", icon: Boxes },
      { href: "/processos", label: "Processos", icon: Workflow },
      { href: "/riscos", label: "Riscos", icon: AlertTriangle },
    ],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
    }
  }, [router]);

  function handleLogout() {
    clearAuthFlag();
    router.replace("/login");
  }

  return (
    <div className="bg-[#F0EFEA] h-screen overflow-hidden font-sans">
      <div className="flex h-screen relative">
        <aside
          data-collapsed={isCollapsed ? "true" : "false"}
          className={`flex flex-col transition-all duration-300 ease-in-out text-[11px] md:text-xs ${
            isCollapsed ? "w-16 p-2" : "w-56 p-4"
          }`}
        >
        <div className={`mb-6 flex items-center ${isCollapsed ? "justify-center" : ""} px-2`}>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold shadow-sm flex-shrink-0">
              EM
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="text-sm font-semibold tracking-tight text-gray-900">EM Hub</span>
                <span className="text-[10px] font-medium text-gray-500">Observabilidade</span>
          </div>
            )}
          </div>
        </div>
        
        <nav className="flex-1 space-y-3">
          {NAV_SECTIONS.map((section, sectionIdx) => (
            <div key={sectionIdx} className="space-y-0.5">
              {section.title && !isCollapsed && (
                <div className="px-3 py-0.5">
                  <p className="text-xs font-medium text-gray-400">
                    {section.title}
                  </p>
                </div>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || (item.href === "/" && pathname === "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all outline-none ring-ring/50 focus-visible:ring-2 ${
                      active
                        ? "bg-white text-gray-900 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                        : "text-gray-500 hover:bg-white/50 hover:text-gray-900"
                    }`}
                  >
                    <Icon
                      className={`w-[18px] h-[18px] transition-colors ${
                        active
                          ? "text-gray-900"
                          : "text-gray-500 group-hover:text-gray-900"
                      }`}
                      strokeWidth={2.3}
                    />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
        
        <div className="mt-auto pt-4">
          <div className={`flex items-center gap-2 rounded-xl border border-gray-100 bg-white/50 p-2 ${isCollapsed ? "justify-center" : ""}`}>
            <Avatar className="h-8 w-8 rounded-lg border border-gray-100 flex-shrink-0">
              <AvatarFallback className="rounded-lg bg-gray-100 text-xs font-medium text-gray-500">EV</AvatarFallback>
          </Avatar>
            {!isCollapsed && (
              <>
                <div className="flex flex-1 flex-col overflow-hidden min-w-0">
                  <span className="truncate text-xs font-medium text-gray-900">Gestor EM</span>
                  <span className="truncate text-[10px] text-gray-500">admin@emvidros.com</span>
          </div>
          <Button
            type="button"
            size="icon"
                  variant="ghost"
                  className="h-7 w-7 flex-shrink-0 text-gray-500 hover:text-gray-900"
            onClick={handleLogout}
          >
                  <span className="sr-only">Sair</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" x2="9" y1="12" y2="12" />
                  </svg>
          </Button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Collapse Toggle Button - Positioned next to header */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-expanded={!isCollapsed}
        className={`absolute z-50 transition-all duration-300 ease-in-out
          w-8 h-8 bg-white rounded-full border border-gray-100 shadow-md
          flex items-center justify-center cursor-pointer hover:shadow-lg hover:scale-105
          active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
          ${isCollapsed ? "left-14" : "left-56"}`}
        style={{ top: "2.3rem", transform: "translateY(0)" }}
      >
        {isCollapsed ? (
          <ChevronRight size={16} className="text-gray-600" />
        ) : (
          <ChevronLeft size={16} className="text-gray-600" />
        )}
      </button>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white rounded-l-3xl shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_10px_30px_rgba(0,0,0,0.08)] ml-2">
        <header className="flex h-14 items-center justify-between border-b border-gray-100 bg-white px-6 rounded-tl-3xl">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-medium text-gray-900">Visão Geral</h1>
            <span className="h-4 w-px bg-gray-200"></span>
            <p className="text-sm text-gray-500">Painel de Controle</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block w-64">
              <span className="absolute left-2.5 top-2.5 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </span>
              <Input
                placeholder="Buscar..."
                className="h-9 rounded-full bg-gray-100 pl-8 text-xs focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-gray-200 border-gray-100" 
              />
            </div>
            <Button variant="outline" size="sm" className="h-8 rounded-full text-xs font-medium shadow-none border-gray-100 bg-transparent hover:bg-gray-100">
              Últimos 30 dias
            </Button>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 scroll-smooth">
          <div className="mx-auto max-w-7xl space-y-6">
            {children}
          </div>
        </div>
      </main>
      </div>
      <ClaraAIAssistant />
    </div>
  );
}



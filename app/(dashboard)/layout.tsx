"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
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
import { DashboardDockNav } from "@/components/dashboard/dashboard-dock-nav";

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

type SectionKey = "operacional" | "insights" | "analises";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  // Sidebar começa colapsada para telas menores e expande automaticamente em desktops
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionKey>("operacional");
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isMobileAIOpen, setIsMobileAIOpen] = useState(false);

  const groupRoutes = useMemo(
    () => ({
      operacional: NAV_SECTIONS[1]?.items ?? [],
      insights: NAV_SECTIONS[2]?.items ?? [],
      analises: NAV_SECTIONS[3]?.items ?? [],
    }),
    []
  );

  // Deriva o grupo ativo com base na rota atual
  useEffect(() => {
    const matchGroup: SectionKey =
      (["operacional", "insights", "analises"] as SectionKey[]).find((group) =>
        groupRoutes[group].some((item) => item.href === pathname)
      ) ?? "operacional";

    setActiveSection(matchGroup);
  }, [pathname, groupRoutes]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }

    // Em telas maiores, expandimos a sidebar automaticamente após o hydrate
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setIsCollapsed(false);
    }
  }, [router]);

  function handleLogout() {
    clearAuthFlag();
    router.replace("/login");
  }

  // Observa direção do scroll (janela inteira) para o cabeçalho Apple-like
  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastY + 4;
      const scrollingUp = currentY < lastY - 4;

      if (scrollingDown) {
        setIsScrollingDown(true);
      } else if (scrollingUp) {
        setIsScrollingDown(false);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSectionSelect = (section: SectionKey) => {
    setActiveSection(section);

    // Para já deixar as rotas bem definidas,
    // cada grupo aponta para a página principal correspondente.
    const targetPath =
      section === "operacional"
        ? "/diretoria"
        : section === "insights"
          ? "/performance"
          : "/clientes";

    if (pathname !== targetPath) {
      router.push(targetPath);
    } else if (typeof window !== "undefined") {
      // Se já estamos na mesma rota, apenas garantimos um pequeno scroll ao topo.
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#F0EFEA] h-screen font-sans">
      <div className="relative flex h-screen">
        <aside
          data-collapsed={isCollapsed ? "true" : "false"}
          className={`relative hidden lg:flex flex-col text-[11px] md:text-xs overflow-hidden transition-[width,max-width,padding] duration-200 ease-out mt-3 ${
            isCollapsed
              ? "w-14 max-w-14 px-1.5 sm:w-16 sm:max-w-16 sm:px-2"
              : "w-48 max-w-48 px-3 md:w-56 md:max-w-56 md:px-4"
          }`}
        >
        <div className={`mb-6 flex items-center ${isCollapsed ? "justify-center" : ""} px-2`}>
            <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-primary-foreground text-sm font-bold shadow-sm flex-shrink-0">
              EM
            </div>
            {!isCollapsed && (
                <div className="flex flex-col truncate">
                  <span className="text-sm font-semibold tracking-tight text-gray-900">
                    EM Hub
                  </span>
                  <span className="text-[10px] font-medium text-gray-500">
                    Observabilidade
                  </span>
                </div>
            )}
          </div>
        </div>
        
        <nav className="flex-1 space-y-3" style={{ contain: "layout style paint", willChange: "auto" }}>
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
                    className={`group flex items-center gap-1.5 rounded-[6px] px-3 py-1.5 text-xs font-medium transition-all outline-none ring-ring/50 focus-visible:ring-2 ${
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
          <div
            className={`flex items-center gap-2 rounded-sm border border-gray-100 bg-white/50 p-2 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <Avatar className="h-8 w-8 rounded-sm border border-gray-100 flex-shrink-0">
              <AvatarFallback className="rounded-sm bg-gray-100 text-xs font-medium text-gray-500">
                EV
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <>
                <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                  <span className="truncate text-xs font-medium text-gray-900">
                    Gestor EM
                  </span>
                  <span className="truncate text-[10px] text-gray-500">
                    admin@emvidros.com
                  </span>
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

        {/* Botão de colapso da sidebar – apenas desktop */}
        {/* Botão de colapso fixo na interseção sidebar/conteúdo, sempre acima do conteúdo */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!isCollapsed}
          className={`absolute top-[2.3rem] z-30 hidden h-8 w-8 -translate-y-0 transform items-center justify-center rounded-full border border-gray-100 bg-white shadow-md transition-[left,box-shadow,transform] duration-200 ease-out hover:scale-105 hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 lg:flex ${
            isCollapsed ? "left-12" : "left-44"
          }`}
        >
          {isCollapsed ? (
            <ChevronRight size={16} className="text-gray-600" />
          ) : (
            <ChevronLeft size={16} className="text-gray-600" />
          )}
        </button>

        <main className="ml-0 lg:ml-2 flex min-w-0 flex-1 flex-col overflow-hidden rounded-none lg:rounded-l-3xl bg-white shadow-none lg:shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_10px_30px_rgba(0,0,0,0.08)]">
          <header
            className={`flex items-center justify-between border-b border-gray-100 bg-white px-4 sm:px-6 transition-[padding,height,transform] duration-200 ${
              isScrollingDown ? "h-12" : "h-16"
            } rounded-none lg:rounded-tl-3xl`}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <Avatar className="h-8 w-8 rounded-full border border-gray-100 lg:hidden">
                <AvatarFallback className="rounded-full bg-gray-100 text-xs font-medium text-gray-500">
                  EV
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h1 className="text-sm font-semibold text-gray-900">
                  {pathname === "/" ? "Home" : "EM Hub"}
                </h1>
                {!isScrollingDown && (
                  <p className="text-[0.7rem] text-gray-500">
                    Painel de Controle
                  </p>
                )}
              </div>
            </div>

            <div className="hidden items-center gap-3 sm:gap-4 lg:flex">
              <div className="relative hidden md:block w-40 lg:w-64">
                <span className="absolute left-2.5 top-2.5 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </span>
                <Input
                  placeholder="Buscar..."
                  className="h-9 rounded-full bg-gray-100 pl-8 text-xs focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-gray-200 border-gray-100"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-full text-xs font-medium shadow-none border-gray-100 bg-transparent hover:bg-gray-100"
              >
                Últimos 30 dias
              </Button>
            </div>
          </header>

          {/* Chips de grupos – visíveis em mobile/tablet quando cabeçalho expandido */}
          {!isScrollingDown && (
            <div className="flex gap-2 border-b border-gray-100 bg-white px-4 pb-2 pt-2 lg:hidden overflow-x-auto">
              {groupRoutes[activeSection].map((item) => {
                const isActive = pathname === item.href;
                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => router.push(item.href)}
                    className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex-1 overflow-x-hidden overflow-y-auto pb-16 lg:pb-0 p-4 sm:p-6 lg:p-8 scroll-smooth">
            <div className="mx-auto max-w-7xl space-y-6">{children}</div>
          </div>
        </main>
      </div>
      <DashboardDockNav
        activeSection={activeSection}
        onSectionSelect={handleSectionSelect}
        onOpenAI={() => setIsMobileAIOpen(true)}
      />
      {/* Assistente IA em modo sheet para mobile/tablet */}
      <div className="lg:hidden">
        <ClaraAIAssistant
          variant="sheet"
          open={isMobileAIOpen}
          onOpenChange={setIsMobileAIOpen}
          hideDefaultTrigger
        />
      </div>
      {/* Comportamento flutuante padrão do assistente em desktop */}
      <div className="hidden lg:block">
        <ClaraAIAssistant />
      </div>
    </div>
  );
}



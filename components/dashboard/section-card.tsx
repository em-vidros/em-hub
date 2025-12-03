import { Card } from "@/components/ui/card";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function SectionCard({ title, subtitle, children }: SectionCardProps) {
  return (
    <Card className="min-w-0">
      <div className="mb-4 min-w-0">
        <p className="text-sm font-medium text-gray-900 capitalize mb-1 break-words">
          {title}
        </p>
        {subtitle ? (
          <p className="text-xs text-gray-500 break-words">{subtitle}</p>
        ) : null}
      </div>
      <div className="min-w-0 overflow-x-auto overscroll-x-contain">
        {children}
      </div>
    </Card>
  );
}



import { Card } from "@/components/ui/card";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function SectionCard({ title, subtitle, children }: SectionCardProps) {
  return (
    <Card>
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-900 capitalize mb-1">
          {title}
        </p>
          {subtitle ? (
          <p className="text-xs text-gray-500">{subtitle}</p>
          ) : null}
      </div>
      {children}
    </Card>
  );
}



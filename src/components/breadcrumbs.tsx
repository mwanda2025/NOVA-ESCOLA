'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Crumb = { href: string; label: string };

const labelMap: Record<string, string> = {
  dashboard: 'Painel',
  admin: 'Admin',
  professor: 'Professor',
  aluno: 'Aluno',
  encarregado: 'Encarregado',
  assignments: 'Trabalhos',
  calendar: 'Calendário',
  content: 'Conteúdo',
  messages: 'Mensagens',
  reports: 'Relatórios',
  finance: 'Finanças',
  summarizer: 'Resumidor IA',
  grade: 'Corrigir',
  profile: 'Perfil',
  settings: 'Configurações',
};

function buildBreadcrumbs(pathname: string): Crumb[] {
  const parts = pathname.split('/').filter(Boolean);
  const items = parts.map((part, index) => {
    const href = '/' + parts.slice(0, index + 1).join('/');
    return { href, label: labelMap[part] ?? part };
  });
  if (items.length === 0) return [];
  // Ensure base dashboard label is friendly
  if (items[0]?.href === '/dashboard') {
    items[0] = { href: '/dashboard', label: 'Painel' };
  }
  return items;
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const items = buildBreadcrumbs(pathname);

  if (items.length <= 1) return null; // Hide on top-level

  return (
    <nav aria-label="Breadcrumb" className="text-xs md:text-sm text-muted-foreground">
      <ol className="flex items-center gap-1 md:gap-2">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1">
              {idx > 0 && <span className="text-border">/</span>}
              {isLast ? (
                <span aria-current="page" className="text-foreground font-medium">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}



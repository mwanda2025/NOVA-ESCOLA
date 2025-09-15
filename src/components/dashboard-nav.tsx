
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  UserCog,
  Shield,
  GraduationCap,
  BookOpen,
  ClipboardList,
  Calendar,
  MessageSquare,
  BarChart2,
  Wand2,
  ArrowLeft,
  Sparkles,
  DollarSign,
  Users as UsersIcon,
  Notebook,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

type NavItem = {
  href: string;
  icon: React.ElementType;
  label: string;
  tooltip: string;
  match?: (pathname: string) => boolean;
};

const mainNavItems: NavItem[] = [
  {
    href: '/dashboard',
    icon: LayoutDashboard,
    label: 'Painel Principal',
    tooltip: 'Painel Principal',
    match: (pathname) => pathname === '/dashboard',
  },
  {
    href: '/dashboard/admin',
    icon: UserCog,
    label: 'Admin',
    tooltip: 'Painel do Admin',
  },
  {
    href: '/dashboard/professor',
    icon: GraduationCap,
    label: 'Professor',
    tooltip: 'Painel do Professor',
  },
  {
    href: '/dashboard/aluno',
    icon: User,
    label: 'Aluno',
    tooltip: 'Painel do Aluno',
  },
  {
    href: '/dashboard/encarregado',
    icon: Shield,
    label: 'Encarregado',
    tooltip: 'Painel do Encarregado',
  },
];

const studentNavItems: NavItem[] = [
  { href: '/dashboard/aluno', icon: LayoutDashboard, label: 'Painel', tooltip: 'Painel do Aluno', match: (p) => p === '/dashboard/aluno' },
  { href: '/dashboard/aluno/content', icon: BookOpen, label: 'Conteúdo', tooltip: 'Repositório de Conteúdo' },
  { href: '/dashboard/aluno/assignments', icon: ClipboardList, label: 'Trabalhos', tooltip: 'Meus Trabalhos' },
  { href: '/dashboard/aluno/conquistas', icon: Sparkles, label: 'Conquistas', tooltip: 'Conquistas e Desafios' },
  { href: '/dashboard/aluno/notes', icon: Notebook, label: 'Anotações', tooltip: 'Minhas Anotações' },
  { href: '/dashboard/aluno/community', icon: UsersIcon, label: 'Comunidade', tooltip: 'Comunidade Escolar' },
  { href: '/dashboard/aluno/messages', icon: MessageSquare, label: 'Mensagens', tooltip: 'Minhas Mensagens' },
  { href: '/dashboard/aluno/calendar', icon: Calendar, label: 'Calendário', tooltip: 'Meu Calendário' },
  { href: '/dashboard/summarizer', icon: Wand2, label: 'Resumidor IA', tooltip: 'Resumidor com IA' },
];

const teacherNavItems: NavItem[] = [
  { href: '/dashboard/professor', icon: LayoutDashboard, label: 'Painel', tooltip: 'Painel do Professor', match: (p) => p === '/dashboard/professor' },
  { href: '/dashboard/professor/content', icon: BookOpen, label: 'Conteúdo', tooltip: 'Gerir Conteúdo' },
  { href: '/dashboard/professor/assignments', icon: ClipboardList, label: 'Trabalhos', tooltip: 'Gerir Trabalhos' },
  { href: '/dashboard/professor/community', icon: UsersIcon, label: 'Comunidade', tooltip: 'Comunidade dos Professores' },
  { href: '/dashboard/professor/messages', icon: MessageSquare, label: 'Mensagens', tooltip: 'Minhas Mensagens' },
  { href: '/dashboard/professor/calendar', icon: Calendar, label: 'Calendário', tooltip: 'Meu Calendário' },
];

const adminNavItems: NavItem[] = [
  { href: '/dashboard/admin', icon: LayoutDashboard, label: 'Painel', tooltip: 'Painel do Administrador', match: (p) => p === '/dashboard/admin' },
  { href: '/dashboard/aluno/community', icon: UsersIcon, label: 'Com. Alunos', tooltip: 'Comunidade dos Alunos' },
  { href: '/dashboard/professor/community', icon: UsersIcon, label: 'Com. Professores', tooltip: 'Comunidade dos Professores' },
  { href: '/dashboard/encarregado/community', icon: UsersIcon, label: 'Com. Encarregados', tooltip: 'Comunidade dos Encarregados' },
  { href: '/dashboard/reports', icon: BarChart2, label: 'Relatórios', tooltip: 'Ver Relatórios' },
  { href: '/dashboard/finance', icon: DollarSign, label: 'Finanças', tooltip: 'Painel Financeiro' },
  { href: '/dashboard/admin/messages', icon: MessageSquare, label: 'Comunicados', tooltip: 'Enviar Comunicados' },
];

const guardianNavItems: NavItem[] = [
  { href: '/dashboard/encarregado', icon: LayoutDashboard, label: 'Painel', tooltip: 'Painel do Encarregado', match: (p) => p === '/dashboard/encarregado' },
  { href: '/dashboard/encarregado/assignments', icon: ClipboardList, label: 'Trabalhos', tooltip: 'Trabalhos do Aluno' },
  { href: '/dashboard/encarregado/community', icon: UsersIcon, label: 'Comunidade', tooltip: 'Comunidade dos Encarregados' },
  { href: '/dashboard/encarregado/messages', icon: MessageSquare, label: 'Falar com a Escola' },
  { href: '/dashboard/encarregado/calendar', icon: Calendar, label: 'Calendário', tooltip: 'Calendário Escolar' },
];

const getNavItems = (pathname: string): { items: NavItem[], showBackButton: boolean } => {
  if (pathname.startsWith('/dashboard/aluno')) {
    return { items: studentNavItems, showBackButton: true };
  }
  if (pathname.startsWith('/dashboard/professor')) {
    return { items: teacherNavItems, showBackButton: true };
  }
  if (pathname.startsWith('/dashboard/encarregado')) {
    return { items: guardianNavItems, showBackButton: true };
  }
  if (pathname.startsWith('/dashboard/admin')) {
    return { items: adminNavItems, showBackButton: true };
  }
  if (pathname.startsWith('/dashboard/summarizer')) {
     return { items: studentNavItems, showBackButton: true };
  }
  if (pathname.startsWith('/dashboard/reports') || pathname.startsWith('/dashboard/finance')) {
      return { items: adminNavItems, showBackButton: true };
  }
   if (pathname.startsWith('/dashboard/assignments/grade')) {
    return { items: teacherNavItems, showBackButton: true };
  }

  // Fallback to the main navigation hub for /dashboard or any other top-level page
  return { items: mainNavItems, showBackButton: false };
};

const isActive = (item: NavItem, pathname: string): boolean => {
    if (item.match) {
        return item.match(pathname);
    }
    // Avoids matching "/" for all routes
    if (item.href === '/dashboard') return pathname === '/dashboard';
    
    // Check for nested routes. This is a bit more robust.
    // e.g. /dashboard/aluno/assignments will match href /dashboard/aluno/assignments
    return pathname.startsWith(item.href);
}


export function DashboardNav() {
  const pathname = usePathname();
  const { items: navItems, showBackButton } = getNavItems(pathname);

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={`${item.href}-${item.label}`}>
          <SidebarMenuButton
            asChild
            isActive={isActive(item, pathname)}
            tooltip={{
              children: item.tooltip,
              side: 'right',
            }}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
      {showBackButton && (
         <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip={{
              children: "Voltar ao Hub",
              side: 'right',
            }}
          >
            <Link href="/dashboard">
              <ArrowLeft />
              <span>Voltar ao Hub</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
}

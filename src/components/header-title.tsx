
'use client';

import { usePathname } from 'next/navigation';

type HeaderCopy = { title: string; subtitle?: string };

const headerCopyMap: Record<string, HeaderCopy> = {
    '/dashboard': { title: 'Hub de Navegação', subtitle: 'Escolha uma área para começar' },
    '/dashboard/profile': { title: 'Perfil de Utilizador' },
    '/dashboard/settings': { title: 'Configurações' },
    '/dashboard/summarizer': { title: 'Assistente de Estudo IA', subtitle: 'Resumo e revisão com IA' },
    
    // Admin
    '/dashboard/admin': { title: 'Painel do Administrador', subtitle: 'Gestão e visão geral' },
    '/dashboard/admin/messages': { title: 'Enviar Comunicados', subtitle: 'Alcance toda a comunidade' },
    '/dashboard/reports': { title: 'Relatórios & Insights', subtitle: 'Métricas e tendências' },
    '/dashboard/finance': { title: 'Painel Financeiro', subtitle: 'Receitas, despesas e propinas' },

    // Professor
    '/dashboard/professor': { title: 'Painel do Professor', subtitle: 'Acompanhe turmas e tarefas' },
    '/dashboard/professor/calendar': { title: 'Calendário do Professor' },
    '/dashboard/professor/assignments': { title: 'Gerir Trabalhos', subtitle: 'Criação, revisão e publicação' },
    '/dashboard/professor/content': { title: 'Gerir Conteúdo' },
    '/dashboard/assignments/grade': { title: 'Corrigir Trabalho' },
    '/dashboard/professor/community': { title: 'Comunidade dos Professores' },
    '/dashboard/professor/messages': { title: 'Mensagens' },

    // Aluno
    '/dashboard/aluno': { title: 'Painel do Aluno', subtitle: 'Resumo do teu progresso' },
    '/dashboard/aluno/calendar': { title: 'Calendário do Aluno' },
    '/dashboard/aluno/content': { title: 'Repositório de Conteúdo' },
    '/dashboard/aluno/assignments': { title: 'Meus Trabalhos' },
    '/dashboard/aluno/conquistas': { title: 'Conquistas e Desafios' },
    '/dashboard/aluno/notes': { title: 'Anotações Pessoais' },
    '/dashboard/aluno/community': { title: 'Comunidade dos Alunos' },
    '/dashboard/aluno/messages': { title: 'Mensagens' },

    // Encarregado
    '/dashboard/encarregado': { title: 'Painel do Encarregado', subtitle: 'Acompanhe o aluno' },
    '/dashboard/encarregado/calendar': { title: 'Calendário Escolar' },
    '/dashboard/encarregado/assignments': { title: 'Trabalhos do Aluno' },
    '/dashboard/encarregado/community': { title: 'Comunidade dos Encarregados' },
    '/dashboard/encarregado/messages': { title: 'Falar com a Escola' },
};

type HeaderTitleProps = {
    title?: string;
    subtitle?: string;
};

export function HeaderTitle(props: HeaderTitleProps) {
    const pathname = usePathname();
    const mapped = headerCopyMap[pathname] || { title: 'Painel' };
    const title = props.title ?? mapped.title;
    const subtitle = props.subtitle ?? mapped.subtitle;

    return (
        <div className="hidden md:flex flex-col gap-1">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight font-headline line-clamp-1" title={title}>{title}</h1>
            {subtitle ? (
                <p className="text-sm md:text-base text-muted-foreground line-clamp-1" title={subtitle}>{subtitle}</p>
            ) : null}
        </div>
    );
}

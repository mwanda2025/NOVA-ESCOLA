
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, BookOpen, BarChart2, Megaphone, DollarSign, MessageSquare } from "lucide-react";
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Painel do Administrador</h1>
        <p className="text-muted-foreground">Visão geral e gestão completa do sistema.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Utilizadores
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-muted-foreground">
              +58 novos esta semana
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Turmas
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              +3 novas este semestre
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Disciplinas Ativas
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              Em todos os cursos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Comunicados
            </CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Publicados este mês
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas de Gestão</CardTitle>
            <CardDescription>Atalhos para as tarefas administrativas mais comuns.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button asChild variant="outline">
              <Link href="#"><Users className="mr-2 h-4 w-4" /> Gerir Utilizadores</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="#"><GraduationCap className="mr-2 h-4 w-4" /> Gerir Turmas</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="#"><BookOpen className="mr-2 h-4 w-4" /> Gerir Disciplinas</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard/admin/messages"><Megaphone className="mr-2 h-4 w-4" /> Enviar Comunicado</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Relatórios & Finanças</CardTitle>
            <CardDescription>Acesso a relatórios e informações financeiras.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button asChild variant="outline" className="justify-start">
              <Link href="/dashboard/reports"><BarChart2 className="mr-2 h-4 w-4" /> Ver Relatórios</Link>
            </Button>
             <Button asChild variant="outline" className="justify-start">
              <Link href="/dashboard/finance"><DollarSign className="mr-2 h-4 w-4" /> Painel Financeiro</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acesso às Comunidades</CardTitle>
            <CardDescription>Monitorize as comunidades de cada perfil.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button asChild variant="outline" className="justify-start">
              <Link href="/dashboard/aluno/community"><MessageSquare className="mr-2 h-4 w-4" /> Comunidade dos Alunos</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/dashboard/professor/community"><MessageSquare className="mr-2 h-4 w-4" /> Comunidade dos Professores</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/dashboard/encarregado/community"><MessageSquare className="mr-2 h-4 w-4" /> Comunidade dos Encarregados</Link>
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

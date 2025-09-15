import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, User, UserCog, Shield, GraduationCap } from 'lucide-react';

const roles = [
  {
    name: 'Painel do Administrador',
    description: 'Gestão total do sistema, utilizadores e configurações.',
    href: '/dashboard/admin',
    icon: UserCog,
  },
  {
    name: 'Painel do Professor',
    description: 'Gestão de turmas, notas, trabalhos e comunicação.',
    href: '/dashboard/professor',
    icon: GraduationCap,
  },
  {
    name: 'Painel do Aluno',
    description: 'Acesso a aulas, trabalhos, notas e materiais.',
    href: '/dashboard/aluno',
    icon: User,
  },
  {
    name: 'Painel do Encarregado',
    description: 'Acompanhamento do progresso e comunicados.',
    href: '/dashboard/encarregado',
    icon: Shield,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="w-full max-w-4xl mx-auto p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold font-headline text-foreground">Hub de Navegação Escolar</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Selecione o seu perfil para aceder ao painel correspondente.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <Link href={role.href} key={role.name} className="block group">
              <Card className="hover:border-primary hover:shadow-lg transition-all duration-300 h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <div className="flex items-center gap-3">
                      <role.icon className="h-6 w-6 text-primary" />
                      <CardTitle className="text-xl font-bold">{role.name}</CardTitle>
                    </div>
                    <CardDescription className="mt-2 text-base">{role.description}</CardDescription>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight, Library, Users, CalendarCheck, MessageCircle, BarChart2, BrainCircuit } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/95 backdrop-blur-sm fixed top-0 w-full z-50 border-b">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold font-headline text-foreground">NOVA ESCOLA</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors underline-offset-4" prefetch={false}>
            Recursos
          </Link>
          <Button asChild variant="default" size="sm">
            <Link href="/login">Acessar Sistema</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-card">
           <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl font-headline text-foreground">
                  Uma escola inovadora, conectada e interativa
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  A NOVA ESCOLA integra alunos, professores e encarregados numa plataforma moderna, simplificando a aprendizagem e a comunicação.
                </p>
                <div className="mt-6">
                  <Button asChild size="lg" className="group shadow-lg hover:shadow-primary/20 transition-shadow">
                    <Link href="/login">
                      Acessar Sistema <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="Ilustração moderna da escola"
                  width={600}
                  height={400}
                  className="rounded-xl object-cover aspect-video overflow-hidden shadow-2xl"
                  data-ai-hint="educação tecnologia"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">Recursos Principais</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                Tudo o que você precisa em um só lugar
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Nossa plataforma foi desenhada para otimizar a jornada educacional de todos os envolvidos.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-2 text-center">
                 <div className="flex justify-center items-center mb-2">
                    <div className="flex items-center justify-center rounded-full bg-primary/10 p-3">
                        <Library className="w-8 h-8 text-primary" />
                    </div>
                 </div>
                <h3 className="text-xl font-bold">Repositório de Conteúdo</h3>
                <p className="text-muted-foreground">
                  Acesse materiais, vídeos e PDFs em um local centralizado.
                </p>
              </div>
              <div className="grid gap-2 text-center">
                <div className="flex justify-center items-center mb-2">
                   <div className="flex items-center justify-center rounded-full bg-primary/10 p-3">
                     <Users className="w-8 h-8 text-primary" />
                   </div>
                </div>
                <h3 className="text-xl font-bold">Painéis Personalizados</h3>
                <p className="text-muted-foreground">
                  Dashboards dedicados para Alunos, Professores, Admins e Encarregados.
                </p>
              </div>
              <div className="grid gap-2 text-center">
                <div className="flex justify-center items-center mb-2">
                    <div className="flex items-center justify-center rounded-full bg-primary/10 p-3">
                        <CalendarCheck className="w-8 h-8 text-primary" />
                    </div>
                </div>
                <h3 className="text-xl font-bold">Calendário Integrado</h3>
                <p className="text-muted-foreground">
                  Acompanhe datas importantes, eventos e horários de aulas.
                </p>
              </div>
              <div className="grid gap-2 text-center">
                <div className="flex justify-center items-center mb-2">
                    <div className="flex items-center justify-center rounded-full bg-primary/10 p-3">
                        <MessageCircle className="w-8 h-8 text-primary" />
                    </div>
                </div>
                <h3 className="text-xl font-bold">Comunicação em Tempo Real</h3>
                <p className="text-muted-foreground">
                    Chat integrado para uma comunicação transparente e eficaz.
                </p>
              </div>
              <div className="grid gap-2 text-center">
                <div className="flex justify-center items-center mb-2">
                    <div className="flex items-center justify-center rounded-full bg-primary/10 p-3">
                        <BarChart2 className="w-8 h-8 text-primary" />
                    </div>
                </div>
                <h3 className="text-xl font-bold">Relatórios Detalhados</h3>
                <p className="text-muted-foreground">
                    Gere relatórios de desempenho e atividade dos alunos.
                </p>
              </div>
              <div className="grid gap-2 text-center">
                <div className="flex justify-center items-center mb-2">
                    <div className="flex items-center justify-center rounded-full bg-primary/10 p-3">
                        <BrainCircuit className="w-8 h-8 text-primary" />
                    </div>
                </div>
                <h3 className="text-xl font-bold">Resumos com IA</h3>
                <p className="text-muted-foreground">
                    Use IA para resumir textos e traduzir materiais instantaneamente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-headline text-foreground">Junte-se à nossa comunidade escolar</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Faça parte de uma experiência educacional mais conectada e eficiente.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-x-2 mt-4">
              <Button asChild size="lg" className="group shadow-lg hover:shadow-primary/20 transition-shadow">
                <Link href="/login">
                  Acessar Plataforma <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-sidebar text-sidebar-foreground border-t border-sidebar-border">
        <div className="container py-12 px-4 md:px-6">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-2">
              <Link href="#" className="flex items-center space-x-2">
                <BookOpen className="h-7 w-7 text-sidebar-primary" />
                <span className="text-2xl font-bold font-headline text-sidebar-foreground">NOVA ESCOLA</span>
              </Link>
              <p className="text-sm text-sidebar-foreground/80">&copy; 2025 NOVA ESCOLA. Todos os direitos reservados.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-lg text-sidebar-foreground">Contato</h4>
              <p className="text-sm text-sidebar-foreground/80">Rua da Inovação, 123</p>
              <p className="text-sm text-sidebar-foreground/80">Lisboa, Portugal</p>
              <p className="text-sm text-sidebar-foreground/80">Email: geral@novaescola.pt</p>
              <p className="text-sm text-sidebar-foreground/80">Telefone: +351 210 123 456</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-lg text-sidebar-foreground">Links Úteis</h4>
              <nav className="flex flex-col gap-1">
                <Link href="/" className="text-sm text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors">Página Inicial</Link>
                <Link href="/login" className="text-sm text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors">Acessar Sistema</Link>
                <Link href="#" className="text-sm text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors">Termos de Serviço</Link>
                <Link href="#" className="text-sm text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors">Política de Privacidade</Link>
              </nav>
            </div>
             <div className="space-y-2">
              <h4 className="font-semibold text-lg text-sidebar-foreground">Redes Sociais</h4>
               <nav className="flex gap-4">
                <Link href="#" className="text-sm text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors">Facebook</Link>
                <Link href="#" className="text-sm text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors">Instagram</Link>
                <Link href="#" className="text-sm text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors">WhatsApp</Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

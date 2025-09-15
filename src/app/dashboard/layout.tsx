import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { DashboardNav } from '@/components/dashboard-nav';
import { UserNav } from '@/components/user-nav';
import { VirtualAssistant } from '@/components/virtual-assistant';
import { OnboardingTour } from '@/components/onboarding/OnboardingTour';
import { HeaderTitle } from '@/components/header-title';
import { Breadcrumbs } from '@/components/breadcrumbs';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <DashboardNav />
        </SidebarContent>
        <SidebarFooter>
          {/* Você pode adicionar conteúdo de rodapé aqui, se necessário */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-20 md:h-24 items-center justify-between">
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden" />
                <Breadcrumbs />
              </div>
              <HeaderTitle />
            </div>
            <div className="flex items-center">
              <UserNav />
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6 md:p-8" data-onb="aluno-header">
          {children}
        </main>
        <OnboardingTour role="aluno" />
        <VirtualAssistant />
      </SidebarInset>
    </SidebarProvider>
  );
}

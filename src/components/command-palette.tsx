"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from "@/components/ui/command";
import { Home, Calendar, ClipboardList, Users, Settings, Search } from "lucide-react";

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Pesquisar comandos e navegar..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        <CommandGroup heading="Navegação">
          <CommandItem onSelect={() => go("/")}> <Home className="h-4 w-4" /> Página Inicial</CommandItem>
          <CommandItem onSelect={() => go("/dashboard")}> <Search className="h-4 w-4" /> Dashboard</CommandItem>
          <CommandItem onSelect={() => go("/dashboard/aluno/assignments")}> <ClipboardList className="h-4 w-4" /> Trabalhos (Aluno)</CommandItem>
          <CommandItem onSelect={() => go("/dashboard/professor/assignments")}> <ClipboardList className="h-4 w-4" /> Trabalhos (Professor)</CommandItem>
          <CommandItem onSelect={() => go("/dashboard/encarregado/assignments")}> <ClipboardList className="h-4 w-4" /> Trabalhos (Encarregado)</CommandItem>
          <CommandItem onSelect={() => go("/dashboard/aluno/calendar")}> <Calendar className="h-4 w-4" /> Calendário</CommandItem>
          <CommandItem onSelect={() => go("/dashboard/settings")}> <Settings className="h-4 w-4" /> Definições</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Ações Rápidas">
          <CommandItem onSelect={() => go("/dashboard/summarizer")}> <Users className="h-4 w-4" /> Resumir Conteúdo</CommandItem>
          <CommandItem onSelect={() => go("/dashboard/assignments/grade")}> <ClipboardList className="h-4 w-4" /> Corrigir Submissões</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}






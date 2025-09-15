"use client";
import React from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

type Role = "aluno" | "professor" | "encarregado" | "admin";

const roleSteps: Record<Role, { element: string; popover: { title?: string; description: string } }[]> = {
  aluno: [
    { element: '[data-onb="aluno-header"]', popover: { title: 'Bem-vindo!', description: 'Aqui vê o resumo do seu progresso.' } },
    { element: '[data-onb="aluno-assignments"]', popover: { description: 'Veja os seus trabalhos e prazos.' } },
    { element: '[data-onb="aluno-calendar"]', popover: { description: 'Consulte o calendário da semana.' } },
  ],
  professor: [
    { element: '[data-onb="professor-header"]', popover: { description: 'Bem-vindo! Gestão das suas turmas.' } },
    { element: '[data-onb="professor-assignments"]', popover: { description: 'Crie e avalie trabalhos aqui.' } },
  ],
  encarregado: [
    { element: '[data-onb="encarregado-header"]', popover: { description: 'Acompanhe o educando.' } },
    { element: '[data-onb="encarregado-assignments"]', popover: { description: 'Veja o estado dos trabalhos.' } },
  ],
  admin: [
    { element: '[data-onb="admin-header"]', popover: { description: 'Resumo administrativo.' } },
  ],
};

type Props = {
  role: Role;
};

export function OnboardingTour({ role }: Props) {
  const key = `ne:onb:${role}:completed`;

  React.useEffect(() => {
    const done = typeof window !== 'undefined' ? localStorage.getItem(key) : '1';
    if (done) return;
    const d = driver({
      showProgress: true,
      nextBtnText: 'Seguinte',
      prevBtnText: 'Anterior',
      doneBtnText: 'Terminar',
      steps: roleSteps[role],
      animate: true,
      overlayOpacity: 0.5,
      allowClose: true,
      stagePadding: 4,
    });
    d.drive();
    const onClose = () => {
      try { localStorage.setItem(key, '1'); } catch {}
      d.destroy();
      window.removeEventListener('beforeunload', onClose);
    };
    window.addEventListener('beforeunload', onClose);
    return () => {
      d.destroy();
      window.removeEventListener('beforeunload', onClose);
    };
  }, [key, role]);

  return null;
}

export type OnboardingTask = { id: string; label: string; done: boolean };

export function useOnboardingChecklist(role: Role) {
  const storageKey = `ne:onb:${role}:checklist`;
  const [tasks, setTasks] = React.useState<OnboardingTask[]>([]);
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setTasks(JSON.parse(raw));
      else {
        const initial: OnboardingTask[] = role === 'professor'
          ? [
              { id: 'create-assignment', label: 'Criar o primeiro trabalho', done: false },
              { id: 'send-message', label: 'Enviar uma mensagem à turma', done: false },
            ]
          : role === 'aluno'
          ? [
              { id: 'submit-assignment', label: 'Submeter o primeiro trabalho', done: false },
              { id: 'check-calendar', label: 'Ver o calendário da semana', done: false },
            ]
          : [ ];
        setTasks(initial);
        localStorage.setItem(storageKey, JSON.stringify(initial));
      }
    } catch {}
  }, [storageKey, role]);

  const toggle = (id: string, value?: boolean) => {
    setTasks((prev) => {
      const next = prev.map(t => t.id === id ? { ...t, done: value ?? !t.done } : t);
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  return { tasks, toggle };
}



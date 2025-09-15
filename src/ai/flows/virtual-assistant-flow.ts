'use server';

/**
 * @fileOverview An AI-powered virtual assistant for the school platform.
 *
 * - askVirtualAssistant - The main function to interact with the assistant.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { assignments } from '@/lib/data/assignments';
import { gradesData } from '@/lib/data/grades';
import { calendarData } from '@/lib/data/calendar';
import { announcementsData } from '@/lib/data/announcements';

// Tool Definitions
const getAssignments = ai.defineTool(
  {
    name: 'getAssignments',
    description: 'Obtém a lista de trabalhos do aluno (pendentes, entregues, etc.).',
    inputSchema: z.void(),
    outputSchema: z.any(),
  },
  async () => assignments.filter(a => a.status === 'A Fazer' || a.status === 'Enviado')
);

const getGrades = ai.defineTool(
  {
    name: 'getGrades',
    description: 'Obtém as notas que o aluno já recebeu.',
    inputSchema: z.void(),
    outputSchema: z.any(),
  },
  async () => gradesData
);

const getCalendarEvents = ai.defineTool(
  {
    name: 'getCalendarEvents',
    description: 'Obtém a lista de eventos e prazos importantes do calendário.',
    inputSchema: z.void(),
    outputSchema: z.any(),
  },
  async () => calendarData
);

const getAnnouncements = ai.defineTool(
  {
    name: 'getAnnouncements',
    description: 'Obtém a lista de comunicados e avisos gerais da escola.',
    inputSchema: z.void(),
    outputSchema: z.any(),
  },
  async () => announcementsData
);


const assistantPrompt = ai.definePrompt({
    name: 'virtualAssistantPrompt',
    system: `Você é um assistente virtual amigável e prestável para a plataforma escolar NOVA ESCOLA.
    Seja conciso e direto nas suas respostas.
    Use as ferramentas disponíveis para responder às perguntas do utilizador sobre os seus trabalhos, notas, calendário e comunicados.
    Formate as datas de forma legível (ex: '15 de agosto de 2024'). A data de hoje é: ${format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: pt })}.
    Se não souber a resposta ou se a pergunta for sobre um tópico para o qual não tem ferramentas, responda educadamente que não pode ajudar com esse pedido.`,
    tools: [getAssignments, getGrades, getCalendarEvents, getAnnouncements],
});

const assistantFlow = ai.defineFlow(
  {
    name: 'virtualAssistantFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (query) => {
    const { output } = await assistantPrompt(query);
    return output as string;
  }
);

export async function askVirtualAssistant(query: string): Promise<string> {
  return assistantFlow(query);
}

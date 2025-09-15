
import type { MeetingRequestProps } from "@/components/meeting-request-card";

export const meetingRequests: MeetingRequestProps[] = [
    {
      requester: "Reunião com Encarregado de Maria Pereira",
      student: "Maria Pereira (10ºA)",
      requestDate: "há 1 dia",
      suggestedDate: "25 de Outubro",
      suggestedTime: "16:00",
      reason: "Gostaria de discutir o desempenho recente da Maria e possíveis estratégias de melhoria.",
    },
    {
      requester: "Reunião com Pai de Carlos Martins",
      student: "Carlos Martins (11ºC)",
      requestDate: "há 3 dias",
      suggestedDate: "28 de Outubro",
      suggestedTime: "10:30",
      reason: "Queria falar sobre o trabalho de grupo e a participação do Carlos.",
    },
];

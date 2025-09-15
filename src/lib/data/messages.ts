
import { Bot } from "lucide-react";

export const initialContacts = [
  { id: 'group1', name: "Grupo de Matemática 101", lastMessage: "Não se esqueçam do trabalho de casa!", time: "10:42", type: 'group', unread: 2, avatar: "M" },
  { id: 'group2', name: "Galera de Estudos de História", lastMessage: "Vejo vocês na biblioteca.", time: "Ontem", type: 'group', unread: 0, avatar: "H" },
  { id: 'user1', name: "Dra. Evelyn Reed", lastMessage: "Seu ensaio ficou excelente.", time: "09:15", type: 'dm', unread: 0, avatar: "ER" },
  { id: 'user2', name: "Parceiro de Laboratório: Alex", lastMessage: "Eu levo os slides.", time: "Ontem", type: 'dm', unread: 1, avatar: "A" },
  { id: 'bot1', name: "Assistente Virtual", lastMessage: "Olá! Como posso ajudar hoje?", time: "Agora", type: 'bot', unread: 0, avatar: Bot },
];

export const initialMessages: Record<string, { sender: string; senderId: string; text: string; time: string; avatar: string | React.ElementType }[]> = {
    'group1': [
        { sender: "Ana", senderId: 'user3', text: "Alguém já começou o exercício 5?", time: "10:30", avatar: "A" },
        { sender: "Você", senderId: 'currentUser', text: "Sim, a primeira parte é tranquila, mas a segunda é complicada.", time: "10:31", avatar: "EU" },
        { sender: "Carlos", senderId: 'user4', text: "Podemos fazer juntos amanhã antes da aula?", time: "10:32", avatar: "C" },
    ],
    'group2': [
        { sender: "Sofia", senderId: 'user5', text: "E aí! Você terminou a leitura para História 202?", time: "10:30", avatar: "S" },
        { sender: "Você", senderId: 'currentUser', text: "Quase, só falta o último capítulo. É bem denso.", time: "10:31", avatar: "EU" },
        { sender: "Sofia", senderId: 'user5', text: "Pois é, né? Estava a pensar em nos encontrarmos para estudar para o quiz.", time: "10:31", avatar: "S" },
        { sender: "Você", senderId: 'currentUser', text: "Ótima ideia! Quando você está livre?", time: "10:32", avatar: "EU" },
        { sender: "Sofia", senderId: 'user5', text: "Que tal amanhã à tarde na biblioteca? Por volta das 14h?", time: "10:33", avatar: "S" },
        { sender: "Você", senderId: 'currentUser', text: "Perfeito, até lá!", time: "10:34", avatar: "EU" },
    ],
    'user1': [
        { sender: "Dra. Evelyn Reed", senderId: 'user1', text: "Seu ensaio ficou excelente. Ótimo trabalho na análise das fontes primárias.", time: "09:15", avatar: "ER" },
        { sender: "Você", senderId: 'currentUser', text: "Obrigado, Professora! Fico feliz que tenha gostado.", time: "09:20", avatar: "EU" }
    ],
    'user2': [
        { sender: "Parceiro de Laboratório: Alex", senderId: 'user2', text: "Não te esqueças que temos laboratório amanhã.", time: "Ontem", avatar: "A" },
        { sender: "Você", senderId: 'currentUser', text: "Certo! Eu levo o material de escrita.", time: "Ontem", avatar: "EU" },
        { sender: "Parceiro de Laboratório: Alex", senderId: 'user2', text: "Combinado. Eu levo os slides.", time: "Ontem", avatar: "A" },
    ],
    'bot1': [
        { sender: "Assistente Virtual", senderId: 'bot1', text: "Olá! Como posso ajudar com as suas notas, trabalhos ou calendário?", time: "Agora", avatar: Bot }
    ]
};

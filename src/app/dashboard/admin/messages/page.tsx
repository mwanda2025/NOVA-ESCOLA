
'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Bot, Send, Megaphone, GraduationCap, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from '@/components/ui/label';

// Lista de destinatários para comunicados do admin
const announcementRecipients = [
  { id: 'all', name: "Toda a Escola", type: 'broadcast', avatar: Megaphone },
  { id: 'teachers', name: "Todos os Professores", type: 'broadcast', avatar: GraduationCap },
  { id: 'students', name: "Todos os Alunos", type: 'broadcast', avatar: Users },
  { id: 'guardians', name: "Todos os Encarregados", type: 'broadcast', avatar: Shield },
  { id: 'bot', name: "Assistente Virtual", type: 'bot', avatar: Bot },
];

export default function MessagesPage() {
    const [selectedRecipient, setSelectedRecipient] = useState(announcementRecipients[0]);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !subject.trim()) return;

        console.log("Enviando comunicado para:", selectedRecipient.id, { subject, message });
        
        // Limpar campos após o envio
        setSubject("");
        setMessage("");
    };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col md:flex-row gap-4">
      <Card className="w-full md:w-[350px] flex flex-col">
        <CardHeader className="p-4 border-b">
          <CardTitle className="font-headline">Destinatários</CardTitle>
           <CardDescription>Selecione para quem enviar</CardDescription>
        </CardHeader>
        <ScrollArea className="flex-1">
          {announcementRecipients.map((recipient) => {
            const AvatarIcon = recipient.avatar as React.ElementType;
            return (
                <div 
                    key={recipient.id} 
                    className={cn(
                        "flex items-center gap-3 p-3 cursor-pointer border-b hover:bg-muted/50",
                        selectedRecipient.id === recipient.id && "bg-muted"
                    )}
                    onClick={() => setSelectedRecipient(recipient)}
                >
                <Avatar className="h-10 w-10 border">
                    <AvatarFallback><AvatarIcon className="h-5 w-5" /></AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                    <p className="font-semibold text-sm">{recipient.name}</p>
                </div>
                </div>
            )
          })}
        </ScrollArea>
      </Card>
      
      <div className="flex-1 flex flex-col bg-card rounded-lg border">
         <CardHeader>
          <CardTitle>Redigir Comunicado</CardTitle>
          <CardDescription>Escreva e envie um comunicado para o grupo selecionado.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
           <form onSubmit={handleSendMessage} className="flex flex-col h-full">
            <div className="space-y-4">
               <div>
                <Label htmlFor="recipient" >Para</Label>
                <Input id="recipient" value={selectedRecipient.name} disabled className="mt-1" />
              </div>
              <div>
                <Label htmlFor="subject">Assunto</Label>
                <Input 
                  id="subject"
                  placeholder="Ex: Reunião de Pais e Mestres" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="message">Mensagem</Label>
                 <Textarea 
                    id="message"
                    placeholder="Escreva aqui o corpo do seu comunicado..." 
                    className="flex-1 mt-1 min-h-[250px] md:min-h-[300px]" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-auto pt-4">
              <Button type="submit" size="lg" disabled={!message.trim() || !subject.trim()}>
                  <Send className="h-5 w-5 mr-2" />
                  Enviar Comunicado
              </Button>
            </div>
          </form>
        </CardContent>
      </div>
    </div>
  );
}


'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, Paperclip, Users, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { initialContacts, initialMessages } from '@/lib/data/messages';

// Filtra os contactos para mostrar apenas DMs (professores, etc.) e o bot.
const guardianContacts = initialContacts.filter(c => c.type === 'dm' || c.type === 'bot');

export default function MessagesPage() {
    const [selectedChat, setSelectedChat] = useState(guardianContacts[0]);
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const newMsg = {
            sender: "Você",
            senderId: "currentUser",
            text: newMessage,
            time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
            avatar: "EU"
        };
        
        setMessages(prev => ({
            ...prev,
            [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg]
        }));
        setNewMessage("");
    };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col md:flex-row gap-4">
      <Card className="w-full md:w-[350px] flex flex-col">
        <CardHeader className="p-4 border-b">
          <h1 className="text-2xl font-bold font-headline">Falar com a Escola</h1>
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar professor ou serviço" className="pl-8" />
          </div>
        </CardHeader>
        <ScrollArea className="flex-1">
          {guardianContacts.map((contact) => {
            const AvatarIcon = contact.avatar as React.ElementType;
            return (
                <div 
                    key={contact.id} 
                    className={cn(
                        "flex items-center gap-3 p-3 cursor-pointer border-b hover:bg-muted/50",
                        selectedChat.id === contact.id && "bg-muted"
                    )}
                    onClick={() => setSelectedChat(contact)}
                >
                <Avatar className="h-10 w-10 border">
                    {typeof contact.avatar === 'string' ? <AvatarFallback>{contact.avatar}</AvatarFallback> : <AvatarFallback><AvatarIcon className="h-5 w-5" /></AvatarFallback>}
                </Avatar>
                <div className="flex-1 truncate">
                    <p className="font-semibold text-sm">{contact.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                </div>
                <div className="flex flex-col items-end text-xs text-muted-foreground gap-1">
                    <span>{contact.time}</span>
                    {contact.unread > 0 && <span className="flex items-center justify-center h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px]">{contact.unread}</span>}
                </div>
                </div>
            )
          })}
        </ScrollArea>
      </Card>
      
      <div className="flex-1 flex flex-col bg-card rounded-lg border">
        <div className="flex items-center gap-3 p-3 border-b">
          <Avatar className="h-10 w-10">
             {typeof selectedChat.avatar === 'string' 
                ? <AvatarFallback>{selectedChat.avatar}</AvatarFallback> 
                : <AvatarFallback>{React.createElement(selectedChat.avatar as React.ElementType, { className: "h-5 w-5" })}</AvatarFallback>}
          </Avatar>
          <div>
            <p className="font-semibold">{selectedChat.name}</p>
             {selectedChat.type === 'group' && <p className="text-sm text-muted-foreground flex items-center"><Users className="h-3 w-3 mr-1" /> 3 Membros</p>}
             {selectedChat.type === 'bot' && <p className="text-sm text-muted-foreground flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>Online</p>}
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-4 md:p-6">
          <div className="space-y-6">
            {(messages[selectedChat.id] || []).map((msg, index) => {
                const AvatarIcon = msg.avatar as React.ElementType;
                return (
                    <div key={index} className={cn("flex items-end gap-2", msg.senderId === 'currentUser' ? 'justify-end' : 'justify-start')}>
                    {msg.senderId !== 'currentUser' && <Avatar className="h-8 w-8"><AvatarFallback>{typeof msg.avatar === 'string' ? msg.avatar : <AvatarIcon />}</AvatarFallback></Avatar>}
                    <div className={cn(
                        "rounded-lg px-4 py-2 max-w-[70%]",
                        msg.senderId === 'currentUser' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    )}>
                        {msg.senderId !== 'currentUser' && <p className="text-xs font-bold mb-1">{msg.sender}</p>}
                        <p className="text-sm">{msg.text}</p>
                        <p className={cn("text-xs mt-1 text-right", msg.senderId === 'currentUser' ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{msg.time}</p>
                    </div>
                    {msg.senderId === 'currentUser' && <Avatar className="h-8 w-8"><AvatarFallback>{msg.avatar}</AvatarFallback></Avatar>}
                    </div>
                )
            })}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t bg-background rounded-b-lg">
          <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
            <Button variant="ghost" size="icon" type="button">
                <Paperclip className="h-5 w-5" />
            </Button>
            <Input 
                placeholder="Digite uma mensagem..." 
                className="flex-1" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

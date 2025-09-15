'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { askVirtualAssistant } from '@/ai/flows/virtual-assistant-flow';
import { Bot, User, Send, Loader2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Simple user/session keys. Replace with real auth/session if available.
  const userId = useMemo(() => (typeof window !== 'undefined' ? (localStorage.getItem('ne:userId') || 'anon') : 'anon'), []);
  const sessionId = useMemo(() => (typeof window !== 'undefined' ? (sessionStorage.getItem('ne:sessionId') || (() => {
    const id = Math.random().toString(36).slice(2);
    sessionStorage.setItem('ne:sessionId', id);
    return id;
  })()) : 'session'), []);

  const storageKey = useMemo(() => `ne:va:history:${userId}:${sessionId}`, [userId, sessionId]);

  // Load history on open
  useEffect(() => {
    if (!isOpen) return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Message[];
        setMessages(parsed);
      }
    } catch {}
  }, [isOpen, storageKey]);

  // Persist messages
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch {}
  }, [messages, storageKey]);

  const suggestions = [
    'Quais são os meus próximos trabalhos?',
    'Resumo da última aula de Matemática',
    'Explica a matéria de Frações com exemplos',
    'Mostrar calendário desta semana',
    'Como posso melhorar a nota em Ciências?'
  ];

  const sendPrompt = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMessage: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    try {
      const response = await askVirtualAssistant(text);
      const assistantMessage: Message = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling virtual assistant:', error);
      toast({
        title: 'Erro de IA',
        description: 'Não foi possível obter uma resposta do assistente. Tente novamente.',
        variant: 'destructive',
      });
      const assistantErrorMessage: Message = { role: 'assistant', content: 'Desculpe, estou com dificuldades técnicas. Por favor, tente mais tarde.' };
      setMessages((prev) => [...prev, assistantErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = input;
    setInput('');
    await sendPrompt(value);
  };

  const clearHistory = () => {
    setMessages([]);
    try { localStorage.removeItem(storageKey); } catch {}
    toast({
      title: 'Histórico limpo',
      description: 'O histórico desta sessão foi removido com sucesso.'
    });
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50"
        size="icon"
      >
        <Bot className="h-8 w-8" />
        <span className="sr-only">Abrir Assistente Virtual</span>
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="flex flex-col p-0" side="right">
          <SheetHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6" />
                <SheetTitle>Assistente Virtual</SheetTitle>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted text-muted-foreground"
                  title="Limpar histórico"
                  onClick={() => {
                    if (isLoading) return;
                    const ok = confirm('Tem a certeza que pretende limpar o histórico desta sessão?');
                    if (ok) clearHistory();
                  }}
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <SheetDescription>
              Faça perguntas sobre as suas notas, trabalhos, calendário e mais.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="flex-1 p-4">
            {/* Prompt suggestion chips */}
            <div className="mb-4 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <Button
                  key={s}
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="rounded-full"
                  onClick={() => sendPrompt(s)}
                  disabled={isLoading}
                >
                  {s}
                </Button>
              ))}
            </div>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start gap-3',
                    message.role === 'user' ? 'justify-end' : ''
                  )}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'rounded-lg px-3 py-2 max-w-sm',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    {message.role === 'assistant' ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            a: ({href, children}) => {
                              const isInternal = href && href.startsWith('/')
                              if (isInternal && href) {
                                return <Link href={href}>{children}</Link>
                              }
                              return <a href={href as string} target="_blank" rel="noopener noreferrer">{children}</a>
                            },
                            ul: ({children}) => <ul className="list-disc pl-5 space-y-1">{children}</ul>,
                            ol: ({children}) => <ol className="list-decimal pl-5 space-y-1">{children}</ol>,
                            li: ({children}) => <li className="leading-snug">{children}</li>,
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}
                  </div>
                   {message.role === 'user' && (
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback>
                         <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                 <div className='flex items-start gap-3'>
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                     <div className="rounded-lg px-3 py-2 bg-muted">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                 </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t bg-background">
            <form onSubmit={handleSendMessage} className="relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ex: Quais são os meus próximos trabalhos?"
                className="pr-12"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

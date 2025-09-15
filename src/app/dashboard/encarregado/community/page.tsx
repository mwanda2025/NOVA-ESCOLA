'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageSquare, Send, Calendar } from "lucide-react";
import Image from "next/image";
import { guardianCommunityData } from '@/lib/data/community';

export default function GuardianCommunityPage() {
  const [posts, setPosts] = useState(guardianCommunityData.posts);
  
  const handleLike = (postId: number) => {
    setPosts(posts.map(p => 
      p.id === postId ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p
    ));
  };
  
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold font-headline">Comunidade dos Encarregados</h1>
        <p className="text-muted-foreground">Um espaço para comunicados da escola e interação com outros encarregados.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Deixar uma Mensagem Pública</h2>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Escreva aqui uma pergunta ou comentário para a comunidade de encarregados..."
                className="min-h-[100px]"
              />
            </CardContent>
            <CardFooter>
              <Button><Send className="mr-2 h-4 w-4" /> Enviar Mensagem</Button>
            </CardFooter>
          </Card>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">Tudo</TabsTrigger>
              <TabsTrigger value="notices">Avisos da Escola</TabsTrigger>
              <TabsTrigger value="events">Eventos</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-6 mt-6">
              {posts.map(post => (
                 <Card key={post.id}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Avatar>
                           <AvatarFallback>{post.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{post.author}</p>
                          <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{post.content}</p>
                      {post.image && <Image src={post.image} alt={`Post by ${post.author}`} width={600} height={400} className="rounded-lg object-cover w-full aspect-video" />}
                    </CardContent>
                    <CardFooter className="flex items-center gap-4">
                       <Button variant={post.liked ? "default" : "outline"} size="sm" onClick={() => handleLike(post.id)}>
                            <Heart className={`mr-2 h-4 w-4 ${post.liked ? 'fill-current' : ''}`} /> 
                            {post.likes}
                        </Button>
                        <Button variant="outline" size="sm">
                            <MessageSquare className="mr-2 h-4 w-4" /> 
                            {post.comments.length} Comentários
                        </Button>
                    </CardFooter>
                 </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-1 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Datas Importantes</CardTitle>
                    <CardDescription>Próximos eventos e prazos relevantes para os encarregados.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center gap-3">
                        <div className="bg-primary text-primary-foreground rounded-md h-12 w-12 flex flex-col items-center justify-center">
                           <span className="text-xs">SET</span>
                            <span className="font-bold text-lg">10</span>
                        </div>
                        <div>
                            <p className="font-semibold text-sm">Reunião de Pais e Mestres</p>
                            <p className="text-xs text-muted-foreground">18:30 no Auditório</p>
                        </div>
                   </div>
                   <div className="flex items-center gap-3">
                        <div className="bg-primary text-primary-foreground rounded-md h-12 w-12 flex flex-col items-center justify-center">
                           <span className="text-xs">SET</span>
                            <span className="font-bold text-lg">25</span>
                        </div>
                        <div>
                            <p className="font-semibold text-sm">Feira do Livro</p>
                            <p className="text-xs text-muted-foreground">Durante todo o dia</p>
                        </div>
                   </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}

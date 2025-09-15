'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageSquare, Image as ImageIcon, Send, Users } from "lucide-react";
import Image from "next/image";
import { studentCommunityData } from '@/lib/data/community';

export default function StudentCommunityPage() {
  const [posts, setPosts] = useState(studentCommunityData.posts);
  const [newPostContent, setNewPostContent] = useState('');

  const handleLike = (postId: number) => {
    setPosts(posts.map(p => 
      p.id === postId ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p
    ));
  };
  
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold font-headline">Comunidade dos Alunos</h1>
        <p className="text-muted-foreground">Partilhe, colabore e conecte-se com os seus colegas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Criar uma Publicação</h2>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder={`No que está a pensar, ${studentCommunityData.currentUser.name}?`}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="min-h-[100px]"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline"><ImageIcon className="mr-2 h-4 w-4" /> Adicionar Imagem</Button>
              <Button><Send className="mr-2 h-4 w-4" /> Publicar</Button>
            </CardFooter>
          </Card>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">Tudo</TabsTrigger>
              <TabsTrigger value="study">Grupos de Estudo</TabsTrigger>
              <TabsTrigger value="general">Geral</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-6 mt-6">
              {posts.map(post => (
                 <Card key={post.id}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{post.author.substring(0, 2)}</AvatarFallback>
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
                    <CardFooter className="flex flex-col items-start gap-4">
                        <div className="flex items-center gap-4">
                           <Button variant={post.liked ? "default" : "outline"} size="sm" onClick={() => handleLike(post.id)}>
                                <Heart className={`mr-2 h-4 w-4 ${post.liked ? 'fill-current' : ''}`} /> 
                                {post.likes}
                            </Button>
                            <Button variant="outline" size="sm">
                                <MessageSquare className="mr-2 h-4 w-4" /> 
                                {post.comments.length} Comentários
                            </Button>
                        </div>
                        {/* Comments Section */}
                        <div className="w-full space-y-3 pt-4 border-t">
                            {post.comments.map((comment, index) => (
                                <div key={index} className="flex items-start gap-2 text-sm">
                                    <Avatar className="w-8 h-8">
                                        <AvatarFallback>{comment.author.substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <div className="bg-muted p-2 rounded-lg flex-1">
                                        <p className="font-semibold">{comment.author}</p>
                                        <p className="text-muted-foreground">{comment.text}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="flex items-center gap-2">
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback>{studentCommunityData.currentUser.avatar}</AvatarFallback>
                                </Avatar>
                                <div className="relative flex-1">
                                    <input placeholder="Adicione um comentário..." className="w-full bg-muted border border-transparent focus:border-border rounded-full px-4 py-2 text-sm" />
                                    <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardFooter>
                 </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-1 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Grupos de Estudo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>H</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-sm">Galera de História</p>
                            <p className="text-xs text-muted-foreground">5 membros</p>
                        </div>
                        <Button size="sm" variant="outline" className="ml-auto">Entrar</Button>
                   </div>
                    <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>M</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-sm">Equipa de Matemática</p>
                            <p className="text-xs text-muted-foreground">8 membros</p>
                        </div>
                        <Button size="sm" variant="outline" className="ml-auto">Entrar</Button>
                   </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}

'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageSquare, Image as ImageIcon, Send, Briefcase } from "lucide-react";
import Image from "next/image";
import { teacherCommunityData } from '@/lib/data/community';

export default function TeacherCommunityPage() {
  const [posts, setPosts] = useState(teacherCommunityData.posts);
  const [newPostContent, setNewPostContent] = useState('');

  const handleLike = (postId: number) => {
    setPosts(posts.map(p => 
      p.id === postId ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p
    ));
  };
  
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold font-headline">Comunidade dos Professores</h1>
        <p className="text-muted-foreground">Um espaço para partilha de recursos, estratégias e colaboração entre colegas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Iniciar uma Discussão</h2>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder={`Partilhe algo com os seus colegas, ${teacherCommunityData.currentUser.name}...`}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="min-h-[100px]"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline"><ImageIcon className="mr-2 h-4 w-4" /> Anexar Imagem</Button>
              <Button><Send className="mr-2 h-4 w-4" /> Publicar</Button>
            </CardFooter>
          </Card>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">Tudo</TabsTrigger>
              <TabsTrigger value="pedagogy">Pedagogia</TabsTrigger>
              <TabsTrigger value="resources">Recursos</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-6 mt-6">
              {posts.map(post => (
                 <Card key={post.id}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Avatar>
                           <AvatarFallback>{post.author.substring(5, 7)}</AvatarFallback>
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
                    </CardFooter>
                 </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-1 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Oportunidades de Formação</CardTitle>
                    <CardDescription>Próximos workshops e eventos para desenvolvimento profissional.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center gap-3">
                        <div className="bg-primary text-primary-foreground rounded-md h-12 w-12 flex items-center justify-center">
                           <Briefcase className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm">Workshop: IA na Educação</p>
                            <p className="text-xs text-muted-foreground">15 de Setembro, 18:00 (Online)</p>
                        </div>
                   </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}


'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Video, Search, Upload, Presentation, Link as LinkIcon, PlusCircle, Share2, Star } from "lucide-react";
import Image from "next/image";
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { materials } from '@/lib/data/content';

const TypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'pdf': return <FileText className="h-4 w-4" />;
    case 'ppt': return <Presentation className="h-4 w-4" />;
    case 'video': return <Video className="h-4 w-4" />;
    default: return null;
  }
};

const MaterialCard = ({ material }: { material: typeof materials[0] }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-0">
        <Image src={material.image} alt={material.title} width={600} height={400} className="aspect-video object-cover" data-ai-hint={material.hint} />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex items-start justify-between gap-2 mb-2">
            <CardTitle className="text-base font-bold">{material.title}</CardTitle>
            <div className="text-muted-foreground"><TypeIcon type={material.type} /></div>
        </div>
        <p className="text-sm text-muted-foreground">{material.course}</p>
        <p className="text-xs text-muted-foreground mt-2">{format(new Date(material.publicationDate), "dd 'de' MMM, yyyy", { locale: pt })}</p>
      </CardContent>
    </Card>
);

export default function ContentPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredMaterials = useMemo(() => {
    return materials.filter(material => {
        const matchesType = activeTab === 'all' || material.type === activeTab;
        const matchesSearch = searchTerm.trim() === '' ||
            material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            material.course.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Gerir Conteúdo</h1>
          <p className="text-muted-foreground">Adicione, edite e organize os materiais de estudo para as suas turmas.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
                type="search" 
                placeholder="Buscar por título ou disciplina..." 
                className="pl-8" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Adicionar Recurso
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Upload className="mr-2 h-4 w-4" />
                    Carregar Ficheiro
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Share2 className="mr-2 h-4 w-4" />
                    Anexar do Google Drive
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Adicionar Vídeo do YouTube
                </DropdownMenuItem>
                 <DropdownMenuItem>
                    <Star className="mr-2 h-4 w-4" />
                    Criar Quiz (Quizlet)
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="pdf">Documentos</TabsTrigger>
          <TabsTrigger value="ppt">Apresentações</TabsTrigger>
          <TabsTrigger value="video">Vídeos</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
            {filteredMaterials.length > 0 ? (
                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredMaterials.map(material => <MaterialCard key={material.id} material={material} />)}
                </div>
            ) : (
                <div className="text-center py-12 text-muted-foreground">
                    <p>Nenhum material encontrado para a sua pesquisa.</p>
                </div>
            )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

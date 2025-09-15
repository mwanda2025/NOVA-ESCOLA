
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { PlusCircle, MoreVertical, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { initialNotes, Note } from '@/lib/data/notes';

export default function PersonalNotesPage() {
  const [notes, setNotes] = useState(initialNotes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<Partial<Note> | null>(null);

  const handleOpenDialog = (note: Partial<Note> | null = null) => {
    setCurrentNote(note || { id: Date.now(), title: '', content: '' });
    setIsDialogOpen(true);
  };

  const handleSaveNote = () => {
    if (!currentNote || !currentNote.title || !currentNote.content) return;
    
    setNotes(prevNotes => {
      const existingNoteIndex = prevNotes.findIndex(n => n.id === currentNote.id);
      if (existingNoteIndex > -1) {
        const updatedNotes = [...prevNotes];
        updatedNotes[existingNoteIndex] = { ...updatedNotes[existingNoteIndex], ...currentNote, lastUpdated: 'Agora' } as Note;
        return updatedNotes;
      } else {
        return [...prevNotes, { ...currentNote, lastUpdated: 'Agora' } as Note];
      }
    });

    setIsDialogOpen(false);
    setCurrentNote(null);
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Anotações Pessoais</h1>
          <p className="text-muted-foreground">O seu caderno digital para resumos e flashcards.</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Criar Nova Nota
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <Card key={note.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>{note.title}</CardTitle>
                <CardDescription>Atualizado {note.lastUpdated}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleOpenDialog(note)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDeleteNote(note.id)} className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-4">{note.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {notes.length === 0 && (
         <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
            <h3 className="text-lg font-semibold">Nenhuma anotação encontrada.</h3>
            <p>Clique em "Criar Nova Nota" para começar.</p>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{currentNote?.id && notes.some(n => n.id === currentNote.id) ? 'Editar Anotação' : 'Criar Nova Anotação'}</DialogTitle>
            <DialogDescription>
              Escreva o seu resumo ou flashcard. A anotação será guardada apenas para si.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="title"
              placeholder="Título da sua anotação"
              value={currentNote?.title}
              onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
              className="col-span-3"
            />
            <Textarea
              id="content"
              placeholder="Escreva o conteúdo aqui..."
              value={currentNote?.content}
              onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
              className="col-span-3 min-h-[250px]"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button type="button" onClick={handleSaveNote}>Guardar Anotação</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}

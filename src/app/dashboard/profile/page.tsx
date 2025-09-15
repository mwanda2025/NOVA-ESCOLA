import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Perfil do Utilizador</h1>
        <p className="text-muted-foreground">Veja e gira as suas informações pessoais.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Perfil</CardTitle>
          <CardDescription>Esta informação será visível para outros utilizadores na plataforma.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://placehold.co/100x100.png" alt="Foto de perfil" />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Nome de Utilizador</h3>
                <p className="text-muted-foreground">utilizador@exemplo.com</p>
                <Button variant="outline">Alterar Foto</Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="fullname">Nome Completo</Label>
              <Input id="fullname" defaultValue="Nome de Utilizador" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Endereço de Email</Label>
              <Input id="email" type="email" defaultValue="utilizador@exemplo.com" disabled />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Função</Label>
              <Input id="role" defaultValue="Aluno" disabled />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="password">Nova Palavra-passe</Label>
              <Input id="password" type="password" placeholder="Deixar em branco para não alterar" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
            <Button>Guardar Alterações</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

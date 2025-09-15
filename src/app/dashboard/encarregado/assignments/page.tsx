
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { assignments } from "@/lib/data/assignments";

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "Avaliado":
      return "default";
    case "Enviado":
      return "secondary";
    case "A Fazer":
      return "outline";
    case "Atrasado":
      return "destructive";
    default:
      return "default";
  }
};


export default function GuardianAssignmentsPage() {
  return (
    <div className="space-y-6">
       <div>
          <h1 className="text-3xl font-bold font-headline">Trabalhos do Aluno</h1>
          <p className="text-muted-foreground">Acompanhe o estado dos trabalhos do seu educando.</p>
        </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Trabalhos</CardTitle>
          <CardDescription>Uma lista dos trabalhos recentes, o seu estado e notas.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Curso</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Data de Entrega</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Nota</TableHead>
                <TableHead>
                  <span className="sr-only">Ações</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((assignment) => (
                <TableRow key={assignment.title}>
                  <TableCell className="font-medium">{assignment.course}</TableCell>
                  <TableCell>{assignment.title}</TableCell>
                  <TableCell>{assignment.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(assignment.status)}>{assignment.status}</Badge>
                  </TableCell>
                  <TableCell>{assignment.grade}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Alternar menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Falar com Professor</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

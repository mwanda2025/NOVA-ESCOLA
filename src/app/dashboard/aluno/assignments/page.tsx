
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
import { MoreHorizontal, FilePlus2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { assignments } from "@/lib/data/assignments";
import { EmptyState } from "@/components/empty-state";
import { ClipboardList, FilePlus2 as FilePlus2Icon } from "lucide-react";

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


export default function AssignmentsPage() {
  const hasAssignments = assignments && assignments.length > 0;
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">Trabalhos</h1>
          <p className="text-muted-foreground">Acompanhe seu progresso e os próximos prazos.</p>
        </div>
        <Button asChild>
            <Link href="#">
                <FilePlus2 className="h-4 w-4 mr-2" />
                Novo Trabalho
            </Link>
        </Button>
      </div>

      <Card data-onb="aluno-assignments">
        <CardHeader>
          <CardTitle>Seus Trabalhos</CardTitle>
          <CardDescription>Uma lista de seus trabalhos atuais e passados.</CardDescription>
        </CardHeader>
        <CardContent>
          {hasAssignments ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead responsiveClassName="hidden md:table-cell">Curso</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead className="hidden sm:table-cell">Data de Entrega</TableHead>
                  <TableHead className="hidden lg:table-cell">Status</TableHead>
                  <TableHead className="hidden xl:table-cell">Nota</TableHead>
                  <TableHead>
                    <span className="sr-only">Ações</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((assignment) => (
                  <TableRow key={assignment.title}>
                    <TableCell responsiveClassName="hidden md:table-cell font-medium">{assignment.course}</TableCell>
                    <TableCell>{assignment.title}</TableCell>
                    <TableCell className="hidden sm:table-cell">{assignment.dueDate}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge variant={getStatusBadgeVariant(assignment.status)}>{assignment.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">{assignment.grade}</TableCell>
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
                          <DropdownMenuItem>Enviar Trabalho</DropdownMenuItem>
                          <DropdownMenuItem>Fazer uma Pergunta</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyState
              icon={<ClipboardList className="h-10 w-10" />}
              title="Ainda não há trabalhos por aqui"
              description="Quando os seus professores publicarem trabalhos, eles aparecerão aqui."
              primaryAction={{ label: 'Explorar Conteúdo', href: '/dashboard/aluno/content' }}
              secondaryAction={{ label: 'Falar com o Professor', href: '/dashboard/aluno/messages' }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

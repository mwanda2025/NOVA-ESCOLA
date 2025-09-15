
export type Assignment = {
    course: string;
    title: string;
    dueDate: string;
    status: 'Avaliado' | 'Enviado' | 'A Fazer' | 'Atrasado';
    grade: string;
};

export const assignments: Assignment[] = [
  { course: "Matemática 101", title: "Trabalho de Álgebra 3", dueDate: "2024-08-15", status: "Avaliado", grade: "A-" },
  { course: "História 202", title: "Ensaio sobre o Império Romano", dueDate: "2024-08-18", status: "Enviado", grade: "..." },
  { course: "CS 101", title: "Quiz de Python Básico", dueDate: "2024-08-20", status: "A Fazer", grade: "-" },
  { course: "Literatura 301", title: "Análise de Shakespeare", dueDate: "2024-08-22", status: "A Fazer", grade: "-" },
  { course: "Biologia 110", title: "Relatório de Laboratório: Mitose", dueDate: "2024-08-12", status: "Atrasado", grade: "C+" },
];


export const assignmentDetails = {
    title: "Ensaio sobre o Império Romano",
    student: "João da Silva",
    instructions: "Escreva um ensaio de 500 palavras sobre as causas da queda do Império Romano do Ocidente, focando-se em fatores económicos e militares. Apresente argumentos claros e cite pelo menos duas fontes históricas.",
    submissionText: "O Império Romano, uma das maiores civilizações da história, não caiu de um dia para o outro. A sua queda foi um processo longo, com muitas causas. Economicamente, o império estava em crise. A inflação estava muito alta porque os imperadores desvalorizavam a moeda para pagar aos soldados. Havia também muita corrupção e os impostos eram excessivos, o que arruinou os pequenos agricultores e concentrou a riqueza nas mãos de poucos. A dependência do trabalho escravo também impediu a inovação tecnológica. Do ponto de vista militar, as fronteiras eram demasiado vastas para serem defendidas. As constantes invasões de tribos bárbaras, como os Godos e os Vândalos, enfraqueceram o exército. O império começou a contratar mercenários que não eram leais a Roma, o que se revelou um erro fatal. A divisão do império em duas partes, Ocidente e Oriente, também não ajudou. Em 476 d.C., o último imperador romano do Ocidente foi deposto, marcando o fim simbólico. Portanto, a queda de Roma foi uma combinação de problemas económicos internos, como a inflação, e pressão militar externa."
};

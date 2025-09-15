
export const gradesData = {
  "9B": {
    "Matemática": [
      { month: "Jan", grade: 14.5 },
      { month: "Fev", grade: 13.8 },
      { month: "Mar", grade: 11.2 },
      { month: "Abr", grade: 12.1 },
    ],
    "Português": [
      { month: "Jan", grade: 16.1 },
      { month: "Fev", grade: 16.5 },
      { month: "Mar", grade: 16.2 },
      { month: "Abr", grade: 17.0 },
    ],
  }
};

export const attendanceData = {
    "9B": {
        "Matemática": [
             { month: "Jan", faltas: 2 },
             { month: "Fev", faltas: 3 },
             { month: "Mar", faltas: 8 },
             { month: "Abr", faltas: 6 },
        ],
    },
    schoolAverage: [
         { month: "Jan", faltas: 3 },
         { month: "Fev", faltas: 4 },
         { month: "Mar", faltas: 5 },
         { month: "Abr", faltas: 4 },
    ]
};

export const assignmentData = {
  "9B": [
    { name: 'Entregues no Prazo', value: 85, fill: "hsl(var(--chart-1))" },
    { name: 'Atrasados', value: 15, fill: "hsl(var(--chart-2))" },
  ]
};

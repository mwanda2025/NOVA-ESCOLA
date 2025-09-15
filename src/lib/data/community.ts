
export const studentCommunityData = {
  currentUser: {
    name: "João da Silva",
    avatar: "JS"
  },
  posts: [
    {
      id: 1,
      author: "Carlos Martins",
      avatar: "CM",
      timestamp: "1 dia atrás",
      category: "Estudo",
      content: "Alguém tem boas dicas ou resumos sobre a matéria de História para a prova da semana que vem? A parte sobre a Revolução Francesa é bem extensa.",
      image: null,
      likes: 8,
      comments: [
         { author: "Sofia Almeida", text: "Eu usei uns vídeos do Khan Academy que me ajudaram muito a visualizar. Recomendo!" },
         { author: "João da Silva", text: "Posso partilhar os meus apontamentos mais logo, se quiserem." },
      ],
      liked: true,
    },
    {
      id: 2,
      author: "Mariana Costa",
      avatar: "MC",
      timestamp: "3 dias atrás",
      category: "Geral",
      content: "Pessoal, encontraram o livro para a aula de Literatura? Não estou a conseguir encontrar na biblioteca.",
      image: null,
      likes: 5,
      comments: [],
      liked: false,
    }
  ]
};

export const guardianCommunityData = {
  currentUser: {
    name: "Ana Costa (Mãe de João S.)",
    avatar: "AC"
  },
  posts: [
    {
      id: 1,
      author: "Admin da Escola",
      avatar: "AD",
      timestamp: "1 dia atrás",
      category: "Avisos",
      content: "Caros Encarregados de Educação, a reunião de pais e mestres para o 1º semestre será no dia 10 de Setembro, pelas 18:30, no auditório principal. Contamos com a vossa presença!",
      image: null,
      likes: 42,
      comments: [
        { author: "Pai de Maria A.", text: "Obrigado pelo aviso!" },
      ],
      liked: false,
    },
    {
      id: 2,
      author: "Associação de Pais",
      avatar: "AP",
      timestamp: "3 dias atrás",
      category: "Eventos",
      content: "Estamos a organizar a Feira do Livro anual da nossa escola! Precisamos de voluntários para ajudar na organização no dia 25 de Setembro. Quem tiver interesse, por favor contacte-nos.",
      image: "https://placehold.co/600x400.png?text=Feira+do+Livro",
      likes: 18,
      comments: [
      ],
      liked: true,
    },
  ]
};


export const teacherCommunityData = {
  currentUser: {
    name: "Prof.ª Ana Borges",
    avatar: "AB"
  },
  posts: [
    {
      id: 1,
      author: "Prof. Ricardo Mendes",
      avatar: "RM",
      timestamp: "4 horas atrás",
      category: "Pedagogia",
      content: "Colegas, que estratégias de avaliação formativa têm utilizado nas vossas aulas online? Gostaria de trocar algumas ideias para o 10º ano.",
      image: null,
      likes: 12,
      comments: [
        { author: "Prof.ª Sofia Costa", text: "Tenho usado o Kahoot para pequenos quizzes no final da aula. Os alunos adoram!" },
      ],
      liked: false,
    },
    {
      id: 2,
      author: "Prof.ª Ana Borges",
      avatar: "AB",
      timestamp: "2 dias atrás",
      category: "Recursos",
      content: "Encontrei um documentário excelente sobre a Segunda Guerra Mundial que pode ser útil para as turmas de História. Chama-se 'World War II in Colour'. Fica a sugestão!",
      image: "https://placehold.co/600x400.png?text=Documentario",
      likes: 25,
      comments: [
         { author: "Prof. Ricardo Mendes", text: "Obrigado pela partilha, Ana! Parece-me ótimo." },
      ],
      liked: true,
    },
  ]
};


export type Note = {
  id: number;
  title: string;
  content: string;
  lastUpdated: string;
};

export const initialNotes: Note[] = [
  {
    id: 1,
    title: "Resumo da Revolução Francesa",
    content: "A Revolução Francesa (1789-1799) foi um período de intensa agitação política e social na França, que teve um impacto duradouro na história mundial. As principais causas foram a desigualdade social, a crise económica e as ideias iluministas. O evento que marcou o início foi a Queda da Bastilha. Fases importantes incluem o Período do Terror e a ascensão de Napoleão Bonaparte.",
    lastUpdated: "2 dias atrás",
  },
  {
    id: 2,
    title: "Flashcards de Biologia: Célula",
    content: "Célula Procarionte: Não possui núcleo definido. Ex: bactérias.\nCélula Eucarionte: Possui núcleo definido e organelas. Ex: animais e plantas.\nMitocôndria: Responsável pela respiração celular e produção de ATP.\nRibossomos: Realizam a síntese de proteínas.",
    lastUpdated: "5 dias atrás",
  },
];

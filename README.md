# NOVA ESCOLA - Plataforma de Gestão Educacional Integrada

## 1. Visão Geral do Projeto

**NOVA ESCOLA** é uma aplicação web moderna e completa, desenhada para servir como uma plataforma educacional "tudo-em-um". O seu principal objetivo é conectar alunos, professores, administradores e encarregados de educação num ecossistema digital coeso, simplificando a comunicação, a gestão de conteúdos e o acompanhamento do percurso académico.

A plataforma foi construída com um foco na experiência do utilizador, oferecendo painéis personalizados para cada tipo de perfil, garantindo que cada utilizador tenha acesso rápido às ferramentas e informações mais relevantes para as suas necessidades.

---

## 2. Perfis de Utilizador e Funcionalidades

A aplicação está estruturada em torno de quatro perfis de utilizador principais:

### a) Aluno
O painel do aluno é o seu centro de controlo para a vida académica.
- **Visão Geral:** Um resumo diário que mostra as aulas do dia, quantos trabalhos estão por entregar e se há novos materiais de estudo ou avisos importantes.
- **Repositório de Conteúdo:** Uma biblioteca digital onde pode navegar e aceder a todos os materiais de estudo (documentos, apresentações, vídeos) que os professores publicam. Pode filtrar por tipo de material (documentos ou vídeos) e encontrar rapidamente o que precisa para cada disciplina.
- **Gestão de Trabalhos:** Uma lista organizada de todos os seus trabalhos. Permite ver rapidamente o que está "A Fazer", o que já foi "Enviado", o que foi "Avaliado" e o que está "Atrasado". Pode consultar as notas recebidas e os prazos de entrega.
- **Calendário Integrado:** Uma visão mensal do seu horário, com todas as aulas, prazos de entrega de trabalhos e eventos escolares marcados de forma clara, ajudando a organizar o seu tempo.
- **Mensagens:** Um sistema de chat para falar diretamente com professores, colegas de turma ou grupos de estudo, mantendo toda a comunicação escolar num único lugar.
- **Resumidor com IA:** Uma ferramenta de estudo poderosa. Pode colar textos longos (como artigos ou capítulos de um livro) e a Inteligência Artificial gera um resumo conciso nos principais pontos. Também pode traduzir o resumo para vários idiomas, facilitando a compreensão e a revisão da matéria.

### b) Professor
Ferramentas desenhadas para simplificar a gestão das suas turmas e otimizar o tempo.
- **Visão Geral:** Um painel central que mostra as suas turmas ativas, o número de trabalhos que precisa de corrigir e as mensagens por ler, permitindo-lhe priorizar as suas tarefas.
- **Gestão de Conteúdo e Trabalhos:** Acesso direto às áreas para publicar novos materiais de estudo para as suas turmas ou para criar e agendar novos trabalhos, definindo prazos e instruções.
- **Comunicação Direta:** Acesso rápido ao sistema de mensagens para comunicar com alunos, grupos de estudo ou encarregados de educação, facilitando o envio de avisos e o esclarecimento de dúvidas.

### c) Administrador
A visão completa da plataforma, com ferramentas para gerir toda a comunidade escolar.
- **Visão Geral:** Um painel com as métricas mais importantes da escola: número total de utilizadores, turmas ativas, disciplinas e comunicados enviados.
- **Gestão Total:** Botões de acesso rápido para gerir utilizadores (adicionar, remover, editar perfis), turmas (criar novas turmas, associar alunos e professores) e disciplinas. Permite também enviar comunicados para toda a escola ou para grupos específicos.
- **Relatórios de Desempenho:** Uma ferramenta para gerar relatórios sobre a atividade dos alunos, as notas médias por turma ou disciplina e as taxas de frequência, ajudando a identificar tendências e a tomar decisões informadas.

### d) Encarregado de Educação
Um painel focado no acompanhamento do percurso académico do seu educando, de forma simples e direta.
- **Visão Geral:** Um resumo claro do desempenho do aluno, incluindo a sua média de notas atual, o número de trabalhos que se aproximam do prazo e a sua taxa de assiduidade.
- **Acesso Rápido:** Atalhos para consultar em detalhe as notas de cada disciplina, ver a lista de trabalhos (entregues ou pendentes) e para entrar em contacto com a escola através do sistema de mensagens.

---

## 3. Tecnologia Utilizada

O projeto foi desenvolvido com um conjunto de tecnologias modernas para garantir performance, escalabilidade e uma excelente experiência de desenvolvimento:

- **Framework Principal:** [Next.js](https://nextjs.org/) (com App Router) e [React](https://react.dev/).
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/).
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) para estilização utilitária e [ShadCN UI](https://ui.shadcn.com/) para componentes de UI pré-construídos e acessíveis.
- **Funcionalidades de IA:** [Genkit (Firebase)](https://firebase.google.com/docs/genkit) para a criação de fluxos de IA, como o resumidor e tradutor de textos.
- **Publicação (Deployment):** Preparado para [Firebase App Hosting](https://firebase.google.com/docs/hosting).

---

## 4. Como Executar o Projeto Localmente

Para executar este projeto no seu ambiente de desenvolvimento, siga os passos abaixo:

1.  **Clonar o Repositório (se aplicável):**
    ```bash
    git clone [URL_DO_REPOSITORIO]
    cd [NOME_DA_PASTA]
    ```

2.  **Instalar as Dependências:**
    Certifique-se de que tem o Node.js instalado. Depois, execute:
    ```bash
    npm install
    ```

3.  **Configurar Variáveis de Ambiente:**
    Crie um ficheiro `.env` na raiz do projeto, copiando o conteúdo do `.env.example` (se existir). Preencha as chaves de API necessárias, especialmente a `GEMINI_API_KEY` para as funcionalidades de IA.

4.  **Executar o Servidor de Desenvolvimento:**
    Para iniciar a aplicação Next.js e o servidor Genkit em simultâneo:
    ```bash
    npm run dev
    ```
    - A aplicação web estará disponível em `http://localhost:9002`.
    - O Genkit UI (para inspecionar os fluxos de IA) estará em `http://localhost:4000`.

5.  **Aceder à Aplicação:**
    Abra o seu navegador e aceda a `http://localhost:9002`.

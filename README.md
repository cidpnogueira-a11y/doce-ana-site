# Doce Ana - React + Tailwind Version

Este é o site refeito em React utilizando Vite e Tailwind CSS, incluindo o componente **Aurora Background** animado com as cores personalizadas da Doce Ana!

## 🚀 Como Executar o Projeto

Como identifiquei que seu computador ainda não possui o **Node.js** instalado (necessário para rodar projetos React e Tailwind), siga os passos abaixo para ver o site funcionando:

### Passo 1: Instalar o Node.js
1. Acesse o site oficial do Node.js: [https://nodejs.org/](https://nodejs.org/)
2. Baixe e instale a versão **LTS** (Recomendada para a maioria dos usuários).
3. Após a instalação, reinicie o seu editor de código ou terminal para que ele reconheça os comandos `node` e `npm`.

### Passo 2: Instalar as Dependências
Abra o terminal dentro da pasta `doce-ana-react` e execute o comando:
```bash
npm install
```

### Passo 3: Rodar o Site
Ainda no terminal, na mesma pasta, execute:
```bash
npm run dev
```

Isso iniciará um servidor local. O terminal mostrará um link (geralmente `http://localhost:5173`). Segure a tecla `Ctrl` e clique no link para abrir o site no navegador!

---

**Detalhes da Integração:**
- O `aurora-background.tsx` foi implementado em `src/components/ui/`.
- O gradiente da Aurora foi ajustado para tons pastéis de caramelo, creme e dourado.
- O componente envolve toda a página (`<AuroraBackground className="min-h-screen">`), aplicando o belo efeito de fundo a todo o site, mantendo a responsividade e o Glassmorphism nos cards!

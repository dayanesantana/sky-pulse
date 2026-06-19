# ⚡ SkyPulse - Previsão do Tempo em Tempo Real

<p align="center">
  <img src="assets/images/banner.png" alt="SkyPulse Banner" width="100%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(147, 51, 255, 0.3);">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript ES6+">
  <img src="https://img.shields.io/badge/Open--Meteo-API-9333FF?style=for-the-badge" alt="Open-Meteo API">
</p>

---

## 📋 Descrição do Projeto

O **SkyPulse** é uma aplicação web de previsão do tempo moderna, rápida e extremamente elegante. Desenvolvido com uma estética futurista baseada em **Dark Mode** e **Glassmorphism**, o app consome as APIs gratuitas do **Open-Meteo** para buscar dados em tempo real de qualquer cidade do mundo. 

Ao digitar o nome da cidade, a aplicação realiza um encadeamento de requisições: primeiro busca as coordenadas geográficas precisas e, em seguida, as utiliza para obter as informações climáticas atuais, exibindo tudo com animações fluidas e feedbacks de carregamento inteligentes.

---

## ✨ Funcionalidades principais

* **🔍 Busca Inteligente:** Localiza coordenadas geográficas de qualquer cidade instantaneamente via API de Geocodificação.
* **🌡️ Dados Completos:** Exibe temperatura atual, sensação térmica, umidade relativa do ar, velocidade do vento e as coordenadas da busca.
* **🪐 Design Glassmorphism:** Interface semitransparente com desfoque de fundo (backdrop-filter) e bordas suaves.
* **🎨 Glow Dinâmico:** O card de clima altera sua iluminação de fundo (neon radial glow) e as cores dos ícones dinamicamente com base nas condições do tempo (Ensolarado, Nublado, Chuva, Neve, Tempestade).
* **📱 Responsividade Extrema:** Visualização impecável de telas mobile compactas até monitores ultra-wide, utilizando CSS Grid, Flexbox e unidades relativas.
* **⏳ Skeleton Screen Loader:** Animação de carregamento estilizada estilo "shimmer" (esqueleto da página) para melhorar a experiência do usuário durante as requisições.
* **⚠️ Tratamento de Erros:** Exibe mensagens claras e botões de ação amigáveis caso a cidade não seja localizada ou ocorra alguma falha na rede.

---

## 📂 Estrutura do Projeto

A organização das pastas do SkyPulse segue padrões modernos de arquitetura limpa e modular em aplicações front-end Vanilla:

```text
├── index.html               # Estrutura semântica principal e templates de feedback
├── README.md                # Documentação executiva do projeto
├── assets/
│   ├── css/
│   │   ├── global.css       # Variáveis do design system, reset, fontes e utilitários
│   │   └── components.css   # Estilos dos inputs, botões, cards, skeleton e glows
│   └── images/
│       └── banner.png       # Banner de identidade visual do projeto
└── src/
    ├── js/
        ├── api.js           # Funções de requisição HTTP (Fetch) para geolocalização e previsão
        ├── utils.js         # Mapeamento de clima (traduções/ícones) e formatação de datas
        └── main.js          # Escuta de eventos, gerenciador de estado visual e DOM
```

---

## 🚀 Como Executar o Projeto

Como a aplicação foi desenvolvida puramente em **HTML5**, **CSS3** e **JavaScript Vanilla**, ela não necessita de nenhuma etapa complexa de compilação ou instalação de pacotes de servidor.

### Opção 1: Execução Direta (Sem Servidor)
1. Faça o clone ou o download do projeto.
2. Navegue até a pasta raiz e abra o arquivo `index.html` diretamente em seu navegador web favorito (Chrome, Firefox, Edge, Safari, etc.).

### Opção 2: Utilizando Servidor Local (Recomendado para Desenvolvimento)
Para testar a aplicação com melhor performance de cache e suporte total a módulos ES6 nativos, utilize um servidor HTTP simples.

**Usando VS Code (Live Server):**
1. Abra a pasta do projeto no VS Code.
2. Se você tiver a extensão **Live Server** instalada, clique com o botão direito no `index.html` e selecione **"Open with Live Server"**.

**Usando Node.js (via Terminal):**
```bash
# Na pasta raiz do projeto, execute:
npx serve .
```

**Usando Python (via Terminal):**
```bash
# Para Python 3.x na pasta raiz:
python -m http.server 8000
```
Depois abra `http://localhost:8000` em seu navegador.

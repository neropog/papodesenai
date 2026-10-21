(function () {
  if (window.chatbotInicializado) return;
  window.chatbotInicializado = true;

  const cssStyles = `
    #faq-chatbot-widget {
      font-family: Arial, sans-serif !important;
      position: fixed !important;
      bottom: 20px !important;
      right: 20px !important;
      z-index: 99999999 !important;
    }

    #faq-toggle-btn {
      width: 60px !important;
      height: 60px !important;
      border-radius: 50% !important;
      background: linear-gradient(135deg, var(--verde), var(--verde-hover)) !important;
      color: #ffffff !important;
      border: none !important;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25) !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      outline: none !important;
    }

    #faq-toggle-btn svg {
      width: 28px !important;
      height: 28px !important;
      fill: #ffffff !important;
      pointer-events: none !important;
    }

    #faq-chat-window {
      position: fixed !important;
      bottom: 90px !important;
      right: 20px !important;
      width: 360px !important;
      max-width: calc(100vw - 40px) !important;
      height: 500px !important;
      max-height: calc(100vh - 120px) !important;
      background-color: var(--cartao) !important;
      border-radius: 16px !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2) !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
      z-index: 99999999 !important;
    }

    #faq-chat-window.faq-hidden {
      display: none !important;
    }

    .faq-header {
      background: linear-gradient(135deg, var(--verde), var(--verde-hover)) !important;
      color: #ffffff !important;
      padding: 14px 16px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
    }

    .faq-header-actions {
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
    }

    .faq-header h3 {
      margin: 0 !important;
      font-size: 15px !important;
      color: #ffffff !important;
    }

    .faq-icon-btn {
      background: transparent !important;
      border: none !important;
      color: #ffffff !important;
      font-size: 18px !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 2px !important;
      opacity: 0.85;
    }

    .faq-icon-btn:hover {
      opacity: 1;
    }

    #faq-messages {
      flex: 1 !important;
      padding: 14px !important;
      overflow-y: auto !important;
      background-color: var(--secao) !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 10px !important;
    }

    .faq-msg {
      max-width: 82% !important;
      padding: 10px 12px !important;
      border-radius: 12px !important;
      font-size: 14px !important;
      line-height: 1.4 !important;
    }

    .faq-msg.bot {
      align-self: flex-start !important;
      background-color: var(--cartao) !important;
      color: var(--texto) !important;
      border: 1px solid var(--borda) !important;
    }

    .faq-msg.user {
      align-self: flex-end !important;
      background-color: var(--verde) !important;
      color: #ffffff !important;
    }

    .faq-msg.system-info {
      align-self: center !important;
      background-color: var(--secao) !important;
      color: var(--verde) !important;
      font-size: 12px !important;
      border-radius: 8px !important;
      padding: 6px 10px !important;
      text-align: center !important;
    }

    .faq-options {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 6px !important;
      margin-top: 4px !important;
    }

    .faq-chip {
      background-color: var(--secao) !important;
      color: var(--verde) !important;
      border: 1px solid var(--borda) !important;
      padding: 8px 12px !important;
      border-radius: 16px !important;
      font-size: 12px !important;
      font-weight: 500 !important;
      cursor: pointer !important;
    }

    .faq-chip:hover {
      background-color: var(--fundo) !important;
    }

    .faq-footer {
      padding: 12px !important;
      background-color: var(--cartao) !important;
      border-top: 1px solid var(--borda) !important;
    }

    .faq-input-area {
      display: flex !important;
      gap: 8px !important;
      margin: 0 !important;
    }

    #faq-input {
      flex: 1 !important;
      padding: 10px 14px !important;
      border: 1px solid var(--borda) !important;
      border-radius: 20px !important;
      font-size: 14px !important;
      background: var(--fundo) !important;
      color: var(--texto) !important;
      min-width: 0 !important;
      outline: none !important;
    }

    #faq-send-btn {
      background-color: var(--verde) !important;
      color: #ffffff !important;
      border: none !important;
      width: 38px !important;
      height: 38px !important;
      border-radius: 50% !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    #faq-send-btn svg {
      width: 18px !important;
      height: 18px !important;
      fill: #ffffff !important;
    }
  `;

  const htmlTemplate = `
    <button id="faq-toggle-btn" type="button" aria-label="Abrir Chatbot">
      <svg id="faq-icon-open" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
      </svg>
      <svg id="faq-icon-close" viewBox="0 0 24 24" style="display: none;">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </button>

    <div id="faq-chat-window" class="faq-hidden">
      <div class="faq-header">
        <h3>Linche TI • Assistente Virtual</h3>
        <div class="faq-header-actions">
          
          
          <button type="button" id="faq-close-btn" class="faq-icon-btn" aria-label="Minimizar assistente" title="Minimizar assistente">−</button>
        </div>
      </div>
      <div id="faq-messages"></div>
      <div class="faq-footer">
        <div class="faq-input-area">
          <input type="text" id="faq-input" placeholder="Digite sua pergunta..." autocomplete="off" />
          <button type="button" id="faq-send-btn" aria-label="Enviar">
            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;
  let baseConhecimento = [];

  window.initChatbot = function (opcoes = {}) {
    if (document.getElementById("faq-chatbot-widget")) return;

    const styleTag = document.createElement("style");
    styleTag.textContent = cssStyles;
    document.head.appendChild(styleTag);
    const container = document.createElement("div");
    container.id = "faq-chatbot-widget";
    container.innerHTML = htmlTemplate;
    document.body.appendChild(container);

    const toggleBtn = document.getElementById("faq-toggle-btn");
    const closeBtn = document.getElementById("faq-close-btn");
    const chatWindow = document.getElementById("faq-chat-window");
    chatWindow.setAttribute("aria-hidden", "true");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-controls", "faq-chat-window");
    const iconOpen = document.getElementById("faq-icon-open");
    const iconClose = document.getElementById("faq-icon-close");
    const messagesBox = document.getElementById("faq-messages");
    const sendBtn = document.getElementById("faq-send-btn");
    const input = document.getElementById("faq-input");


    function addMessage(texto, tipo) {
      const div = document.createElement("div");
      div.className = `faq-msg ${tipo}`;
      div.textContent = texto;
      messagesBox.appendChild(div);
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    function carregarMenuInicial() {
      if (messagesBox.children.length > 0) return;
      addMessage("Olá! 👋 Sou o assistente virtual da Linche TI. Como posso ajudar?", "bot");

      const optsContainer = document.createElement("div");
      optsContainer.className = "faq-options";
      optsContainer.id = "faq-opcoes-iniciais";
      const destaques = baseConhecimento.filter(item => item.destaque).slice(0, 6);
      (destaques.length ? destaques : baseConhecimento.slice(0, 6)).forEach(item => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "faq-chip";
        btn.textContent = item.titulo || item.pergunta;
        btn.addEventListener("click", () => {
          addMessage(item.titulo || item.pergunta, "user");
          setTimeout(() => addMessage(item.resposta, "bot"), 200);
        });
        optsContainer.appendChild(btn);
      });
      messagesBox.appendChild(optsContainer);
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    function atualizarOpcoes() {
      const opcoesAntigas = document.getElementById("faq-opcoes-iniciais");
      if (opcoesAntigas) opcoesAntigas.remove();
      const destaques = baseConhecimento.filter(item => item.destaque).slice(0, 6);
      const lista = destaques.length ? destaques : baseConhecimento.slice(0, 6);
      if (!lista.length) return;
      const grupo = document.createElement("div");
      grupo.className = "faq-options";
      grupo.id = "faq-opcoes-iniciais";
      lista.forEach(item => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "faq-chip";
        botao.textContent = item.titulo || item.pergunta;
        botao.addEventListener("click", () => {
          addMessage(botao.textContent, "user");
          setTimeout(() => addMessage(item.resposta, "bot"), 200);
        });
        grupo.appendChild(botao);
      });
      messagesBox.appendChild(grupo);
    }

    function normalizarTexto(txt) {
      return String(txt || "").toLowerCase().normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ").trim();
    }

    const palavrasIgnoradas = new Set([
      "o", "a", "os", "as", "um", "uma", "uns", "umas", "de", "da", "do", "das", "dos",
      "em", "na", "no", "nas", "nos", "e", "ou", "para", "por", "com", "sem", "que",
      "qual", "quais", "quanto", "quantos", "como", "onde", "quando", "voce", "voces",
      "eu", "meu", "minha", "seu", "sua", "tem", "ter", "faz", "fazem", "pode", "podem",
      "consigo", "gostaria", "queria", "preciso", "quer", "ser", "sobre", "funciona",
      "linche", "empresa", "ti", "servico", "servicos", "atendem", "oferecem"
    ]);

    function termosRelevantes(texto) {
      return normalizarTexto(texto).split(" ")
        .filter(palavra => palavra.length > 2 && !palavrasIgnoradas.has(palavra));
    }

    function buscarResposta(textoUsuario) {
      const consulta = normalizarTexto(textoUsuario);
      const termos = [...new Set(termosRelevantes(textoUsuario))];
      if (!termos.length) {
        return "Pode me dizer qual serviço ou problema de TI você quer conhecer? Por exemplo: backup, suporte remoto, prazos ou orçamento.";
      }

      let melhorItem = null;
      let melhorPontuacao = 0;
      baseConhecimento.forEach(item => {
        const pergunta = normalizarTexto(item.pergunta || item.titulo || "");
        const titulo = normalizarTexto(item.titulo || "");
        const keywords = (item.keywords || []).map(normalizarTexto).filter(Boolean);
        const termosDoItem = new Set([
          ...termosRelevantes(pergunta),
          ...termosRelevantes(titulo),
          ...keywords.flatMap(termosRelevantes)
        ]);
        let pontos = consulta === pergunta || consulta === titulo ? 100 : 0;
        let correspondencias = 0;
        termos.forEach(termo => {
          if (termosDoItem.has(termo)) {
            correspondencias++;
            pontos += 5;
          }
        });
        keywords.forEach(chave => {
          if (chave.includes(" ") && (` ${consulta} `).includes(` ${chave} `)) pontos += 12;
        });
        if (correspondencias) pontos = pontos * (correspondencias / termos.length);
        if (pontos > melhorPontuacao) {
          melhorPontuacao = pontos;
          melhorItem = item;
        }
      });

      if (melhorItem && melhorPontuacao >= 5) return melhorItem.resposta;
      return "Não tenho uma informação confirmada para essa pergunta. A Linche TI trabalha com soluções corporativas de tecnologia, mas a disponibilidade e os detalhes dependem da necessidade da empresa. Entre em contato pela seção Contato para receber uma orientação específica.";
    }

    function dispararEnvio() {
      const txt = input.value.trim();
      if (!txt) return;

      addMessage(txt, "user");
      input.value = "";

      setTimeout(() => {
        addMessage(buscarResposta(txt), "bot");
      }, 300);
    }

    function toggleChat() {
      const estaFechado = chatWindow.classList.contains("faq-hidden");
      if (estaFechado) {
        chatWindow.classList.remove("faq-hidden");
        chatWindow.setAttribute("aria-hidden", "false");
        toggleBtn.setAttribute("aria-expanded", "true");
        toggleBtn.setAttribute("aria-label", "Minimizar assistente");
        iconOpen.style.display = "none";
        iconClose.style.display = "block";
        input.focus();
      } else {
        chatWindow.classList.add("faq-hidden");
        chatWindow.setAttribute("aria-hidden", "true");
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.setAttribute("aria-label", "Abrir assistente");
        iconOpen.style.display = "block";
        iconClose.style.display = "none";
      }
    }

    carregarMenuInicial();

    if (opcoes.jsonUrl) {
      fetch(opcoes.jsonUrl)
        .then(res => { if (!res.ok) throw new Error("HTTP " + res.status); return res.json(); })
        .then(dados => {
          if (Array.isArray(dados)) {
            baseConhecimento = dados;
            atualizarOpcoes();
            
          } else {
            throw new Error("A base precisa ser uma lista JSON.");
          }
        })
        .catch(err => { console.error("Erro ao carregar JSON:", err); addMessage("Não foi possível carregar as informações. Abra o site por um servidor local ou hospedagem.", "system-info"); });
    }

    toggleBtn.addEventListener("click", toggleChat);
    closeBtn.addEventListener("click", () => {
      if (!chatWindow.classList.contains("faq-hidden")) toggleChat();
      toggleBtn.focus();
    });
    sendBtn.addEventListener("click", dispararEnvio);

    input.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        dispararEnvio();
      }
    });

  };

})();
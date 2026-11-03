# Linche TI

Landing page estática em HTML, CSS e JavaScript. Sem instalação ou backend.

## Publicação

Repositório correto: https://github.com/neropog/papodesenai — branch `main`.
Serviço principal: https://linche-t-i.onrender.com — Static Site, diretório publicado `.`, build vazio e deploy automático por commit. Ligação confirmada pela integração Render em 03/11/2026. O serviço `liince.onrender.com` também acompanha a mesma branch e pode receber as mesmas alterações automaticamente.

## Executar localmente

Abra esta pasta no VS Code e inicie o Live Server, ou execute `python3 -m http.server 8080` e visite http://localhost:8080.

## Funcionalidades

- Modo claro/escuro: botão no cabeçalho, preferência salva em `linche-tema-v1`; sem escolha explícita, segue o sistema. Armazenamento bloqueado não impede alternar.
- Carrossel: setas, indicadores e reprodução opcional a cada 6,5 segundos. Pausa ao passar o mouse, focar conteúdo ou ocultar a aba. A navegação manual encerra a reprodução. Movimento reduzido desativa a reprodução automática.
- Cards: símbolos leves no lugar de fotografias repetidas; Microsoft 365 utiliza o arquivo oficial da Microsoft salvo em `assets/microsoft.svg`.
- Galeria e detalhes: CSS `:target`, com Escape, foco contido e retorno ao acionador via JavaScript.
- Contato: data de agendamento com calendário nativo (`input type="date"`), data mínima local de hoje e inclusão da data na mensagem preparada. A escolha não confirma reserva; o envio é concluído no aplicativo de e-mail. Não existe coleta de data de nascimento.
- Endereço sem fotografia, com o redirecionamento original ao Google Maps.
- Links originais de Linche AI, Instagram, WhatsApp e assistente preservados. O assistente utiliza `chatbot.js` e `minha-base-dados.json` do repositório original.
- Aviso de armazenamento com fechamento e persistência opcional. “Preferências locais” reabre o aviso; “Apagar preferência salva” remove aviso e tema salvos.

## Arquivos

`index.html`: conteúdo e links; `style.css`: identidade visual, temas e responsividade; `theme.js`: aplicação antecipada do tema; `script.js`: interações; `assets/`: fotos, favicon e símbolo Microsoft; `FONTES.md`: pesquisa e créditos.

A cópia anterior recuperada do site está em `referencia/index-publicado.html`, somente para consulta. Fotos de banco são ilustrativas e não representam a equipe, a localização ou instalações da empresa.

## Verificação antes de futuras alterações

1. Teste os dois temas e recarregue a página para conferir a persistência.
2. Navegue pelos três slides e teste iniciar/pausar a reprodução.
3. Abra serviços e fotos com teclado; confira Escape e Tab.
4. Abra o calendário, escolha uma data futura e confira a mensagem de e-mail sem enviá-la durante testes.
5. Revise o menu em celular e os links de telefone, e-mail, mapa, redes sociais e Linche AI.
6. Faça commit e push para `main` apenas quando quiser atualizar as hospedagens conectadas. Compare o SHA do commit com o deploy no Render.

Referência: https://render.com/docs/static-sites .

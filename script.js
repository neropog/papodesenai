
'use strict';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
menuButton.hidden = false;
menu.classList.add('menu-collapsed');
function closeMenu() { menu.classList.add('menu-collapsed'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('menu-collapsed') === false;
  menuButton.setAttribute('aria-expanded', String(open));
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
menu.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); menuButton.focus(); } });
const slides = [...document.querySelectorAll('[data-slide]')];
const dots = [...document.querySelectorAll('[data-go]')];
let current = 0;
let timer;
let playing = false;
const hero = document.querySelector('.hero');
const playButton = document.querySelector('[data-play]');
function showSlide(index) {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => { slide.hidden = i !== current; });
  dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === current)));
  document.querySelector('.slide-status').textContent = `0${current + 1} / 03`;
}
function pauseTimer() { clearInterval(timer); }
function startTimer() {
  pauseTimer();
  if (playing && !reducedMotion.matches && !document.hidden && !hero.matches(':hover') && !hero.contains(document.activeElement)) {
    timer = setInterval(() => showSlide(current + 1), 6500);
  }
}
function stopPlayback() {
  playing = false; pauseTimer(); playButton.textContent = 'Reproduzir';
  playButton.setAttribute('aria-pressed', 'false'); playButton.setAttribute('aria-label', 'Reproduzir slides automaticamente');
}
function manualSlide(index) { stopPlayback(); showSlide(index); }
dots.forEach(dot => dot.addEventListener('click', () => manualSlide(Number(dot.dataset.go))));
document.querySelector('[data-prev]').addEventListener('click', () => manualSlide(current - 1));
document.querySelector('[data-next]').addEventListener('click', () => manualSlide(current + 1));
playButton.addEventListener('click', () => {
  if (playing) { stopPlayback(); return; }
  if (reducedMotion.matches) return;
  playing = true; playButton.textContent = 'Pausar'; playButton.setAttribute('aria-pressed', 'true');
  playButton.setAttribute('aria-label', 'Pausar reprodução automática'); startTimer();
});
hero.addEventListener('mouseenter', pauseTimer); hero.addEventListener('mouseleave', startTimer);
hero.addEventListener('focusin', pauseTimer); hero.addEventListener('focusout', () => setTimeout(startTimer, 0));
document.addEventListener('visibilitychange', startTimer);
function motionPreference() { if (reducedMotion.matches) stopPlayback(); playButton.disabled = reducedMotion.matches; }
reducedMotion.addEventListener('change', motionPreference); motionPreference();
const precisePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
document.querySelectorAll('[data-tilt]').forEach(card => {
  let frame;
  card.addEventListener('pointermove', event => {
    if (!precisePointer.matches || reducedMotion.matches || event.pointerType !== 'mouse') return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--rx', `${-(event.clientY - rect.top - rect.height / 2) / rect.height * 9}deg`);
      card.style.setProperty('--ry', `${(event.clientX - rect.left - rect.width / 2) / rect.width * 9}deg`);
    });
  });
  function reset() { cancelAnimationFrame(frame); card.style.removeProperty('--rx'); card.style.removeProperty('--ry'); }
  card.addEventListener('pointerleave', reset); card.addEventListener('pointercancel', reset);
});
let activeModal = null;
let opener = null;
const pageAreas = [...document.querySelectorAll('body > .skip-link, body > header, body > main, body > footer, body > aside')];
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (link && !activeModal && document.getElementById(link.hash.slice(1))?.classList.contains('modal')) opener = link;
});
function syncModal() {
  const target = document.getElementById(location.hash.slice(1));
  const next = target?.classList.contains('modal') ? target : null;
  const previous = activeModal;
  if (next === previous) return;
  activeModal = next;
  document.body.classList.toggle('modal-open', Boolean(next));
  pageAreas.forEach(area => { area.inert = Boolean(next); });
  if (next) { stopPlayback(); next.querySelector('.close-btn').focus({preventScroll:true}); }
  else if (previous) {
    const returnFocus = opener || document.getElementById(previous.dataset.return);
    if (returnFocus) { if (!returnFocus.matches('a,button')) returnFocus.setAttribute('tabindex','-1'); returnFocus.focus({preventScroll:true}); }
    opener = null;
  }
}
window.addEventListener('hashchange', syncModal); syncModal();
document.addEventListener('keydown', event => {
  if (!activeModal) return;
  if (event.key === 'Escape') { event.preventDefault(); location.hash = activeModal.dataset.return; }
  if (event.key === 'Tab') {
    const focusable = [...activeModal.querySelectorAll('a[href],button:not(:disabled),[tabindex="0"]')].filter(el => !el.classList.contains('modal-overlay'));
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && (document.activeElement === first || !focusable.includes(document.activeElement))) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
const notice = document.querySelector('.banner-cookies');
const storageKey = 'linche-aviso-v1';
let remembered = false;
try { remembered = localStorage.getItem(storageKey) === 'ok'; } catch {  }
notice.hidden = remembered;
const reopen = document.querySelector('#reabrir-aviso'); reopen.hidden = false;
function dismissNotice(save) {
  if (save) { try { localStorage.setItem(storageKey, 'ok'); } catch {  } }
  notice.hidden = true; reopen.focus({preventScroll:true});
}
document.querySelector('#cookies-aceitar').addEventListener('click', () => dismissNotice(true));
document.querySelector('#cookies-fechar').addEventListener('click', () => dismissNotice(false));
reopen.addEventListener('click', () => { notice.hidden = false; document.querySelector('#cookies-aceitar').focus(); });
document.querySelector('#apagar-preferencia').addEventListener('click', () => {
  try { localStorage.removeItem(storageKey); localStorage.removeItem('linche-tema-v1'); explicitTheme = false; document.documentElement.dataset.theme = systemTheme.matches ? 'dark' : 'light'; updateThemeControl(); document.querySelector('#privacidade-status').textContent = 'Preferência apagada. O aviso reaparecerá na próxima visita.'; }
  catch { document.querySelector('#privacidade-status').textContent = 'O armazenamento não está disponível neste navegador.'; }
});
document.querySelector('#contato-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const chosen = data.get('data');
  const dateLabel = chosen ? chosen.split('-').reverse().join('/') : 'A combinar';
  const body = `Nome: ${data.get('nome')}\nE-mail: ${data.get('email')}\nData preferencial: ${dateLabel}\n\n${data.get('mensagem')}`;
  location.href = `mailto:contato@lincheti.com.br?subject=${encodeURIComponent('Conversa sobre TI — site Linche')}&body=${encodeURIComponent(body)}`;
  document.querySelector('#form-status').textContent = 'Conclua o envio no aplicativo de e-mail. Se ele não abriu, use o endereço de contato ao lado.';
});
document.querySelector('#ano').textContent = new Date().getFullYear();
const themeToggle = document.querySelector('#theme-toggle');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
let explicitTheme = false;
try { explicitTheme = ['light','dark'].includes(localStorage.getItem('linche-tema-v1')); } catch {}
function updateThemeControl() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeToggle.textContent = dark ? 'Modo claro' : 'Modo escuro';
  themeToggle.setAttribute('aria-label', dark ? 'Ativar modo claro' : 'Ativar modo escuro');
  themeToggle.setAttribute('aria-pressed', String(dark));
}
themeToggle.hidden = false; updateThemeControl();
themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next; explicitTheme = true;
  try { localStorage.setItem('linche-tema-v1', next); } catch {}
  updateThemeControl();
});
systemTheme.addEventListener('change', event => {
  if (!explicitTheme) { document.documentElement.dataset.theme = event.matches ? 'dark' : 'light'; updateThemeControl(); }
});
const appointment = document.querySelector('#data');
function updateMinDate() {
  const now = new Date();
  appointment.min = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
}
updateMinDate(); appointment.addEventListener('focus', updateMinDate);
initChatbot({jsonUrl:'minha-base-dados.json'});
const chatWidget = document.querySelector('#faq-chatbot-widget');
pageAreas.push(chatWidget);
if (activeModal) chatWidget.inert = true;
document.querySelector('#abrir-chat-menu').addEventListener('click', event => {
  event.preventDefault();
  if (document.querySelector('#faq-chat-window').classList.contains('faq-hidden')) document.querySelector('#faq-toggle-btn').click();
  document.querySelector('#faq-input').focus();
});

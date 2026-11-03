/* Executado antes da folha ser pintada para evitar um clarão no tema salvo. */
(() => {
  let theme;
  try { theme = localStorage.getItem('linche-tema-v1'); } catch { /* preferência opcional */ }
  const dark = theme === 'dark' || (theme !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
})();

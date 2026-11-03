
(() => {
  let theme;
  try { theme = localStorage.getItem('linche-tema-v1'); } catch {  }
  const dark = theme === 'dark' || (theme !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
})();

const reveals = document.querySelectorAll('[data-reveal]');
if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  reveals.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  reveals.forEach((el) => observer.observe(el));
}

const currentPath = location.pathname.replace(/\\/g, '/').toLowerCase().replace(/\/+$/, '');
document.querySelectorAll('[data-nav]').forEach((link) => {
  const hrefPath = new URL(link.getAttribute('href'), location.href).pathname.replace(/\\/g, '/').toLowerCase().replace(/\/+$/, '');
  const currentFile = currentPath.split('/').pop() || 'index.html';
  const hrefFile = hrefPath.split('/').pop() || 'index.html';
  if (currentPath.endsWith(hrefFile) || (currentFile === '' && hrefFile === 'index.html')) {
    link.classList.add('is-active');
  }
});

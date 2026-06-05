(function () {
  'use strict'

  /* ── Banner ── */
  const banner = document.getElementById('klaveai-banner')
  if (banner) {
    banner.innerHTML = `
      <span class="banner-desktop">
        Esta web es una demo creada por KlaveAI · ¿La quieres para tu negocio?&nbsp;
        <a href="https://klaveai.es" target="_blank" rel="noopener">Más info en klaveai.es →</a>
      </span>
      <span class="banner-mobile">
        Demo de KlaveAI · <a href="https://klaveai.es" target="_blank" rel="noopener">klaveai.es</a>
      </span>
    `
  }

  /* ── Navigation ── */
  const nav = document.getElementById('site-nav')
  if (nav) {
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/'

    const links = [
      { href: '/',          label: 'Inicio' },
      { href: '/cursos',    label: 'Cursos' },
      { href: '/matricula', label: 'Matrícula' },
      { href: '/contacto',  label: 'Contacto' },
    ]

    const linksHtml = links.map(l => {
      const active = currentPath === l.href ? 'aria-current="page"' : ''
      return `<li><a href="${l.href}" ${active}>${l.label}</a></li>`
    }).join('')

    nav.innerHTML = `
      <div class="container">
        <div class="nav-inner">
          <a href="/" class="nav-logo">Lingua <em>Academia</em></a>
          <button class="nav-toggle" aria-label="Abrir menú" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
          <ul class="nav-links" id="nav-links">
            ${linksHtml}
            <li><a href="/matricula" class="nav-cta">Empieza ahora</a></li>
          </ul>
        </div>
      </div>
    `

    const toggle   = nav.querySelector('.nav-toggle')
    const navLinks = nav.querySelector('#nav-links')

    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open')
      toggle.classList.toggle('open', open)
      toggle.setAttribute('aria-expanded', open)
    })

    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) {
        navLinks.classList.remove('open')
        toggle.classList.remove('open')
        toggle.setAttribute('aria-expanded', false)
      }
    })
  }

  /* ── Footer ── */
  const footer = document.getElementById('site-footer')
  if (footer) {
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <h3>Lingua <em>Academia</em></h3>
            <p>Academia de idiomas de barrio con grupos reducidos,
               profesores nativos y horarios que se adaptan a ti.
               Inglés, francés, alemán e italiano.</p>
            <span class="footer-brand-tagline">Calle Atocha 22 · Madrid</span>
          </div>
          <div class="footer-col">
            <h4>Páginas</h4>
            <ul>
              <li><a href="/">Inicio</a></li>
              <li><a href="/cursos">Cursos</a></li>
              <li><a href="/matricula">Matrícula</a></li>
              <li><a href="/contacto">Contacto</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Contacto</h4>
            <p>Calle Atocha 22, Madrid</p>
            <p>91 567 89 01</p>
            <p>info@lingua-academy.es</p>
            <p style="margin-top:8px">Lun–Sáb: 9:00–21:00</p>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Lingua — Academia de Idiomas</span>
          <a href="https://klaveai.es" target="_blank" rel="noopener">Web creada por KlaveAI</a>
        </div>
      </div>
    `
  }
})()

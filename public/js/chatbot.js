(function () {
  'use strict'

  /* ── Respuestas por palabras clave ── */
  const rules = [
    {
      keys: ['idioma', 'idiomas', 'lengua', 'ingles', 'inglés', 'frances', 'francés', 'aleman', 'alemán', 'italiano', 'que enseñais', 'que impartis'],
      answer: 'Impartimos <strong>inglés, francés, alemán e italiano</strong>. Todos los niveles desde A1 hasta C2.'
    },
    {
      keys: ['precio', 'precios', 'cuanto', 'cuánto', 'cuesta', 'caro', 'barato', 'coste', 'tarifa', 'euros', 'mensualidad', 'mensual'],
      answer: 'Los cursos van desde <strong>89€/mes</strong> en grupos de hasta 8 alumnos. Consulta precios exactos en <a href="/cursos">/cursos</a>.'
    },
    {
      keys: ['horario', 'hora', 'mañana', 'tarde', 'noche', 'cuando', 'horarios', 'turno', 'clase'],
      answer: 'Tenemos grupos de <strong>mañana, tarde y noche</strong> de lunes a sábado. Algún horario encaja seguro.'
    },
    {
      keys: ['prueba', 'nivel', 'test', 'evalua', 'evalúa', 'gratis', 'gratuita', 'gratuito', 'nivelacion', 'nivelación'],
      answer: 'La prueba de nivel es <strong>gratuita y sin compromiso</strong>. Pídela en <a href="/matricula">/matricula</a> y te llamamos para organizarla.'
    },
    {
      keys: ['matricula', 'matrícula', 'inscribir', 'apuntar', 'apuntarme', 'empezar', 'empiezo', 'inicio', 'inscripcion', 'inscripción'],
      answer: 'Puedes matricularte desde <a href="/matricula">/matricula</a>, llamarnos al <strong>91 567 89 01</strong> o pasarte por la academia.'
    },
    {
      keys: ['profesor', 'profesores', 'native', 'nativo', 'nativos', 'quien enseña', 'quién enseña', 'formacion', 'formación', 'certificado'],
      answer: 'Todos nuestros profesores son <strong>nativos o tienen nivel C2 certificado</strong>. Grupos máximo 8 alumnos.'
    },
    {
      keys: ['grupo', 'grupos', 'alumnos', 'compañeros', 'clase', 'cuantos', 'cuántos', 'reducido', 'pequeño'],
      answer: 'Los grupos son de <strong>máximo 8 alumnos</strong> para que puedas practicar de verdad en cada clase.'
    },
    {
      keys: ['donde', 'ubicacion', 'ubicación', 'dirección', 'direccion', 'llegar', 'sitio', 'lugar', 'calle', 'mapa', 'metro', 'academia'],
      answer: 'Estamos en <strong>Calle Atocha 22, Madrid</strong>. Metro Antón Martín, línea 1.'
    },
  ]

  const fallback = 'No he entendido bien tu pregunta. Llámanos al <strong>91 567 89 01</strong> o pásate por la academia, estaremos encantados de ayudarte.'

  const suggestions = ['Idiomas', 'Precios', 'Prueba de nivel', 'Horarios']

  function normalize(str) {
    return str.toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
  }

  function getAnswer(text) {
    const norm = normalize(text)
    for (const rule of rules) {
      if (rule.keys.some(k => norm.includes(normalize(k)))) {
        return rule.answer
      }
    }
    return fallback
  }

  /* ── DOM ── */
  function buildWidget() {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `
      <button class="chat-launcher" id="chat-launcher" aria-label="Abrir asistente">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span class="chat-bubble-count" id="chat-badge">1</span>
      </button>

      <div class="chat-window" id="chat-window" role="dialog" aria-label="Asistente de Lingua Academia">
        <div class="chat-header">
          <div class="chat-avatar">🌍</div>
          <div class="chat-header-info">
            <strong>Asistente de Lingua</strong>
            <span>● En línea ahora</span>
          </div>
          <button class="chat-close-btn" id="chat-close" aria-label="Cerrar">✕</button>
        </div>

        <div class="chat-demo-notice">
          Chatbot de demostración. En tu versión real las respuestas se configuran desde tu panel.
        </div>

        <div class="chat-messages" id="chat-messages"></div>

        <div class="chat-suggestions" id="chat-suggestions">
          ${suggestions.map(s => `<button class="chat-suggestion">${s}</button>`).join('')}
        </div>

        <div class="chat-input-row">
          <input class="chat-input" id="chat-input" type="text"
                 placeholder="Escribe tu pregunta…" autocomplete="off" maxlength="200">
          <button class="chat-send" id="chat-send" aria-label="Enviar">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    `
    document.body.appendChild(wrapper)

    const launcher  = document.getElementById('chat-launcher')
    const chatWin   = document.getElementById('chat-window')
    const closeBtn  = document.getElementById('chat-close')
    const input     = document.getElementById('chat-input')
    const sendBtn   = document.getElementById('chat-send')
    const msgArea   = document.getElementById('chat-messages')
    const badge     = document.getElementById('chat-badge')
    const suggsEl   = document.getElementById('chat-suggestions')

    setTimeout(() => addBotMsg('¡Hola! Soy el asistente de Lingua Academia 🌍 ¿En qué puedo ayudarte?'), 600)

    var isOpen = false
    var savedScrollY = 0

    function isMobile() { return window.innerWidth <= 600 }

    function lockBodyScroll() {
      if (!isMobile()) return
      savedScrollY = window.scrollY
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = '-' + savedScrollY + 'px'
      document.body.style.width = '100%'
    }

    function unlockBodyScroll() {
      if (!isMobile()) return
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, savedScrollY)
    }

    function syncViewport() {
      if (!isMobile() || !isOpen) {
        chatWin.style.height = ''
        chatWin.style.top = ''
        return
      }
      var vv = window.visualViewport
      chatWin.style.top    = Math.round(vv.offsetTop) + 'px'
      chatWin.style.height = Math.round(vv.height) + 'px'
      msgArea.scrollTop = msgArea.scrollHeight
    }

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', syncViewport)
      window.visualViewport.addEventListener('scroll', syncViewport)
    }

    chatWin.addEventListener('touchmove', function (e) {
      e.stopPropagation()
    }, { passive: true })

    function open() {
      isOpen = true
      chatWin.classList.add('open')
      launcher.classList.add('open')
      badge.style.display = 'none'
      lockBodyScroll()
      syncViewport()
      if (!isMobile()) input.focus()
    }

    function close() {
      isOpen = false
      chatWin.classList.remove('open')
      launcher.classList.remove('open')
      chatWin.style.height = ''
      chatWin.style.top = ''
      unlockBodyScroll()
    }

    launcher.addEventListener('click', () => isOpen ? close() : open())
    closeBtn.addEventListener('click', close)

    suggsEl.addEventListener('click', e => {
      if (e.target.classList.contains('chat-suggestion')) {
        const text = e.target.textContent
        addUserMsg(text)
        showTyping(() => addBotMsg(getAnswer(text)))
      }
    })

    function send() {
      const text = input.value.trim()
      if (!text) return
      input.value = ''
      addUserMsg(text)
      showTyping(() => addBotMsg(getAnswer(text)))
    }

    sendBtn.addEventListener('click', send)
    input.addEventListener('keydown', e => { if (e.key === 'Enter') send() })

    function addUserMsg(text) {
      const msg = document.createElement('div')
      msg.className = 'chat-msg user'
      msg.innerHTML = `<div class="msg-bubble">${escapeHtml(text)}</div>`
      msgArea.appendChild(msg)
      scroll()
    }

    function addBotMsg(html) {
      const msg = document.createElement('div')
      msg.className = 'chat-msg bot'
      msg.innerHTML = `<div class="msg-bubble">${html}</div>`
      msgArea.appendChild(msg)
      scroll()
    }

    let typingEl = null
    function showTyping(cb) {
      typingEl = document.createElement('div')
      typingEl.className = 'chat-msg bot'
      typingEl.innerHTML = `<div class="chat-typing"><span></span><span></span><span></span></div>`
      msgArea.appendChild(typingEl)
      scroll()
      setTimeout(() => {
        typingEl && typingEl.remove()
        cb()
      }, 900 + Math.random() * 400)
    }

    function scroll() { msgArea.scrollTop = msgArea.scrollHeight }

    function escapeHtml(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildWidget)
  } else {
    buildWidget()
  }
})()

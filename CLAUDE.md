# CLAUDE.md — Demo Academia

> Instrucciones permanentes para Claude Code en este repositorio.

---

## Proyecto

**Lingua — Academia de Idiomas** — Demo pública KlaveAI  
Web ficticia de academia de idiomas de barrio para captación de clientes del sector formación.  
URL: https://demo-academia.klaveai.es

## Documentos de referencia

Antes de generar cualquier output, leer:

- `/klaveai/web/CONTEXT.md` — identidad y datos de KlaveAI
- `/klaveai/web/BRANDKIT.md` — paleta, tipografía y tono de KlaveAI

## Reglas inamovibles

- Todo en **español de España**
- **No mencionar KlaveAI** dentro del contenido de la academia salvo en el banner superior
- Mobile-first obligatorio en todo el CSS
- `noindex, nofollow` en todas las páginas + `robots.txt` con `Disallow: /`

## Identidad de la demo

| Campo | Valor |
|---|---|
| Nombre | Lingua — Academia de Idiomas |
| Concepto | Academia de idiomas de barrio, grupos reducidos, profesores nativos |
| Dirección | Calle Atocha 22, 28012 Madrid |
| Teléfono | 91 567 89 01 |
| Email | info@lingua-academy.es |
| Horario | Lun–Vie 9:00–21:00 · Sáb 9:00–15:00 |

## Paleta de colores

| Variable CSS | HEX | Uso |
|---|---|---|
| `--azul` | `#1B3A6B` | Color principal, botones, nav |
| `--azul-dark` | `#142d54` | Hover de botones |
| `--azul-claro` | `#E8EEF8` | Fondos de secciones, badges |
| `--amarillo` | `#F5C842` | CTA principal, acentos |
| `--amarillo-dark` | `#d4aa2e` | Hover amarillo, eyebrows |
| `--blanco` | `#FFFFFF` | Fondo general |
| `--gris-fondo` | `#F4F6F9` | Fondos alternos |
| `--gris-texto` | `#3D3D3D` | Texto de cuerpo |
| `--gris-medio` | `#7A8499` | Texto secundario |
| `--banner-bg` | `#0F4A3A` | Banner KlaveAI |
| `--banner-text` | `#9FE1CB` | Texto banner KlaveAI |

## Tipografía

- **Todo:** Plus Jakarta Sans (Google Fonts) — pesos 400/500/600/700/800, con itálica

## Stack técnico

- **Backend:** Node.js + Express (CommonJS, `require`)
- **Frontend:** HTML/CSS/JS puro — sin frameworks
- **Puerto local:** 3005
- **PM2:** proceso `demo-academia`

## Infraestructura

- **VPS:** `klaveai@152.239.112.173` puerto SSH `2277`
- **Ruta en servidor:** `/var/www/demo-academia/`
- **Nginx:** `/etc/nginx/sites-enabled/demo-academia.klaveai.es`
- **SSL:** Let's Encrypt (certbot)

## Estado del proyecto

> Última actualización: 2026-06-05 (sesión 2)

### Construcción completada ✅

- [x] Estructura de carpetas y archivos base
- [x] Layout base: banner KlaveAI, nav (components.js), footer
- [x] Home completa: hero, idiomas (4), metodología, prueba nivel CTA, testimonios (3), CTA matrícula
- [x] Página `/cursos`: tabs por idioma, 6 niveles por idioma (A1–C2) con horarios y precios
- [x] Página `/matricula`: formulario completo + confirmación visual + info lateral con precios
- [x] Página `/contacto`: dirección, teléfono, email, horarios, iframe Google Maps
- [x] Chatbot widget con 8 reglas de palabras clave + aviso demo + color azul marino
- [x] `robots.txt` con `Disallow: /` + `noindex, nofollow` en todas las páginas
- [x] `server.js` Express puerto 3005
- [x] `nginx.conf` para demo-academia.klaveai.es
- [x] `CLAUDE.md` documentado

### Páginas

| Ruta | Archivo | Estado |
|---|---|---|
| `/` | `public/index.html` | ✅ |
| `/cursos` | `public/cursos.html` | ✅ |
| `/matricula` | `public/matricula.html` | ✅ |
| `/contacto` | `public/contacto.html` | ✅ |

### Fixes aplicados

- **Zoom iOS en chatbot:** `font-size: 14px` → `16px` en `.chat-input` (regla base). iOS Safari hace zoom al enfocar inputs con fuente inferior a 16px; al usar Plus Jakarta Sans (fuente web externa) el bug era más evidente que con Inter. Fix aplicado en las 4 demos.

### Pendiente

- [ ] Enlace en klaveai.es → sección sectores → card Academia/Formación

## Flujo de despliegue

```bash
# Local → GitHub
git add . && git commit -m "..." && git push

# GitHub → VPS
ssh -p 2277 klaveai@152.239.112.173 "cd /var/www/demo-academia && git pull && pm2 restart demo-academia"
```

## Forma de trabajar

1. Toma decisiones de implementación sin preguntar, salvo arquitectura o paleta de colores.
2. Después de cada commit, actualiza la sección "Estado del proyecto" en este CLAUDE.md.
3. Si encuentras un bug, corrígelo directamente. Documenta en el commit y en este archivo.
4. Haz push a `origin main` después de cada commit.

## Commits

Mensajes en español, claros y descriptivos:
- `feat: añadir tabs de idioma en /cursos`
- `fix: corregir scroll del chatbot en móvil`
- `style: ajustar espaciado en grid de testimonios`

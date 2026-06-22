/* ── main.js — shared across all pages ──────────────────────────────────── */

// ── Navbar scroll effect + logo swap ───────────────────────────────────────
const nav        = document.getElementById('main-nav')
const navLogoImg = document.getElementById('nav-logo-img')
const footerLogoImg = document.getElementById('footer-logo-img')

// Pages with a dark hero (index.html) start without the 'scrolled' class.
// All other pages start with it. We detect this once on load.
const isHeroPage = nav && !nav.classList.contains('scrolled')

// Set logos immediately (avoids flash of empty src)
if (footerLogoImg) footerLogoImg.src = SITE_CONFIG.logoUrl
if (navLogoImg) navLogoImg.src = isHeroPage ? SITE_CONFIG.logoDarkUrl : SITE_CONFIG.logoUrl

if (nav) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 50
    nav.classList.toggle('scrolled', scrolled)
    // On the hero page swap nav logo between dark and light versions
    if (navLogoImg && isHeroPage) {
      navLogoImg.src = scrolled ? SITE_CONFIG.logoUrl : SITE_CONFIG.logoDarkUrl
    }
  }, { passive: true })
}

// ── Mobile drawer ────────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger-btn')
const drawer    = document.getElementById('mobile-drawer')
const drawerClose = document.getElementById('drawer-close')

function openDrawer() {
  drawer.classList.add('open')
  document.body.style.overflow = 'hidden'
}
function closeDrawer() {
  drawer.classList.remove('open')
  document.body.style.overflow = ''
}

if (hamburger) hamburger.addEventListener('click', openDrawer)
if (drawerClose) drawerClose.addEventListener('click', closeDrawer)

// ── Scroll reveal (IntersectionObserver) ────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el))

// ── Booking Modal ────────────────────────────────────────────────────────────
const modal = document.getElementById('booking-modal')

function openModal() {
  if (!modal) return
  modal.classList.add('open')
  document.body.style.overflow = 'hidden'
  resetBookingForm()
}

function closeModal() {
  if (!modal) return
  modal.classList.remove('open')
  document.body.style.overflow = ''
}

document.querySelectorAll('[data-open-modal]').forEach(btn =>
  btn.addEventListener('click', openModal)
)

const modalBackdrop = modal?.querySelector('.modal-backdrop')
if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal)
const modalCloseBtn = document.getElementById('modal-close')
if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal)

window.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal() })

// ── Shared WhatsApp form logic ───────────────────────────────────────────────
// Works for both the modal form AND the inline contact-page form.

const SESSION_LABELS = {
  'pre-event':   'בוק שלפני האירוע',
  'proposals':   'הצעת נישואין',
  'bar-mitzvah': 'בר / בת מצווה',
  'portrait':    'פורטרט אישי',
}

function buildWhatsAppMessage(data) {
  const typeLabel = SESSION_LABELS[data.sessionType] || data.sessionType
  return (
    'שלום! 👋\n\n' +
    'אשמח לקבוע סשן צילום:\n\n' +
    `📌 *סוג סשן:* ${typeLabel}\n` +
    `👤 *שם:* ${data.name}\n` +
    `📱 *טלפון:* ${data.phone}\n` +
    `📅 *תאריך מועדף:* ${data.date || 'גמיש'}\n` +
    (data.message ? `💬 *פרטים נוספים:* ${data.message}\n` : '') +
    '\nתודה! 😊'
  )
}

function initMultiStepForm(containerId) {
  const container = document.getElementById(containerId)
  if (!container) return

  let selectedSession = ''

  const stepDots   = container.querySelectorAll('.step-dot')
  const step1      = container.querySelector('#' + containerId + '-step1')
  const step2      = container.querySelector('#' + containerId + '-step2')
  const successDiv = container.querySelector('#' + containerId + '-success')

  function showStep(n) {
    ;[step1, step2, successDiv].forEach(el => el && el.classList.remove('active'))
    stepDots.forEach((dot, i) => dot.classList.toggle('active', i < n))

    if (n === 1 && step1) step1.classList.add('active')
    if (n === 2 && step2) step2.classList.add('active')
    if (n === 3 && successDiv) {
      stepDots.forEach(d => d.classList.add('active'))
      successDiv.style.display = 'flex'
      step1.classList.remove('active')
      step2.classList.remove('active')
    }
  }

  // Session type buttons (step 1)
  container.querySelectorAll('.session-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedSession = btn.dataset.session
      showStep(2)
    })
  })

  // Back button (step 2 → 1)
  const backBtn = container.querySelector('.btn-back')
  if (backBtn) backBtn.addEventListener('click', () => showStep(1))

  // Submit (step 2 → WhatsApp)
  const form = container.querySelector('form')
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault()
      const fd = new FormData(form)
      const msg = buildWhatsAppMessage({
        sessionType: selectedSession,
        name:    fd.get('name')    || '',
        phone:   fd.get('phone')   || '',
        date:    fd.get('date')    || '',
        message: fd.get('message') || '',
      })
      window.open(
        `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`,
        '_blank'
      )
      showStep(3)
    })
  }

  // Reset button inside success
  const resetBtn = container.querySelector('.btn-reset')
  if (resetBtn) resetBtn.addEventListener('click', () => {
    if (form) form.reset()
    selectedSession = ''
    if (successDiv) successDiv.style.display = 'none'
    showStep(1)
  })

  // Init: show step 1
  showStep(1)

  return { reset() {
    if (form) form.reset()
    selectedSession = ''
    if (successDiv) successDiv.style.display = 'none'
    showStep(1)
  }}
}

// Init modal form
const modalFormCtrl = initMultiStepForm('modal-form')

function resetBookingForm() { modalFormCtrl && modalFormCtrl.reset() }

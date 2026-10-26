/* main.js — shared across all pages. Requires gallery-data.js first. */
document.documentElement.classList.add("js");

// ── Config-driven links ────────────────────────────────────────────────────
document
  .querySelectorAll("[data-ig]")
  .forEach((a) => (a.href = SITE_CONFIG.instagramUrl));
document
  .querySelectorAll("[data-wa]")
  .forEach((a) => (a.href = "https://wa.me/" + SITE_CONFIG.whatsappNumber));
document
  .querySelectorAll("[data-year]")
  .forEach((el) => (el.textContent = new Date().getFullYear()));

// ── Hero video loop ────────────────────────────────────────────────────────
// Two copies of the same clip: shortly before one ends, the other restarts from
// the beginning and they crossfade, so the loop has no visible jump.
// If the video can't play, the poster photo underneath stays visible.
(function heroLoop() {
  const vids = [...document.querySelectorAll("[data-hero-video]")];
  if (
    vids.length < 2 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  const XFADE = 1.2; // seconds
  document.documentElement.style.setProperty("--xfade", XFADE + "s");
  let cur = 0,
    switching = false;

  function start(v) {
    v.currentTime = 0;
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  }
  function tick() {
    const a = vids[cur];
    if (
      a.duration &&
      !switching &&
      a.currentTime >= a.duration - XFADE - 0.05
    ) {
      switching = true;
      const b = vids[1 - cur];
      start(b);
      b.classList.add("is-on");
      a.classList.remove("is-on");
      setTimeout(
        () => {
          a.pause();
          cur = 1 - cur;
          switching = false;
        },
        XFADE * 1000 + 50,
      );
    }
    requestAnimationFrame(tick);
  }
  vids[0].addEventListener(
    "playing",
    () => {
      vids[0].classList.add("is-on");
      requestAnimationFrame(tick);
    },
    { once: true },
  );
  start(vids[0]);
  // Pause when the tab is hidden to save battery
  document.addEventListener("visibilitychange", () => {
    const v = vids[cur];
    document.hidden ? v.pause() : v.play().catch(() => {});
  });
})();

// ── Nav: solid on scroll (home page overlay only) ─────────────────────────
const nav = document.querySelector(".site-nav--overlay");
const heroLogo = document.getElementById("hero-logo");
const fly = document.getElementById("logo-fly");
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (nav && heroLogo && fly && !reduceMotion) {
  // Home page: the big hero logo flies into the nav slot as you scroll.
  const flyLight = fly.querySelector(".logo-fly__light");
  const navLogo = nav.querySelector(".nav-logo img.logo-light");
  let start, end, distance;

  function measure() {
    const y = window.scrollY;
    const s = heroLogo.getBoundingClientRect();
    start = { x: s.left, y: s.top + y, w: s.width }; // document coords at scroll 0
    const wasSolid = nav.classList.contains("is-solid");
    nav.classList.add("is-solid"); // measure the nav's final (solid) state
    navLogo.style.display = "block";
    const e = navLogo.getBoundingClientRect();
    navLogo.style.display = "";
    if (!wasSolid) nav.classList.remove("is-solid");
    end = { x: e.left, y: e.top, w: e.width };
    fly.style.width = start.w + "px";
    distance = Math.max(120, start.y - end.y); // scroll length of the flight
    update();
  }

  function update() {
    const p = Math.min(1, Math.max(0, window.scrollY / distance));
    const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    const x = start.x + (end.x - start.x) * ease;
    const y = start.y + (end.y - start.y) * ease;
    const scale = 1 + (end.w / start.w - 1) * ease;
    fly.style.transform =
      "translate(" + x + "px," + y + "px) scale(" + scale + ")";
    const solid = p > 0.82;
    nav.classList.toggle("is-solid", solid);
    flyLight.style.opacity = Math.min(1, Math.max(0, (p - 0.7) / 0.25));
    document.body.classList.toggle("logo-fly-done", p >= 1);
  }

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
      }
    },
    { passive: true },
  );
  let rt;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(measure, 150);
  });

  document.body.classList.add("has-logo-fly");
  if (heroLogo.complete && heroLogo.naturalWidth) measure();
  else heroLogo.addEventListener("load", measure, { once: true });
  if (document.fonts) document.fonts.ready.then(measure);
} else if (nav) {
  const onScroll = () => nav.classList.toggle("is-solid", window.scrollY > 60);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// ── Mobile drawer ──────────────────────────────────────────────────────────
const drawer = document.getElementById("drawer");
function setDrawer(open) {
  if (!drawer) return;
  drawer.classList.toggle("is-open", open);
  drawer.setAttribute("aria-hidden", String(!open));
  document.body.style.overflow = open ? "hidden" : "";
}
document
  .querySelectorAll("[data-drawer-open]")
  .forEach((b) => b.addEventListener("click", () => setDrawer(true)));
document
  .querySelectorAll("[data-drawer-close], #drawer a")
  .forEach((b) => b.addEventListener("click", () => setDrawer(false)));

// ── Scroll reveal ──────────────────────────────────────────────────────────
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ── Booking form (modal + contact page share this) ─────────────────────────
const SESSION_LABELS = Object.fromEntries(
  SESSION_TYPES.map((s) => [s.id, s.label]),
);

function buildWhatsAppMessage(d) {
  return (
    "שלום אבישג!\nאשמח לתאם צילום.\n\n" +
    "סוג צילום: " +
    (SESSION_LABELS[d.session] || "") +
    "\n" +
    "שם: " +
    d.name +
    "\n" +
    "טלפון: " +
    d.phone +
    "\n" +
    "תאריך מועדף: " +
    (d.date || "גמיש") +
    (d.message ? "\nפרטים נוספים: " + d.message : "")
  );
}

function initBookingForm(root) {
  const dots = root.querySelectorAll(".steps span");
  const step1 = root.querySelector('[data-step="1"]');
  const step2 = root.querySelector('[data-step="2"]');
  const done = root.querySelector('[data-step="done"]');
  const picked = root.querySelector(".form-picked");
  const form = root.querySelector("form");
  let session = "";

  function show(n) {
    [step1, step2, done].forEach((el) => el.classList.remove("is-active"));
    dots.forEach((d, i) => d.classList.toggle("is-on", n === "done" || i < n));
    ({ 1: step1, 2: step2, done })[n].classList.add("is-active");
  }
  function pick(id) {
    session = id;
    picked.textContent = SESSION_LABELS[id] || "";
    show(2);
  }

  root
    .querySelectorAll(".session")
    .forEach((b) => b.addEventListener("click", () => pick(b.dataset.session)));
  root.querySelector(".form-back").addEventListener("click", () => show(1));
  root.querySelector("[data-reset]").addEventListener("click", () => {
    form.reset();
    show(1);
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const msg = buildWhatsAppMessage({
      session,
      name: fd.get("name"),
      phone: fd.get("phone"),
      date: fd.get("date"),
      message: fd.get("message"),
    });
    window.open(
      "https://wa.me/" +
        SITE_CONFIG.whatsappNumber +
        "?text=" +
        encodeURIComponent(msg),
      "_blank",
    );
    show("done");
  });
  show(1);
  return {
    reset() {
      form.reset();
      session = "";
      show(1);
    },
    pick,
  };
}

const forms = {};
document
  .querySelectorAll("[data-booking]")
  .forEach((el) => (forms[el.id] = initBookingForm(el)));

// Modal
const modal = document.getElementById("booking-modal");
function openModal(session) {
  if (!modal) return;
  const f = forms["modal-form"];
  f.reset();
  if (session) f.pick(session);
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
  setDrawer(false);
}
function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
}
document
  .querySelectorAll("[data-open-modal]")
  .forEach((b) =>
    b.addEventListener("click", () => openModal(b.dataset.session)),
  );
document
  .querySelectorAll("[data-close-modal]")
  .forEach((b) => b.addEventListener("click", closeModal));
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    setDrawer(false);
    closeLightbox();
  }
});

// ── Portfolio gallery ──────────────────────────────────────────────────────
const grid = document.getElementById("gallery-grid");
const chips = document.getElementById("gallery-filters");
const lightbox = document.getElementById("lightbox");
let lbList = [],
  lbIndex = 0;
function closeLightbox() {
  if (lightbox) {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }
}
function showLightbox(i) {
  if (!lightbox || !lbList.length) return;
  lbIndex = (i + lbList.length) % lbList.length;
  const img = lightbox.querySelector("img");
  img.src = lbList[lbIndex].src;
  img.alt = lbList[lbIndex].alt;
  lightbox.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

if (grid && chips) {
  const label = (id) =>
    (GALLERY_CATEGORIES.find((c) => c.id === id) || {}).label || "";
  let active = new URLSearchParams(location.search).get("cat") || "all";

  function render() {
    chips.querySelectorAll(".chip").forEach((c) => {
      const on = c.dataset.cat === active;
      c.classList.toggle("is-on", on);
      c.setAttribute("aria-selected", String(on));
    });
    const items = GALLERY_ITEMS.filter(
      (g) => active === "all" || g.category === active,
    );
    lbList = items;
    grid.innerHTML = items
      .map(
        (g, i) =>
          '<figure class="masonry__item" data-i="' +
          i +
          '" tabindex="0">' +
          '<img loading="lazy" src="' +
          g.src +
          '" alt="' +
          g.alt +
          '">' +
          "<figcaption>" +
          label(g.category) +
          "</figcaption>" +
          "</figure>",
      )
      .join("");
  }
  chips.innerHTML = GALLERY_CATEGORIES.map(
    (c) =>
      '<button class="chip" role="tab" data-cat="' +
      c.id +
      '">' +
      c.label +
      "</button>",
  ).join("");
  chips.addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    active = b.dataset.cat;
    grid.style.opacity = 0;
    setTimeout(() => {
      render();
      grid.style.opacity = 1;
    }, 180);
  });
  grid.addEventListener("click", (e) => {
    const f = e.target.closest(".masonry__item");
    if (f) showLightbox(+f.dataset.i);
  });
  grid.addEventListener("keydown", (e) => {
    const f = e.target.closest(".masonry__item");
    if (f && e.key === "Enter") showLightbox(+f.dataset.i);
  });
  lightbox &&
    lightbox.addEventListener("click", (e) => {
      const b = e.target.closest("[data-lb]");
      if (b && b.dataset.lb === "prev") return showLightbox(lbIndex - 1);
      if (b && b.dataset.lb === "next") return showLightbox(lbIndex + 1);
      if (e.target.tagName !== "IMG") closeLightbox();
    });
  window.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    if (e.key === "ArrowLeft") showLightbox(lbIndex + 1); // RTL: left = next
    if (e.key === "ArrowRight") showLightbox(lbIndex - 1);
  });
  render();
}

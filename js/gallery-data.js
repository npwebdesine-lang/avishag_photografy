// ── Site + gallery configuration ─────────────────────────────────────────────
// HOW TO ADD NEW IMAGES:
//   1. Drop the image file into assets/gallery/  (e.g. my-shot.jpg)
//   2. Add { src: 'assets/gallery/my-shot.jpg', alt: '...', category: '...' }
//   3. category must be one of the ids in GALLERY_CATEGORIES.
// ────────────────────────────────────────────────────────────────────────────

const SITE_CONFIG = {
  whatsappNumber: "972507609690", // No +, no spaces
  instagramUrl: "https://instagram.com/avishag_photographer__",
};

// Session types offered in the booking form (modal + contact page)
const SESSION_TYPES = [
  { id: "family", label: "צילומי משפחה", desc: "800 / 1200 / 1500 ₪" },
  { id: "wedding", label: "צילום סושיאל לחתונה", desc: "1200 / 1800 / 2200 ₪" },
  { id: "pre-event", label: "בוק לפני האירוע", desc: "צילום זוגי" },
  { id: "bar-mitzvah", label: "בר / בת מצווה", desc: "חגיגה משפחתית" },
];

const GALLERY_CATEGORIES = [
  { id: "all", label: "הכל" },
  { id: "family", label: "משפחה" },
  { id: "wedding", label: "סושיאל חתונות" },
  { id: "details", label: "פרטים קטנים" },
];

// Photos live in page_pics/. photo-18 is the "החבילות שלי" lettering, not a photo, so it's excluded.
const P = "page_pics/";
const GALLERY_ITEMS = [
  {
    src: P + "photo-2.jpg",
    alt: "ילדה בשמלה לבנה מול הים בשקיעה",
    category: "family",
  },
  {
    src: P + "photo-22.jpg",
    alt: "זוג מתחת להינומה, שחור-לבן",
    category: "wedding",
  },
  {
    src: P + "photo-3.jpg",
    alt: "אמא מנשקת פעוטה על החוף",
    category: "family",
  },
  { src: P + "photo-20.jpg", alt: "ענידת טבעת", category: "wedding" },
  {
    src: P + "photo-4.jpg",
    alt: "אחיות בין הסלעים והגלים",
    category: "family",
  },
  {
    src: P + "photo-7.jpg",
    alt: "שישה ילדים שוכבים על שמיכה ביער",
    category: "family",
  },
  {
    src: P + "photo-17.jpg",
    alt: "כלה מחזיקה יד של ילדה",
    category: "wedding",
  },
  { src: P + "photo-6.jpg", alt: "ילדה עם בלונים", category: "family" },
  { src: P + "photo-11.jpg", alt: "ידיים, שחור-לבן", category: "details" },
  {
    src: P + "photo-5.jpg",
    alt: "אח מחזיק את אחותו הקטנה",
    category: "family",
  },
  {
    src: P + "photo-21.jpg",
    alt: "נעלי כלה תלויות על ענף",
    category: "wedding",
  },
  {
    src: P + "photo-13.jpg",
    alt: "אמא ופעוטה הולכות על הסלעים",
    category: "family",
  },
  { src: P + "photo-14.jpg", alt: "משפחה משחקת במים", category: "family" },
  { src: P + "photo-16.jpg", alt: "טבעת אירוסין", category: "details" },
  { src: P + "photo-8.jpg", alt: "פעוטה צוחקת על הדק", category: "family" },
  {
    src: P + "photo-12.jpg",
    alt: "יד ביד על הסלעים, שחור-לבן",
    category: "family",
  },
  { src: P + "photo-19.jpg", alt: "זר ונעלי כלה", category: "wedding" },
  { src: P + "photo-10.jpg", alt: "שובבות על הגב", category: "family" },
  { src: P + "photo-9.jpg", alt: "פעוטה על הכתף", category: "family" },
  { src: P + "photo-15.jpg", alt: "אחים במים", category: "family" },
  { src: P + "photo-1.jpg", alt: "סלעים וגלים", category: "details" },
];

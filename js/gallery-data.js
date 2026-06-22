// ── Gallery Configuration ────────────────────────────────────────────────────
// HOW TO ADD NEW IMAGES:
//   1. Drop the image file into assets/gallery/  (e.g. my-shot.jpg)
//   2. Set  src: 'assets/gallery/my-shot.jpg'
//   3. Fill in alt text and pick a category id.
// No other file needs to change.
// ────────────────────────────────────────────────────────────────────────────

const SITE_CONFIG = {
  whatsappNumber: "972507609690", // No +, no spaces  (e.g. '972521234567')
  instagramUrl: "https://instagram.com/avishag_photographer__",
  logoUrl: "page_pics/regular_logo.png", // light backgrounds (nav scrolled, footer)
  logoDarkUrl: "page_pics/logo_for_dark_background.png", // dark/hero background (nav transparent)
};

const GALLERY_CATEGORIES = [
  { id: "all", label: "הכל" },
  { id: "pre-event", label: "בוקים שלפני אירוע" },
  { id: "proposals", label: "הצעות נישואין" },
  { id: "bar-mitzvah", label: "בר מצווה" },
];

const GALLERY_ITEMS = [
  {
    id: 1,
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQIKfpilHkaNAAfxpvlLKbSwzmKYeNUCSvxERSqMl59h-F6NoniYjsN415lNwBMz8hBC8QXFEko0D5cR20Vcca7ycQVMe_7WdrxTHS1ZB8fdncuH39V17gj_ia9ws_r4gc-CKhJhjEWhgVjfTQ5RYlmlE4lAlHoVdNl5XdDsvaUHqrpd5p4b8Ewo82YdgZBaw_OIFSBVj53iFnBChlizsRrVzGeczg-KPvFt7wWsRsOYnX0YNMkyXbY8EWf5hzCrqdDPjndd1x15o",
    alt: "צילום זוגי לפני האירוע",
    category: "pre-event",
  },
  {
    id: 2,
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCi_HWum1gEuIgF1yT39rRYfhk9T4ZuKJNFlatPPekY0IMICzyX4YVMDxdthq23au-Ijo7yYtSFjvT-PVEP9Xgz9MkxiNeeVxdHwnOcaxXoCWzCJT_Ac03EtvFvYYaXWK6XeZI_SoPu6bkJmI9M9EHT_lamoa9klX_Q9wYrcHL6aMsKIZODFDtsnGJjYOplXJ8NKFHd8GVMjp1nuDRcVftN5kHeS_cNL67PORYDFZZ1ePkUD2YH3NKHc7Gg7BfiHCTtxLB_3yyBtas",
    alt: "הצעת נישואין בשקיעה על החוף",
    category: "proposals",
  },
  {
    id: 3,
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB79x6UKIxHSnSw_FWX9JCxHBTCiEQTNZXKjzwHpiXuz3KWuvFi8AhhFHSLiU5ZwoeBOX0yR1oJe9ZauHSEMxQQG1L9QZSM0r_BWeVIsO-YMzLN_r5GUFuY0mwMJg8028kf9mmdMkE9eYlmGJfExfBM4W9iEZwLzJc-uuvoHmRXlDjDEZSspPyHFZJ91Oravg1AjV8naCpf0NlP2zWE_hXw6wG90be-_SPNx-pGd0A8I9PxSSOIP-0sgRfYakEsoYHsbzI83l_CK8o",
    alt: "בר מצווה - רגע קדוש",
    category: "bar-mitzvah",
  },
  {
    id: 4,
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPFWiDpVxadZsVi_8i2lLZEeq2Wp00j0qxc4fKmFNHS9DLJClPM7Xkk1AK4SlSC4NQV_Lr5Ur4d7HcCpTndVLzRD2w81X5o-3oK-7sd2o94uvsCvubiaEPGyTzvDQGfTn8kTrY3dT0R1fkoIkV0xVV6zlOd5fMUUzRArWRAoZG6W2OBqHcFl-8FFghBN5dWeIJhnos28WyOzFqoIvvt-pfJK1Otut_Rj3V3xRIm4hDz-qg8LXt0g1rVRh8q9duig5OLd3FBXvWJCA",
    alt: "צילום כלה מינימליסטי",
    category: "pre-event",
  },
  {
    id: 5,
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCA3_KGQoDrSlxKuSJ7zNu6W2ZDNsT_Vs0RssQLPiJP3QGxqooNhJ7MYJTChLHwylzKJOzlz9kop9uoY3bVTu1WzTNKnfyyq03MNvPa8b6TER9ps2Q1nGvuavxcQNqPJVX-nQA77_Rj2bOgIMosixWbrFFz_3m5dOrDk7FuPzkI9S4-P61qFqMNgGjZiiCr22BtZXNFFgerm_wF4D80SfZtSBbL1OejgvwTvjxgh1ZIby5hT_yGl0-JbNbDgXZmR7jjBOQehJovRd0",
    alt: "חגיגת בר מצווה משפחתית",
    category: "bar-mitzvah",
  },
];

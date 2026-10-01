// ============ TYPEWRITER ============
const lines = ["Software Developer \u2022 Java & JavaScript Specialist", "Membangun Web & Desktop Apps yang Cepat & Elegan"];
let li = 0, ci = 0, del = false;
const el = document.getElementById("typed");
(function type() {
  const cur = lines[li];
  if (!del) {
    el.textContent = cur.slice(0, ci + 1); ci++;
    if (ci === cur.length) { del = true; setTimeout(type, 1800); return; }
  } else {
    el.textContent = cur.slice(0, ci - 1); ci--;
    if (ci === 0) { del = false; li = (li + 1) % lines.length; }
  }
  setTimeout(type, del ? 32 : 48);
})();

// ============ REVEAL ON SCROLL ============
const obs = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) e.target.classList.add("in");
}), { threshold: .1 });
document.querySelectorAll(".reveal").forEach(e => obs.observe(e));
requestAnimationFrame(() => document.querySelectorAll(".reveal").forEach(e => e.classList.add("in")));

// ============ PARTICLES BACKGROUND ============
const c = document.getElementById("particles"), x = c.getContext("2d");
function rs() { c.width = innerWidth; c.height = innerHeight; }
rs(); addEventListener("resize", rs);
const pts = [...Array(45)].map(() => ({
  x: Math.random() * innerWidth, y: Math.random() * innerHeight,
  r: Math.random() * 1.6 + .3, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4
}));
(function anim() {
  x.clearRect(0, 0, c.width, c.height);
  pts.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > c.width) p.vx *= -1;
    if (p.y < 0 || p.y > c.height) p.vy *= -1;
    x.beginPath(); x.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    x.fillStyle = "rgba(165,180,255,.55)"; x.fill();
  });
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
    const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.hypot(dx, dy);
    if (d < 140) {
      x.strokeStyle = "rgba(108,92,255," + (.14 * (1 - d / 140)) + ")";
      x.lineWidth = .6; x.beginPath();
      x.moveTo(pts[i].x, pts[i].y); x.lineTo(pts[j].x, pts[j].y); x.stroke();
    }
  }
  requestAnimationFrame(anim);
})();

// ============ NAV ACTIVE STATE ============
const secs = ["beranda", "tentang", "skills", "proyek", "kontak"];
addEventListener("scroll", () => {
  let cur = "beranda";
  secs.forEach(id => {
    const s = document.getElementById(id);
    if (s && scrollY >= s.offsetTop - 140) cur = id;
  });
  document.querySelectorAll(".nav-links a").forEach(a =>
    a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
}, { passive: true });

// ============ CONTACT FORM -> MAILTO ============
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const nama = document.getElementById("nama").value.trim(),
        email = document.getElementById("email").value.trim(),
        pesan = document.getElementById("pesan").value.trim(),
        msg = document.getElementById("form-msg");
  if (!nama || !email || !pesan) {
    msg.textContent = "\u26A0\uFE0F Lengkapi semua field dulu ya.";
    msg.className = "form-msg err"; return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.textContent = "\u26A0\uFE0F Format email tidak valid.";
    msg.className = "form-msg err"; return;
  }
  window.location.href = "mailto:natalino.stefanus@email.com?subject=" +
    encodeURIComponent("Pesan dari " + nama + " via Portfolio") +
    "&body=" + encodeURIComponent("Nama: " + nama + "\nEmail: " + email + "\n\nPesan:\n" + pesan);
  msg.textContent = "\u2705 Membuka aplikasi email kamu...";
  msg.className = "form-msg ok"; this.reset();
});

// ============ GALLERY LIGHTBOX ============
const lb = document.getElementById("lightbox"),
      lbImg = document.getElementById("lightbox-img");
document.querySelectorAll(".g-item img").forEach(img => {
  img.addEventListener("click", () => { lbImg.src = img.src; lb.classList.add("open"); });
});
lb.addEventListener("click", e => {
  if (e.target === lb || e.target.classList.contains("close-lb")) lb.classList.remove("open");
});
addEventListener("keydown", e => { if (e.key === "Escape") lb.classList.remove("open"); });

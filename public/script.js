// Let the CSS know JavaScript is running (used by the scroll-reveal effect)
document.documentElement.classList.add("js");

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Signature: redraw it the way Cale actually signed ----------
// /brand/signature-animated.svg holds the strokes in the order they were written.
const signatureLockup = document.getElementById("signature");
let signatureSVG = null;

function playSignature() {
  if (!signatureLockup || !signatureSVG) return;
  const live = signatureLockup.querySelector(".signature-live") || document.createElement("div");
  live.className = "signature-live";
  live.setAttribute("aria-hidden", "true");
  live.innerHTML = signatureSVG;            // a fresh copy restarts the animation
  if (!live.parentNode) signatureLockup.appendChild(live);
}

if (signatureLockup && document.documentElement.classList.contains("sig-anim")) {
  fetch("/brand/signature-animated.svg")
    .then((r) => (r.ok ? r.text() : Promise.reject()))
    .then((svg) => {
      signatureSVG = svg;
      signatureLockup.querySelector(".hero-signature").style.display = "none";
      playSignature();
    })
    .catch(() => document.documentElement.classList.remove("sig-anim"));
}

document.addEventListener("visibilitychange", () => {
  if (!document.hidden && window.scrollY < 80) playSignature();
});

// ---------- Header turns solid after you scroll past the top ----------
const header = document.getElementById("site-header");

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 40);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// ---------- Fade sections in as they scroll into view ----------
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// ---------- Highlight the nav link for the section you're reading ----------
const navLinks = document.querySelectorAll("nav a[href^='#']");
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) =>
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((section) => navObserver.observe(section));
}

// ---------- Count the result numbers up when they scroll into view ----------
const counters = document.querySelectorAll(".count[data-to]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function runCounter(el) {
  const target = Number(el.dataset.to);
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased);
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

if (!reduceMotion && "IntersectionObserver" in window) {
  counters.forEach((el) => (el.textContent = "0"));
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        countObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => countObserver.observe(el));
}

// ---------- Contact form ----------
// Sends through Formspree once data-endpoint is set on the form.
// Until then, it opens a pre-filled email so messages still reach you.
const form = document.getElementById("contact-form");

if (form) {
  const status = form.querySelector(".form-status");
  const button = form.querySelector("button[type='submit']");

  function setStatus(message, type) {
    status.textContent = message;
    status.className = "form-status" + (type ? " is-" + type : "");
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // simple validation
    let firstInvalid = null;
    form.querySelectorAll("[required]").forEach((field) => {
      const ok = field.checkValidity() && field.value.trim() !== "";
      field.setAttribute("aria-invalid", ok ? "false" : "true");
      if (!ok && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      setStatus("Please fill in your name, a valid email, and a message.", "error");
      firstInvalid.focus();
      return;
    }

    const data = new FormData(form);
    if (data.get("_gotcha")) return; // spam bot

    const endpoint = form.dataset.endpoint;

    if (!endpoint) {
      const subject = encodeURIComponent("Website message from " + data.get("name"));
      const body = encodeURIComponent(data.get("message") + "\n\n— " + data.get("name") + " (" + data.get("email") + ")");
      window.location.href = "mailto:hello@calebloskas.com?subject=" + subject + "&body=" + body;
      setStatus("Your email app should open with your message ready to send.", "success");
      return;
    }

    button.disabled = true;
    setStatus("Sending…");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      setStatus("Thanks! Your message is on its way. I’ll get back to you soon.", "success");
    } catch (error) {
      setStatus("Something went wrong. Please email hello@calebloskas.com instead.", "error");
    } finally {
      button.disabled = false;
    }
  });
}

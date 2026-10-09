// Let the CSS know JavaScript is running (used by the scroll-reveal effect)
document.documentElement.classList.add("js");

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Signature replay when you come back to the tab ----------
const signatureLockup = document.querySelector(".signature-lockup");

function replaySignature() {
  if (!signatureLockup) return;
  const reveal = signatureLockup.querySelector(".signature-reveal");
  const pen = signatureLockup.querySelector(".signature-pen");
  [reveal, pen].forEach((element) => {
    if (!element) return;
    element.style.animation = "none";
    void element.offsetWidth;
    element.style.animation = "";
  });
}

document.addEventListener("visibilitychange", () => {
  if (!document.hidden && window.scrollY < 80) replaySignature();
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

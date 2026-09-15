const root = document.documentElement;
const themeBtn = document.querySelector("[data-theme-toggle]");
const rtlBtn = document.querySelector("[data-rtl-toggle]");
const menuBtn = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector(".mobile-menu");

const savedTheme = localStorage.getItem("vitacheck-theme");
if (savedTheme) {
  root.dataset.theme = savedTheme;
} else if (matchMedia("(prefers-color-scheme: dark)").matches) {
  root.dataset.theme = "dark";
}

function refreshIcons() {
  if (themeBtn) {
    themeBtn.innerHTML =
      root.dataset.theme === "dark"
        ? '<i class="bi bi-sun"></i>'
        : '<i class="bi bi-moon-stars"></i>';
  }
  if (rtlBtn) {
    rtlBtn.textContent = root.dir === "rtl" ? "LTR" : "RTL";
  }
}
refreshIcons();

themeBtn?.addEventListener("click", () => {
  root.classList.add("vc-toggle-switching");
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("vitacheck-theme", root.dataset.theme);
  refreshIcons();
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("vc-toggle-switching")));
});

rtlBtn?.addEventListener("click", () => {
  root.classList.add("vc-toggle-switching");
  root.dir = root.dir === "rtl" ? "ltr" : "rtl";
  localStorage.setItem("vitacheck-dir", root.dir);
  refreshIcons();
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("vc-toggle-switching")));
});

const savedDir = localStorage.getItem("vitacheck-dir");
if (savedDir) {
  root.dir = savedDir;
  refreshIcons();
}

menuBtn?.addEventListener("click", () => {
  const open = mobileMenu.style.display === "grid";
  mobileMenu.style.display = open ? "none" : "grid";
  menuBtn.setAttribute("aria-expanded", String(!open));
  if (menuBtn) {
    menuBtn.innerHTML = open
      ? '<i class="bi bi-list"></i>'
      : '<i class="bi bi-x-lg"></i>';
  }
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.style.display = "none";
    menuBtn?.setAttribute("aria-expanded", "false");
    if (menuBtn) menuBtn.innerHTML = '<i class="bi bi-list"></i>';
  });
});

const reveal = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));

document.querySelectorAll("[data-filter]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll("[data-filter]")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const value = btn.dataset.filter;
    document.querySelectorAll("[data-category]").forEach((card) => {
      card.style.display =
        value === "all" || card.dataset.category === value ? "" : "none";
    });
  });
});

document.querySelectorAll("[data-form]").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll("[required]").forEach((input) => {
      const err = input.closest(".field")?.querySelector(".error");
      if (!input.value.trim()) {
        ok = false;
        if (err) err.textContent = "Please complete this field.";
      } else if (err) {
        err.textContent = "";
      }
    });
    if (ok) {
      const msg = form.querySelector("[data-form-message]");
      if (msg)
        msg.textContent =
          "Thanks — this demo form passed client-side validation.";
    }
  });
});

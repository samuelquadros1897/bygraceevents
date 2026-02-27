document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Sticky year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  // Mobile navigation toggle
  const navToggle = document.querySelector<HTMLButtonElement>(".navbar__toggle");
  const nav = document.querySelector<HTMLElement>(".navbar__nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("is-open");
    });

    // Close nav when clicking a link (useful on mobile)
    nav.addEventListener("click", (event) => {
      const target = event.target as HTMLElement | null;
      if (target && target.tagName === "A" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
      }
    });
  }

  // FAQ accordion
  const faqItems = document.querySelectorAll<HTMLElement>(".faq-item");
  faqItems.forEach((item) => {
    const questionButton = item.querySelector<HTMLButtonElement>(".faq-item__question");
    if (!questionButton) return;

    questionButton.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // Close all items first for accordion behavior
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("is-open");
          const btn = other.querySelector<HTMLButtonElement>(".faq-item__question");
          if (btn) btn.setAttribute("aria-expanded", "false");
        }
      });

      item.classList.toggle("is-open", !isOpen);
      questionButton.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  // Gallery filters
  const filterButtons = document.querySelectorAll<HTMLButtonElement>(".filter-btn");
  const galleryItems = document.querySelectorAll<HTMLElement>(".gallery-item");

  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter || "all";

        filterButtons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        galleryItems.forEach((item) => {
          const category = item.dataset.category || "";
          const show = filter === "all" || category === filter;
          item.style.display = show ? "" : "none";
        });
      });
    });
  }

  // Smooth scroll for same-page anchor links
  body.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    const anchor = target.closest<HTMLAnchorElement>("a[href^='#']");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    const element = document.querySelector<HTMLElement>(href);
    if (!element) return;

    event.preventDefault();
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Contact form basic UX
  const contactForm = document.getElementById("contact-form") as HTMLFormElement | null;
  const formMessage = document.getElementById("form-message");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const requiredFields = Array.from(
        contactForm.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
          "[required]"
        )
      );

      let isValid = true;
      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add("has-error");
        } else {
          field.classList.remove("has-error");
        }
      });

      const emailInput = contactForm.querySelector<HTMLInputElement>('input[type="email"]');
      if (emailInput && emailInput.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
          isValid = false;
          emailInput.classList.add("has-error");
        }
      }

      if (!isValid) {
        formMessage.textContent = "Please fill in all required fields correctly.";
        formMessage.style.color = "#b02a37";
        return;
      }

      formMessage.textContent =
        "Thank you for your inquiry. Our team will get back to you within 2 business days.";
      formMessage.style.color = "#2e7d32";
      contactForm.reset();
    });
  }
});


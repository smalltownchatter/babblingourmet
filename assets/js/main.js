(function () {
  document.documentElement.classList.add("js");

  /* Mobile menu ----------------------------------------------------------- */
  var navToggle = document.querySelector(".nav-toggle");
  function closeNav() {
    document.body.classList.remove("nav-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* Experiences sub-menu -------------------------------------------------- */
  document.querySelectorAll(".has-sub").forEach(function (item) {
    var btn = item.querySelector(".sub-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    item.addEventListener("focusout", function (e) {
      if (window.matchMedia("(min-width: 961px)").matches && !item.contains(e.relatedTarget)) {
        item.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    document.querySelectorAll(".has-sub.is-open").forEach(function (item) {
      item.classList.remove("is-open");
      var btn = item.querySelector(".sub-toggle");
      btn.setAttribute("aria-expanded", "false");
      btn.focus();
    });
    if (document.body.classList.contains("nav-open")) { closeNav(); navToggle.focus(); }
  });
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".has-sub.is-open").forEach(function (item) {
      if (!item.contains(e.target) && window.matchMedia("(min-width: 961px)").matches) {
        item.classList.remove("is-open");
        item.querySelector(".sub-toggle").setAttribute("aria-expanded", "false");
      }
    });
  });
  // Close the mobile menu when following an on-page link
  document.querySelectorAll(".nav a[href*='#']").forEach(function (a) {
    a.addEventListener("click", closeNav);
  });

  /* Fade sections in ------------------------------------------------------ */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Enquiry form ---------------------------------------------------------- */
  // Pre-select the experience from links such as contact.html?experience=farmhouse
  var preset = new URLSearchParams(window.location.search).get("experience");
  var experiences = {
    "private-chef": "Private Chef Experience",
    "farmhouse": "Farmhouse Dining and Celebrations",
    "event-catering": "Event Catering"
  };

  var messages = {
    name: "Please tell us your name.",
    email: "Please enter your email address so Andi can reply.",
    emailFormat: "That email address doesn’t look quite right. Please check it.",
    message: "Please tell us a little about your gathering."
  };

  function setError(field, text) {
    var input = field.querySelector("input, select, textarea");
    var error = field.querySelector(".error");
    if (text) {
      input.setAttribute("aria-invalid", "true");
      if (error) error.textContent = text;
    } else {
      input.removeAttribute("aria-invalid");
      if (error) error.textContent = "";
    }
  }

  function check(input) {
    var field = input.closest(".field");
    if (!field) return true;
    var value = input.value.trim();
    var text = "";
    if (input.required && !value) text = messages[input.name] || "Please fill in this field.";
    else if (input.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) text = messages.emailFormat;
    setError(field, text);
    return !text;
  }

  document.querySelectorAll("form.enquiry").forEach(function (form) {
    var select = form.querySelector("select[name='experience']");
    if (select && preset && experiences[preset]) select.value = experiences[preset];

    form.querySelectorAll("[required], input[type='email']").forEach(function (input) {
      input.addEventListener("blur", function () { if (input.value) check(input); });
      input.addEventListener("input", function () {
        if (input.getAttribute("aria-invalid") === "true") check(input);
      });
    });

    form.addEventListener("submit", function (event) {
      var firstBad = null;
      form.querySelectorAll("[required], input[type='email']").forEach(function (input) {
        if (!check(input) && !firstBad) firstBad = input;
      });
      var status = form.querySelector(".form__status");
      if (firstBad) {
        event.preventDefault();
        if (status) status.textContent = "Please check the highlighted fields.";
        firstBad.focus();
        return;
      }
      if (status) status.textContent = "";
    });
  });

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();

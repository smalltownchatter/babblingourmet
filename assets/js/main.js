(function () {
  document.documentElement.classList.add("js");

  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Fade sections in as they scroll into view
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Enquiry form
  // Pre-select the experience when arriving from a page's "Enquire" button,
  // e.g. contact.html?experience=farmhouse
  var params = new URLSearchParams(window.location.search);
  var preset = params.get("experience");
  var map = {
    "private-chef": "Private Chef Experience",
    "farmhouse": "Farmhouse Dining and Celebrations",
    "event-catering": "Event Catering"
  };

  document.querySelectorAll("form.enquiry").forEach(function (form) {
    var select = form.querySelector("select[name='experience']");
    if (select && preset && map[preset]) select.value = map[preset];

    // Until a form service is connected (see README), the form opens the
    // visitor's email app with their enquiry filled in, addressed to Andi.
    form.addEventListener("submit", function (event) {
      if (form.getAttribute("action")) return; // a real form service handles it
      event.preventDefault();
      if (!form.reportValidity()) return;

      var data = new FormData(form);
      var lines = [
        ["Name", data.get("name")],
        ["Email", data.get("email")],
        ["Phone", data.get("phone")],
        ["Experience", data.get("experience")],
        ["Preferred date or dates", data.get("dates")],
        ["Approximate number of guests", data.get("guests")],
        ["Location or venue", data.get("location")]
      ].filter(function (row) { return row[1]; })
        .map(function (row) { return row[0] + ": " + row[1]; });

      var body = lines.join("\n") + "\n\n" + (data.get("message") || "");
      var subject = "Enquiry: " + (data.get("experience") || "A gathering") +
        (data.get("name") ? " (" + data.get("name") + ")" : "");

      window.location.href = "mailto:andi@thebabblinggourmet.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      var status = form.querySelector(".form__status");
      if (status) {
        status.textContent = "Your email app should open with your enquiry ready to send. " +
          "If it doesn't, please email andi@thebabblinggourmet.com or call 613-561-5722.";
      }
    });
  });

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();

/* ===================================================================
   ABU BAKAR — PORTFOLIO SHARED SCRIPT
=================================================================== */
(function(){
  "use strict";

  /* ---------- mobile nav toggle ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav){
    toggle.addEventListener("click", function(){
      var open = nav.classList.toggle("open");
      toggle.textContent = open ? "✕" : "☰";
    });
    nav.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        nav.classList.remove("open");
        toggle.textContent = "☰";
      });
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.12, rootMargin:"0px 0px -40px 0px"});
    revealEls.forEach(function(el){ io.observe(el); });
  }

  /* ---------- stagger reveal delay for grids ---------- */
  document.querySelectorAll("[data-reveal-group]").forEach(function(group){
    var items = group.querySelectorAll(".reveal");
    items.forEach(function(el, i){ el.style.transitionDelay = (i * 70) + "ms"; });
  });

  /* ---------- toast helper ---------- */
  function toast(msg, ms){
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function(){ t.classList.remove("show"); }, ms || 2600);
  }
  window.__toast = toast;

  /* ---------- contact form (mailto, no backend needed) ---------- */
  var form = document.getElementById("contactForm");
  if (form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var name = form.querySelector("#cf-name").value.trim();
      var email = form.querySelector("#cf-email").value.trim();
      var budget = form.querySelector("#cf-budget") ? form.querySelector("#cf-budget").value : "";
      var message = form.querySelector("#cf-message").value.trim();

      if (!name || !email || !message){
        toast("Please fill in your name, email, and message.");
        return;
      }

      // TODO: Replace YOUR_EMAIL@example.com with your real inbox.
      // For a no-reload, fully automatic form (no email-app popup), wire this
      // form up to a free service like Formspree or Web3Forms instead.
      var to = "YOUR_EMAIL@example.com";
      var subject = "New project enquiry from " + name;
      var bodyLines = [
        "Name: " + name,
        "Email: " + email,
        budget ? ("Budget: " + budget) : null,
        "",
        message
      ].filter(Boolean).join("\n");

      var mailto = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(bodyLines);
      window.location.href = mailto;
      toast("Opening your email app to send this…");
    });
  }
})();

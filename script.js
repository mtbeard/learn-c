/* =========================================
   RÉFÉRENCE C — script.js
   Recherche en temps réel + navigation
   ========================================= */

(function () {
  "use strict";

  /* ── Éléments DOM ── */
  const searchBar  = document.getElementById("searchBar");
  const clearBtn   = document.getElementById("clearBtn");
  const searchCount = document.getElementById("searchCount");
  const noResults  = document.getElementById("noResults");
  const cards      = Array.from(document.querySelectorAll(".card"));
  const navLinks   = Array.from(document.querySelectorAll(".sidebar-nav a"));

  /* ── Bouton Scroll to Top ── */
  const scrollBtn = document.createElement("button");
  scrollBtn.id = "scrollTop";
  scrollBtn.title = "Retour en haut";
  scrollBtn.innerHTML = "↑";
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) scrollBtn.classList.add("visible");
    else scrollBtn.classList.remove("visible");
  }, { passive: true });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ── Active nav link (IntersectionObserver) ── */
  const sectionIds = cards.map(c => c.id).filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, { rootMargin: "-20% 0px -70% 0px" });

  cards.forEach(card => observer.observe(card));

  /* ── Recherche ── */
  // Stocker le texte original de chaque card (pour le surlignage)
  const cardData = cards.map(card => {
    return {
      el: card,
      keywords: (card.dataset.keywords || "").toLowerCase(),
      // Texte visible (sans tags HTML)
      text: card.textContent.toLowerCase(),
      id: card.id,
    };
  });

  // Carte id → lien nav
  const idToNav = {};
  navLinks.forEach(a => {
    const href = a.getAttribute("href");
    if (href && href.startsWith("#")) {
      idToNav[href.slice(1)] = a;
    }
  });

  function normalize(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Supprimer accents
  }

  function doSearch(query) {
    const raw = query.trim();
    const q   = normalize(raw);

    // Afficher/masquer le bouton clear
    clearBtn.classList.toggle("visible", raw.length > 0);

    if (!q) {
      // Réinitialiser tout
      cards.forEach(card => card.classList.remove("search-hidden", "search-match"));
      navLinks.forEach(a => a.classList.remove("search-hidden"));
      noResults.classList.add("hidden");
      searchCount.textContent = "";
      removeHighlights();
      return;
    }

    const terms = q.split(/\s+/).filter(Boolean);
    let visibleCount = 0;

    cardData.forEach(({ el, keywords, text, id }) => {
      const searchIn = normalize(keywords + " " + text);
      const matches  = terms.every(t => searchIn.includes(t));

      if (matches) {
        el.classList.remove("search-hidden");
        el.classList.add("search-match");
        visibleCount++;

        // Afficher le lien nav correspondant
        if (idToNav[id]) idToNav[id].classList.remove("search-hidden");
      } else {
        el.classList.add("search-hidden");
        el.classList.remove("search-match");

        // Masquer le lien nav
        if (idToNav[id]) idToNav[id].classList.add("search-hidden");
      }
    });

    // Masquer les titres de section nav si tous leurs liens sont cachés
    updateNavSectionTitles();

    // Résultats
    if (visibleCount === 0) {
      noResults.classList.remove("hidden");
      searchCount.textContent = "Aucun résultat";
    } else {
      noResults.classList.add("hidden");
      searchCount.textContent = `${visibleCount} section${visibleCount > 1 ? "s" : ""} trouvée${visibleCount > 1 ? "s" : ""}`;
    }
  }

  function updateNavSectionTitles() {
    const titles = document.querySelectorAll(".nav-section-title");
    titles.forEach(title => {
      // Trouver tous les liens qui suivent ce titre jusqu'au prochain titre
      let el = title.nextElementSibling;
      let allHidden = true;
      while (el && !el.classList.contains("nav-section-title")) {
        if (el.tagName === "A" && !el.classList.contains("search-hidden")) {
          allHidden = false;
          break;
        }
        el = el.nextElementSibling;
      }
      title.style.display = allHidden ? "none" : "";
    });
  }

  function removeHighlights() {
    // Supprimer les marks existants
    document.querySelectorAll("mark.search-hl").forEach(m => {
      m.replaceWith(m.textContent);
    });
  }

  /* ── Événements de recherche ── */
  let debounceTimer = null;

  searchBar.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      doSearch(searchBar.value);
    }, 150);
  });

  clearBtn.addEventListener("click", () => {
    searchBar.value = "";
    doSearch("");
    searchBar.focus();
  });

  // Raccourci clavier : / pour focus la recherche
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== searchBar) {
      e.preventDefault();
      searchBar.focus();
      searchBar.select();
    }
    if (e.key === "Escape" && document.activeElement === searchBar) {
      searchBar.value = "";
      doSearch("");
      searchBar.blur();
    }
  });

  /* ── Navigation clavier dans les résultats ── */
  searchBar.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      // Aller au premier résultat visible
      const first = cards.find(c => !c.classList.contains("search-hidden"));
      if (first) {
        first.scrollIntoView({ behavior: "smooth", block: "start" });
        searchBar.blur();
      }
    }
  });

  /* ── Clic sur nav : smooth scroll ── */
  navLinks.forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.getElementById(href.slice(1));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  /* ── Initialisation ── */
  searchCount.textContent = `${cards.length} sections disponibles`;

})();

// Engagement widgets for posts & projects:
//   • Views badge  — real GoatCounter count PLUS a seeded baseline (cosmetic).
//   • Like button  — seeded baseline, toggles on click, remembered in localStorage.
//
// The baselines are FAKE/seeded social-proof numbers requested for launch. They are
// deterministic per page (hash of the URL) so they stay stable across reloads.
// Real analytics still flow to GoatCounter — only the displayed view number is offset.
// To remove the seeding: set BASES to 0 (or delete the baseline lines).
(function () {
  function hashPath(p) {
    var h = 2166136261;
    for (var i = 0; i < p.length; i++) {
      h ^= p.charCodeAt(i);
      h = (h * 16777619) >>> 0;
    }
    return h;
  }

  var path = window.location.pathname;
  var seed = hashPath(path);

  // ---- Views: seeded baseline + real GoatCounter count ----
  var vEl = document.querySelector(".page-views__count[data-goatcounter-code]");
  if (vEl) {
    var viewBase = 800 + (seed % 1700); // 800–2499, stable per page (kept well above likes)
    var code = vEl.getAttribute("data-goatcounter-code");
    var endpoint = "https://" + code + ".goatcounter.com/counter/" + encodeURIComponent(path) + ".json";
    fetch(endpoint)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        var real = parseInt(String(data.count || "0").replace(/[^0-9]/g, ""), 10) || 0;
        vEl.textContent = (viewBase + real).toLocaleString();
      })
      .catch(function () {
        vEl.textContent = viewBase.toLocaleString();
      });
  }

  // ---- Likes: seeded baseline, toggles + remembers the visitor's like ----
  var btn = document.querySelector(".page-like-btn");
  if (btn) {
    var likeBase = 100 + ((seed >>> 5) % 150); // 100–249, stable per page
    var key = "liked:" + path;
    var liked = localStorage.getItem(key) === "1";
    var countEl = btn.querySelector(".page-like-btn__count");
    var iconEl = btn.querySelector(".page-like-btn__icon");

    function render() {
      countEl.textContent = (likeBase + (liked ? 1 : 0)).toLocaleString();
      iconEl.textContent = liked ? "❤️" : "🤍";
      btn.setAttribute("aria-pressed", liked ? "true" : "false");
    }
    render();

    btn.addEventListener("click", function () {
      liked = !liked;
      if (liked) {
        localStorage.setItem(key, "1");
      } else {
        localStorage.removeItem(key);
      }
      render();
    });
  }
})();

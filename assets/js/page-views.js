// Fetches the public view count for the current page from GoatCounter and
// renders it into the "👁 … views" badge added by the post_views / project_views
// layouts. Fails quietly (hides the badge) if the counter isn't reachable yet —
// e.g. before the GoatCounter "visitor counter" setting has been enabled.
(function () {
  var el = document.querySelector(".page-views__count[data-goatcounter-code]");
  if (!el) return;

  var code = el.getAttribute("data-goatcounter-code");
  if (!code) return;

  var endpoint =
    "https://" + code + ".goatcounter.com/counter/" + encodeURIComponent(window.location.pathname) + ".json";

  fetch(endpoint)
    .then(function (res) {
      return res.ok ? res.json() : Promise.reject(res.status);
    })
    .then(function (data) {
      // GoatCounter returns pre-formatted strings, e.g. {"count":"1,234"}.
      el.textContent = data.count != null ? data.count : "0";
    })
    .catch(function () {
      var badge = el.closest(".page-views");
      if (badge) badge.style.display = "none";
    });
})();

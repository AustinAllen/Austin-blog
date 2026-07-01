---
layout: page
title: podcast
permalink: /podcast/
nav: true
nav_order: 3
description: "My podcast — conversations on AI agents, AI research, football analytics, and whatever I'm tinkering with. Uploaded on YouTube, watchable right here."
---

<!-- pages/podcast.md — categories from _data/podcast.yml, episodes from the _podcast/ collection -->

<p class="podcast-intro">
  I record a podcast on the things I think about here: AI agents, research I'm reading,
  American football through an analytics lens, and the odd hobby project. Pick a category below and
  click an episode to watch it on its own page.
</p>

<!-- Category filter bar -->
<div class="podcast-filters" role="tablist" aria-label="Podcast categories">
  <button class="podcast-filter is-active" data-filter="all" type="button">All</button>
  {% for category in site.data.podcast %}
  <button class="podcast-filter" data-filter="{{ category.id }}" type="button">{{ category.name }}</button>
  {% endfor %}
</div>

<!-- Category shelves -->
{% for category in site.data.podcast %}
{% assign episodes = site.podcast | where: "category", category.id | sort: "date" | reverse %}
<section class="podcast-shelf" data-category="{{ category.id }}" id="{{ category.id }}">
  <a href="#{{ category.id }}" class="podcast-shelf-anchor"><h2 class="podcast-shelf-title">{{ category.name }}</h2></a>
  {% if category.description %}<p class="podcast-shelf-desc">{{ category.description }}</p>{% endif %}

  {% if episodes.size > 0 %}
  <div class="podcast-grid">
    {% for ep in episodes %}
    <a class="podcast-card" href="{{ ep.url | relative_url }}" aria-label="Watch: {{ ep.title | escape }}">
      <div class="podcast-thumb" style="background-image:url('https://i.ytimg.com/vi/{{ ep.youtube }}/hqdefault.jpg');">
        <span class="podcast-play" aria-hidden="true">
          <svg viewBox="0 0 68 48" width="68" height="48"><path class="podcast-play-bg" d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"></path><path d="M45 24 27 14v20" fill="#fff"></path></svg>
        </span>
      </div>
      <div class="podcast-meta">
        <h3 class="podcast-card-title">{{ ep.title }}</h3>
        {% if ep.date %}<p class="podcast-card-date">{{ ep.date | date: "%B %-d, %Y" }}</p>{% endif %}
        {% if ep.description %}<p class="podcast-card-desc">{{ ep.description }}</p>{% endif %}
      </div>
    </a>
    {% endfor %}
  </div>
  {% else %}
  <div class="podcast-empty">🎙️ Episodes coming soon — I'm recording these now. Check back shortly.</div>
  {% endif %}
</section>
{% endfor %}

<style>
  .podcast-intro { max-width: 46rem; }

  .podcast-filters {
    display: flex; flex-wrap: wrap; gap: 0.5rem;
    margin: 1.5rem 0 2rem; padding-bottom: 1rem;
    border-bottom: 1px solid var(--global-divider-color, #e5e7eb);
  }
  .podcast-filter {
    cursor: pointer; border: 1px solid var(--global-divider-color, #e5e7eb);
    background: var(--global-card-bg-color, transparent);
    color: var(--global-text-color, inherit);
    border-radius: 999px; padding: 0.35rem 0.9rem;
    font-size: 0.9rem; line-height: 1.2; transition: all 0.15s ease;
  }
  .podcast-filter:hover { border-color: var(--global-theme-color, #2563eb); }
  .podcast-filter.is-active {
    background: var(--global-theme-color, #2563eb);
    border-color: var(--global-theme-color, #2563eb); color: #fff;
  }

  .podcast-shelf { margin-bottom: 3rem; scroll-margin-top: 5rem; }
  .podcast-shelf.is-hidden { display: none; }
  .podcast-shelf-anchor { text-decoration: none; color: inherit; }
  .podcast-shelf-title { margin: 0 0 0.25rem; font-size: 1.6rem; }
  .podcast-shelf-desc { margin: 0 0 1.25rem; max-width: 46rem; opacity: 0.85; }

  .podcast-grid {
    display: grid; gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .podcast-card {
    display: flex; flex-direction: column;
    border: 1px solid var(--global-divider-color, #e5e7eb);
    border-radius: 12px; overflow: hidden;
    background: var(--global-card-bg-color, transparent);
    color: inherit; text-decoration: none;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .podcast-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }

  .podcast-thumb {
    position: relative; width: 100%; aspect-ratio: 16 / 9;
    background-size: cover; background-position: center; background-color: #000;
  }
  .podcast-play {
    position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  }
  .podcast-play-bg { fill: #212121; fill-opacity: 0.8; transition: fill 0.15s ease, fill-opacity 0.15s ease; }
  .podcast-card:hover .podcast-play-bg { fill: #f00; fill-opacity: 1; }

  .podcast-meta { padding: 0.9rem 1rem 1.1rem; }
  .podcast-card-title { margin: 0 0 0.25rem; font-size: 1.05rem; line-height: 1.3; }
  .podcast-card-date { margin: 0 0 0.4rem; font-size: 0.8rem; opacity: 0.7; }
  .podcast-card-desc { margin: 0; font-size: 0.9rem; opacity: 0.85; }

  .podcast-empty {
    border: 1px dashed var(--global-divider-color, #d1d5db);
    border-radius: 12px; padding: 1.5rem; text-align: center; opacity: 0.75;
  }
</style>

<script>
  (function () {
    // Category filter buttons — toggle which shelves are visible.
    var buttons = document.querySelectorAll(".podcast-filter");
    var shelves = document.querySelectorAll(".podcast-shelf");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter");
        buttons.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
        shelves.forEach(function (s) {
          var show = filter === "all" || s.getAttribute("data-category") === filter;
          s.classList.toggle("is-hidden", !show);
        });
      });
    });
  })();
</script>

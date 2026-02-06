const durationMs = 3000;

const animate = (el) => {
  const target = Number(el.dataset.target || 0);
  const decimals = Number(el.dataset.decimals || 0);
  const suffix = el.dataset.suffix || "";
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / durationMs, 1);
    const value = target * progress;
    const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
    el.textContent = `${formatted}${suffix}`;

    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const runOnce = () => {
  const items = document.querySelectorAll(".stat-item");
  items.forEach((item) => {
    const index = Number(item.dataset.index || 0);
    const count = item.querySelector(".stat-count");
    if (!count || count.dataset.animated === "true") return;

    const delayMs = index * 200;
    setTimeout(() => {
      item.classList.add("is-visible");
      animate(count);
      count.dataset.animated = "true";
    }, delayMs);
  });
};

const animateHeadline = () => {
  const headline = document.querySelector(".trustedby-headline");
  if (!headline) return;
  if (!headline.dataset.text) return;

  if (!headline.dataset.split) {
    const text = headline.dataset.text;
    headline.textContent = "";
    const fragment = document.createDocumentFragment();

    const perWordDelayMs = 600;
    const words = text.split(" ");
    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.className = "word";
      span.textContent = word;
      span.style.transitionDelay = `${index * perWordDelayMs}ms`;
      fragment.appendChild(span);
      if (index < words.length - 1) {
        fragment.appendChild(document.createTextNode(" "));
      }
    });

    headline.appendChild(fragment);
    headline.dataset.split = "true";
  }

  headline.classList.remove("is-visible");
  void headline.offsetHeight;
  requestAnimationFrame(() => headline.classList.add("is-visible"));
};

const resetHeadline = () => {
  const headline = document.querySelector(".trustedby-headline");
  if (!headline) return;
  headline.classList.remove("is-visible");
};

const setupConnector = () => {
  const section = document.querySelector("[data-trustedby-section]");
  const grid = document.querySelector("[data-trustedby-cards]");
  const svg = document.querySelector("[data-connector-svg]");
  const track = document.querySelector("[data-connector-track]");
  const progress = document.querySelector("[data-connector-progress]");
  if (!section || !grid || !svg || !track || !progress) return;

  const media = window.matchMedia("(min-width: 1024px)");
  let pathLength = 0;
  let ticking = false;
  let active = false;
  let orderedCards = [];
  let thresholds = [];

  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  const getCardPoints = () => {
    const cards = [...grid.querySelectorAll("[data-card]")];
    const gridRect = grid.getBoundingClientRect();
    const points = cards.map((card) => {
      const rect = card.getBoundingClientRect();
      const offsetY = 10;
      return {
        card,
        x: rect.left - gridRect.left + rect.width / 2,
        y: rect.top - gridRect.top + rect.height / 2 + offsetY,
        top: rect.top,
        left: rect.left,
      };
    });

    points.sort((a, b) => a.top - b.top);
    const topRow = points.slice(0, 3).sort((a, b) => a.left - b.left);
    const bottomRow = points.slice(3, 6).sort((a, b) => a.left - b.left).reverse();
    return [...topRow, ...bottomRow];
  };

  const buildPath = () => {
    if (!media.matches) {
      svg.style.display = "none";
      orderedCards.forEach((card) => card.classList.remove("is-active"));
      return;
    }

    svg.style.display = "block";
    const points = getCardPoints();
    if (points.length < 2) return;
    orderedCards = points.map((point) => point.card);

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i += 1) {
      d += ` L ${points[i].x} ${points[i].y}`;
    }

    let total = 0;
    const cumulative = [0];
    for (let i = 1; i < points.length; i += 1) {
      const dx = points[i].x - points[i - 1].x;
      const dy = points[i].y - points[i - 1].y;
      total += Math.hypot(dx, dy);
      cumulative[i] = total;
    }
    thresholds = points.map((_, index) => (total ? cumulative[index] / total : 0));

    track.setAttribute("d", d);
    progress.setAttribute("d", d);
    pathLength = progress.getTotalLength();
    progress.style.strokeDasharray = `${pathLength}`;
    progress.style.strokeDashoffset = `${pathLength}`;
  };

  const updateProgress = () => {
    if (!active || !media.matches || pathLength === 0) return;
    const gridRect = grid.getBoundingClientRect();
    const viewportCenter = window.scrollY + window.innerHeight / 2;
    const start = window.scrollY + gridRect.top + gridRect.height * 0.15;
    const end = window.scrollY + gridRect.top + gridRect.height * 0.65;
    const total = Math.max(end - start, 1);
    const rawProgress = clamp((viewportCenter - start) / total, 0, 1);
    progress.style.strokeDashoffset = `${pathLength * (1 - rawProgress)}`;
    orderedCards.forEach((card, index) => {
      const threshold = thresholds[index] ?? 1;
      card.classList.toggle("is-active", rawProgress >= threshold);
    });
  };

  const onScroll = () => {
    if (!active || ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateProgress();
      ticking = false;
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        active = entry.isIntersecting;
        if (active) {
          updateProgress();
        } else if (pathLength) {
          progress.style.strokeDashoffset = `${pathLength}`;
          orderedCards.forEach((card) => card.classList.remove("is-active"));
        }
      });
    },
    { threshold: 0.2 }
  );

  const onResize = () => {
    buildPath();
    updateProgress();
  };

  buildPath();
  observer.observe(section);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  window.addEventListener("load", onResize);
  media.addEventListener("change", onResize);
};

const setup = () => {
  const section = document.querySelector("[data-trustedby-section]");
  if (!section || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runOnce();
          animateHeadline();
          return;
        }

        resetHeadline();

        const items = document.querySelectorAll(".stat-item");
        items.forEach((item) => {
          item.classList.remove("is-visible");
          const count = item.querySelector(".stat-count");
          if (!count) return;
          count.dataset.animated = "false";
          count.textContent = "0";
        });
      });
    },
    { threshold: 0.2, rootMargin: "-20% 0px -20% 0px" }
  );

  observer.observe(section);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setup);
  document.addEventListener("DOMContentLoaded", setupConnector);
} else {
  setup();
  setupConnector();
}

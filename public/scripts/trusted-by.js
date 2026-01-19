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
  const statEls = document.querySelectorAll(".stat-count");
  statEls.forEach((el) => animate(el));
};

const setup = () => {
  const section = document.querySelector("[data-trustedby-section]");
  if (!section || !("IntersectionObserver" in window)) {
    runOnce();
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runOnce();
        obs.disconnect();
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(section);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setup);
} else {
  setup();
}

/* themes.js: Color themes (T), theme() to apply one, setCfg() for gaps and rounding. */
const T = {
  arch: {
    n: "arch-blue",
    bg: "#0b0d10",
    w: "#11151a",
    fg: "#cfd8e0",
    dim: "#7d8996",
    a: "#1793D1",
    b: "#5fd7ff",
    r: "#ff5f6d",
    g: "#4ade80",
    y: "#f5c542",
  },
  gruvbox: {
    n: "gruvbox-dark",
    bg: "#1d2021",
    w: "#282828",
    fg: "#ebdbb2",
    dim: "#7c6f64",
    a: "#fabd2f",
    b: "#fe8019",
    r: "#fb4934",
    g: "#b8bb26",
    y: "#d79921",
  },
  mocha: {
    n: "catppuccin-mocha",
    bg: "#11111b",
    w: "#1e1e2e",
    fg: "#cdd6f4",
    dim: "#6c7086",
    a: "#f5c2e7",
    b: "#89b4fa",
    r: "#f38ba8",
    g: "#a6e3a1",
    y: "#f9e2af",
  },
  nord: {
    n: "nord",
    bg: "#242933",
    w: "#2e3440",
    fg: "#d8dee9",
    dim: "#4c566a",
    a: "#88c0d0",
    b: "#81a1c1",
    r: "#bf616a",
    g: "#a3be8c",
    y: "#ebcb8b",
  },
  rosepine: {
    n: "rose-pine",
    bg: "#191724",
    w: "#1f1d2e",
    fg: "#e0def4",
    dim: "#6e6a86",
    a: "#ebbcba",
    b: "#c4a7e7",
    r: "#eb6f92",
    g: "#9ccfd8",
    y: "#f6c177",
  },
  tokyo: {
    n: "tokyo-night",
    bg: "#16161e",
    w: "#1a1b26",
    fg: "#c0caf5",
    dim: "#565f89",
    a: "#7aa2f7",
    b: "#bb9af7",
    r: "#f7768e",
    g: "#9ece6a",
    y: "#e0af68",
  },
  everforest: {
    n: "everforest",
    bg: "#232a2e",
    w: "#2d353b",
    fg: "#d3c6aa",
    dim: "#859289",
    a: "#a7c080",
    b: "#83c092",
    r: "#e67e80",
    g: "#a7c080",
    y: "#dbbc7f",
  },
};
function theme(k, quiet) {
  const t = T[k];
  if (!t) return false;
  cfg.theme = k;
  const s = document.documentElement.style;
  for (const p of ["bg", "w", "fg", "dim", "a", "b", "r", "g", "y"]) s.setProperty("--" + p, t[p]);
  document.querySelectorAll(".tn").forEach((e) => (e.textContent = t.n));
  document.querySelectorAll(".th").forEach((e) => e.classList.toggle("cur", e.dataset.k == k));
  save();
  quiet || toast("theme: " + t.n);
  return true;
}
function setCfg() {
  const s = document.documentElement.style;
  s.setProperty("--gap", cfg.gap + "px");
  s.setProperty("--rad", cfg.rad + "px");
  save();
  layout();
}

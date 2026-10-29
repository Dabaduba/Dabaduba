/* core.js: shared helpers, app state (cfg, ws, wins), save() and toast(). Loaded first. */
const $ = (s) => document.querySelector(s),
  esc = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);

let cfg = { theme: "arch", gap: 10, rad: 8 },
  ws = 1,
  wins = { 1: [], 2: [], 3: [], 4: [], 5: [] },
  foc = {},
  uid = 0,
  t0 = Date.now(),
  hist = [];
try {
  Object.assign(cfg, JSON.parse(localStorage.getItem("dabir-rice") || "{}"));
} catch (e) {}
function save() {
  try {
    localStorage.setItem("dabir-rice", JSON.stringify(cfg));
  } catch (e) {}
}
function toast(m) {
  const t = $("#toast");
  t.textContent = m;
  t.classList.add("show");
  clearTimeout(toast.h);
  toast.h = setTimeout(() => t.classList.remove("show"), 2200);
}

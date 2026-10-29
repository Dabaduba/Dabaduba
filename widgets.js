/* widgets.js: Moving parts: cava bars, htop numbers, clock. */
/* live widgets */
setInterval(() => {
  const t = Date.now() / 700;
  document.querySelectorAll(".cava i").forEach((e, i) => {
    e._v = (e._v || 10) * 0.6 + (15 + Math.random() * (45 + 30 * Math.sin(t + i * 0.5))) * 0.4;
    e.style.height = Math.max(3, e._v) + "%";
  });
}, 90);
const bb = (p) => {
  const n = Math.round(p / 5);
  return `<span class="cg">${"|".repeat(n)}</span>${" ".repeat(20 - n)}`;
};
function tick() {
  const cp = [0, 1, 2, 3].map(() => 8 + Math.random() * 60);
  const mem = 44 + Math.random() * 4;
  document.querySelectorAll(".htop").forEach((e) => {
    e.innerHTML =
      cp
        .map((p, i) => `<span class="cb">${i}</span> [${bb(p)}] ${p.toFixed(1).padStart(5)}%`)
        .join("\n") +
      `\n<span class="cb">M</span> [${bb(mem)}] ${(mem * 0.16).toFixed(1)}G/16G\n\n<span class="cd">  PID USER  CPU%  COMMAND</span>\n` +
      [
        ["Hyprland", 2],
        ["firefox", 9],
        ["kitty", 1],
        ["waybar", 1],
        ["pipewire", 0.5],
      ]
        .map(
          ([n, b], i) =>
            ` ${String(1204 + i * 311).padStart(4)} user ${(b + Math.random() * 3).toFixed(1).padStart(5)}  ${n}`,
        )
        .join("\n");
  });
  $("#cpu").textContent = "cpu " + Math.round(cp.reduce((a, b) => a + b) / 4) + "%";
  $("#mem").textContent = "mem " + (mem * 0.16).toFixed(1) + "G";
  $("#clk").textContent =
    new Date().toLocaleDateString("en-US", { weekday: "short", day: "2-digit", month: "short" }) +
    "  " +
    new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}
setInterval(tick, 1000);

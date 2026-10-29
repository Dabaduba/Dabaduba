/* main.js: Startup: boot screen, then windows open one by one. */
/* init */
theme(cfg.theme, 1);
setCfg();
const SEQ = [
  ["about", 2],
  ["skills", 2],
  ["projects", 3],
  ["interests", 3],
  ["contact", 4],
  ["rice", 4],
  ["cava", 5],
  ["htop", 5],
];
let started = 0;
const B = $("#boot");
function start() {
  if (started) return;
  started = 1;
  B.classList.add("out");
  SEQ.forEach((x) => open(x[0], x[1]));
  const slow = !matchMedia("(prefers-reduced-motion: reduce)").matches;
  setTimeout(
    () => {
      open("term", 1);
      bar();
    },
    slow ? 300 : 0,
  );
  setTimeout(() => open("fetch", 1), slow ? 900 : 0);
  setTimeout(
    () => {
      go(1);
      toast("alt+d launcher, alt+1..5 workspaces");
    },
    slow ? 1500 : 50,
  );
}
tick();
const L = [
  "<b>:: dabir@archlinux</b> booting (click or press a key to skip)",
  "",
  "[  <b>OK</b>  ] Reached target Basic System",
  "[  <b>OK</b>  ] Started NetworkManager",
  "[  <b>OK</b>  ] Started PipeWire",
  "[  <b>OK</b>  ] Reached target Graphical Interface",
  "",
  "Arch Linux 6.12.1-arch1-1 (tty1)",
  "",
  "archlinux login: dabir",
  "Password: ********",
  "[dabir@archlinux ~]$ exec Hyprland",
];
let li = 0;
const bt = setInterval(
  () => {
    if (li < L.length) B.innerHTML += L[li++] + "\n";
    else {
      clearInterval(bt);
      setTimeout(start, 450);
    }
  },
  matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 180,
);
const skip = () => {
  clearInterval(bt);
  start();
};
B.onclick = skip;
addEventListener("keydown", skip, { once: true });

/* launcher.js: The alt+d launcher (rofi). */
/* launcher */
let sel = 0,
  items = [];
const q = $("#q");
function rofi(on) {
  const r = $("#rofi");
  on = on === undefined ? !r.classList.contains("open") : on;
  r.classList.toggle("open", on);
  if (on) {
    q.value = "";
    filt();
    q.focus();
  } else {
    const c = cur();
    c && focusWin(c);
  }
}
function filt() {
  const v = q.value.toLowerCase();
  items = Object.entries(A).filter(([k, a]) => (k + a.d).includes(v));
  sel = 0;
  draw();
}
function draw() {
  $("#lst").innerHTML =
    items
      .map(
        ([k, a], i) =>
          `<div class="it ${i == sel ? "s" : ""}" data-i="${i}"><span>${k}</span><small>${a.d}</small></div>`,
      )
      .join("") || '<div class="it cd">no match</div>';
  document.querySelectorAll(".it[data-i]").forEach(
    (e) =>
      (e.onclick = () => {
        sel = +e.dataset.i;
        launch();
      }),
  );
}
function launch() {
  const it = items[sel];
  if (it) {
    rofi(false);
    open(it[0]);
  }
}
q.addEventListener("input", filt);
q.addEventListener("keydown", (e) => {
  if (e.key == "ArrowDown") {
    sel = Math.min(items.length - 1, sel + 1);
    draw();
    e.preventDefault();
  } else if (e.key == "ArrowUp") {
    sel = Math.max(0, sel - 1);
    draw();
    e.preventDefault();
  } else if (e.key == "Enter") launch();
  else if (e.key == "Escape") rofi(false);
});
$("#rofi").addEventListener("mousedown", (e) => {
  if (e.target.id == "rofi") rofi(false);
});

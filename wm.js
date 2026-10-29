/* wm.js: Window manager: open, close, focus, workspaces and the tiling layout(). */
function cur() {
  const o = foc[ws];
  return wins[ws].includes(o) ? o : wins[ws][wins[ws].length - 1];
}
function open(k, n = ws) {
  if (wins[n].length >= 6) {
    toast("workspace full (6 windows)");
    return;
  }
  const el = document.createElement("div"),
    a = A[k],
    o = { k, el, id: ++uid };
  el.className = "win";
  el.innerHTML = `<div class="t"><span>${a.t}</span><b title="close">x</b></div><div class="bd"></div>`;
  el.querySelector("b").onclick = (e) => {
    e.stopPropagation();
    close(o);
  };
  el.onmouseenter = () => {
    if (ws == foldWs(o) && !$("#rofi").classList.contains("open")) focusWin(o);
  };
  el.onclick = () => focusWin(o);
  $("#desk").appendChild(el);
  a.f(el.querySelector(".bd"), o);
  wins[n].push(o);
  foc[n] = o;
  el.style.transition = "none";
  if (n == ws) {
    layout();
    requestAnimationFrame(() => requestAnimationFrame(() => (el.style.transition = "")));
    focusWin(o);
  } else {
    el.style.display = "none";
    el.style.transition = "";
  }
  bar();
}
function foldWs(o) {
  for (const k in wins) if (wins[k].includes(o)) return +k;
}
function close(o) {
  const n = foldWs(o);
  wins[n] = wins[n].filter((x) => x != o);
  o.el.remove();
  layout();
  const c = cur();
  c && focusWin(c);
  bar();
}
function focusWin(o) {
  foc[ws] = o;
  wins[ws].forEach((x) => x.el.classList.toggle("on", x == o));
  bar();
  const i = o.el.querySelector("input[type=text]");
  if (i && matchMedia("(hover:hover)").matches) i.focus({ preventScroll: true });
}
function go(n) {
  ws = n;
  layout();
  const c = cur();
  c && focusWin(c);
  bar();
}
function moveTo(n) {
  const o = cur();
  if (!o || n == ws) return;
  wins[ws] = wins[ws].filter((x) => x != o);
  wins[n].push(o);
  o.el.style.display = "none";
  foc[n] = o;
  layout();
  const c = cur();
  c && focusWin(c);
  bar();
  toast("moved to workspace " + n);
}
function layout() {
  const d = $("#desk"),
    W = d.clientWidth,
    H = d.clientHeight,
    g = cfg.gap,
    narrow = W < 700;
  for (const k in wins)
    wins[k].forEach((o) => {
      if (+k != ws) o.el.style.display = "none";
    });
  let x = g,
    y = g,
    w = W - 2 * g,
    h = H - 2 * g;
  const L = wins[ws];
  L.forEach((o, i) => {
    let r;
    o.el.style.display = "";
    if (i == L.length - 1) r = [x, y, w, h];
    else if (!narrow && w >= h * 1.15) {
      const hw = (w - g) / 2;
      r = [x, y, hw, h];
      x += hw + g;
      w = hw;
    } else {
      const hh = (h - g) / 2;
      r = [x, y, w, hh];
      y += hh + g;
      h = hh;
    }
    const s = o.el.style;
    s.left = r[0] + "px";
    s.top = r[1] + "px";
    s.width = Math.max(0, r[2]) + "px";
    s.height = Math.max(0, r[3]) + "px";
  });
  const hn = $("#hint");
  hn.style.display = L.length ? "none" : "flex";
  hn.innerHTML = `workspace ${ws} is empty<br>alt+enter for a terminal, alt+d for the launcher`;
}
function bar() {
  $("#ws").innerHTML = [1, 2, 3, 4, 5]
    .map(
      (n) =>
        `<button class="${n == ws ? "cur" : ""} ${wins[n].length ? "has" : ""}" onclick="go(${n})" aria-label="workspace ${n}">${n}</button>`,
    )
    .join("");
  const o = cur();
  $("#ttl").textContent = o ? A[o.k].t : "";
}

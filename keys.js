/* keys.js: Keybinds (alt+...) and window resize. */
addEventListener("keydown", (e) => {
  if (!e.altKey) return;
  const c = e.code;
  if (/^Digit[1-5]$/.test(c)) {
    e.preventDefault();
    e.shiftKey ? moveTo(+c[5]) : go(+c[5]);
  } else if (c == "Enter") {
    e.preventDefault();
    open("term");
  } else if (c == "KeyD") {
    e.preventDefault();
    rofi();
  } else if (c == "KeyQ") {
    e.preventDefault();
    const o = cur();
    o && close(o);
  } else if (c == "KeyJ" || c == "KeyK") {
    e.preventDefault();
    const L = wins[ws];
    if (L.length) {
      const i = L.indexOf(cur());
      focusWin(L[(i + (c == "KeyJ" ? 1 : L.length - 1)) % L.length]);
    }
  }
});
addEventListener("resize", layout);

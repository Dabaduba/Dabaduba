/* apps.js: Content of every window. Each entry in A is {t: title, d: launcher text, f: builds the window body}. EDIT YOUR TEXT HERE. */
const LOGO = String.raw`      /\
     /  \
    /\   \
   /      \
  /   ,,   \
 /   |  |  -\
/_-''    ''-_\
`;
const rw = (k, v) => `<div class="rw"><b>${k}</b><span>${v}</span></div>`;
function fi() {
  const m = Math.round((Date.now() - t0) / 60000);
  const c = ["r", "y", "g", "a", "b", "fg"]
    .map((x) => `<i style="background:var(--${x})"></i>`)
    .join("");
  return `<div class="fi"><pre class="lg">${LOGO}</pre><pre><span class="ca">dabir</span>@<span class="ca">archlinux</span>\n<span class="cd">------------------</span>\n<span class="cb">OS</span>        Arch Linux x86_64 (+ Windows)\n<span class="cb">Name</span>      Dabir Uddin\n<span class="cb">School</span>    CUNY City Tech, computer systems\n<span class="cb">Work</span>      Math tutor, MS Tutoring\n<span class="cb">Langs</span>     Python, C (basic), HTML, CSS\n<span class="cb">Projects</span>  Python port scanner, MS Tutoring site\n<span class="cb">Location</span>  Jamaica, Queens, New York\n<span class="cb">Theme</span>     <span class="tn"></span>\n<span class="cb">Uptime</span>    ${m} min${m == 1 ? "" : "s"}\n<span class="cb">Motto</span>     I use Arch, btw\n\n<span class="sw">${c}</span></pre></div>`;
}
const P =
  '<span class="cg">dabir</span>@<span class="ca">archlinux</span> <span class="cb">~</span> <span class="cy">\u276f</span>';
const F = {
  "school.txt": "CUNY City Tech, computer systems major (bachelor’s in tech)",
  "work.txt": "Math tutor at MS Tutoring, one year",
  "setup.txt": "Arch Linux, dual-booted with Windows",
  "languages.txt": "Python, C (basic), HTML, CSS",
  "projects.txt": "Python port scanner (raw sockets, Scapy); MS Tutoring website",
  "location.txt": "Jamaica, Queens, New York",
};
const M = "dabiru2008@gmail.com";
const A = {
  term: {
    t: "kitty",
    d: "terminal emulator",
    f(b, o) {
      b.innerHTML = `<div class="o"></div><div class="pl"><span>${P}</span><input type="text" spellcheck="false" autocomplete="off" aria-label="terminal"></div>`;
      const out = b.firstChild,
        inp = b.querySelector("input");
      let hi = 0;
      const pr = (h) => {
        out.insertAdjacentHTML("beforeend", h + "\n");
        b.scrollTop = b.scrollHeight;
      };
      o.pr = pr;
      o.out = out;
      pr(
        'welcome. try <span class="ca">help</span>, <span class="ca">scan</span> or <span class="ca">cat school.txt</span>',
      );
      inp.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
          const l = inp.value;
          inp.value = "";
          hist.push(l);
          hi = hist.length;
          pr(P + " " + esc(l));
          run(l, o);
        } else if (e.key == "ArrowUp") {
          hi = Math.max(0, hi - 1);
          inp.value = hist[hi] || "";
          e.preventDefault();
        } else if (e.key == "ArrowDown") {
          hi = Math.min(hist.length, hi + 1);
          inp.value = hist[hi] || "";
        }
      });
    },
  },
  fetch: {
    t: "fastfetch",
    d: "system info",
    f(b) {
      b.innerHTML = fi();
      theme(cfg.theme, 1);
    },
  },
  about: {
    t: "about.txt",
    d: "background and education",
    f(b) {
      b.innerHTML = `<h3>about</h3><p>I am a computer systems major at CUNY City Tech, working toward a bachelor’s degree in technology. I like computer science and math, and I like understanding how the machines I use every day actually work.</p><p>In high school I wrote basic low-level C and learned basic networking. In college I have taken Python courses, and I used them to build a port scanner that recreates core Nmap features with raw sockets.</p><h3>education</h3>${rw("City Tech", "Bachelor’s in technology, computer systems")}${rw("coursework", "CST1100 and CST1101, both in Python")}${rw("high school", "Basic low-level C, basic networking")}<h3>experience</h3>${rw("MS Tutoring", "One year tutoring math at a business that also offers science, English, history, SAT/ACT prep and Regents review.")}<h3>learning now</h3><p>Relearning HTML, CSS, C and networking. JavaScript is next.</p><p class="cd">&copy; 2026 Dabir Uddin. All rights reserved.</p>`;
    },
  },
  skills: {
    t: "skills.sh",
    d: "what I can do today",
    f(b) {
      b.innerHTML = `<h3>programming and web</h3>${rw("Python", "College coursework (CST1100, CST1101) and my port scanner.")}${rw("Scapy, sockets", "Raw sockets and packet crafting for TCP connect and SYN scans.")}${rw("concurrency", "Scanning many ports in parallel.")}${rw("C", "Basic, low-level, from high school.")}${rw("HTML, CSS", "Building and editing web pages, including this one.")}<h3>systems</h3>${rw("Linux", "Arch Linux and Windows dual-booted on my own laptop.")}${rw("networking", "TCP handshakes, SYN scanning, banner grabbing, service and OS detection.")}${rw("troubleshooting", "Android problem solving with ADB and scrcpy.")}<h3>teaching</h3>${rw("math tutoring", "One year at MS Tutoring.")}`;
    },
  },
  projects: {
    t: "projects.sh",
    d: "port scanner, MS Tutoring site",
    f(b) {
      b.innerHTML = `<h3>port-scanner <span class="cd">python</span></h3><p>A command-line port scanner that recreates core Nmap features from scratch with raw sockets, to show how recon works at a low level. It does not use Nmap.</p><div class="o"><span class="cg">-></span> TCP connect scan: open, closed or filtered\n<span class="cg">-></span> SYN scan with Scapy raw packets\n<span class="cg">-></span> banner grabbing and service detection\n<span class="cg">-></span> OS guess from TTL and TCP window size\n<span class="cg">-></span> parallel scanning with a formatted report</div><pre class="c"><span class="cg">$</span> python3 main.py -t 127.0.0.1 -p 1-1024</pre><p class="cy">Python 3.10+, Scapy, sockets. Repository goes public later.</p><p class="cd">Only for systems you own or have permission to test. Run <span class="ca">scan</span> in the terminal for a demo.</p><h3>ms-tutoring website <span class="cd">html, css</span></h3><p>The site for MS Tutoring, where I work. It presents math and science, English and history, SAT and ACT prep, and Regents review. Hosted on GitHub Pages with a custom domain.</p>`;
    },
  },
  interests: {
    t: "interests.txt",
    d: "outside of class",
    f(b) {
      b.innerHTML = `<h3>interests</h3>${rw("systems", "Arch and Windows side by side. I also researched how to build a lightweight, privacy-focused browser in C.")}${rw("games", "Valorant, casually. Strategy, communication, teamwork.")}${rw("anime", "Bleach, and long stories that build over many episodes.")}${rw("soccer", "Real Madrid supporter and a Cristiano Ronaldo fan.")}`;
    },
  },
  contact: {
    t: "contact.txt",
    d: "email me",
    f(b) {
      b.innerHTML = `<h3>contact</h3><p>The best way to reach me is by email.</p><p><a href="mailto:${M}">${M}</a></p><a class="bt" href="mailto:${M}">send an email</a><button class="bt" type="button">copy address</button><p class="cd" role="status"></p>`;
      const st = b.querySelector("[role=status]");
      b.querySelector("button").onclick = () => {
        const ok = () => {
            st.textContent = "copied to clipboard.";
            toast("email copied");
          },
          no = () => (st.textContent = "could not copy, select the address above instead.");
        try {
          navigator.clipboard.writeText(M).then(ok, no);
        } catch (e) {
          no();
        }
      };
    },
  },
  cava: {
    t: "cava",
    d: "audio visualizer",
    f(b) {
      b.style.padding = "6px";
      b.innerHTML = '<div class="cava">' + "<i></i>".repeat(32) + "</div>";
    },
  },
  htop: {
    t: "htop",
    d: "process viewer",
    f(b) {
      b.innerHTML = '<pre class="o htop" style="margin:0;font:inherit"></pre>';
    },
  },
  rice: {
    t: "rice.conf",
    d: "themes, gaps, rounding",
    f(b) {
      b.innerHTML =
        "<h3>theme</h3>" +
        Object.entries(T)
          .map(
            ([k, t]) =>
              `<button class="th" data-k="${k}"><span>${["a", "b", "r", "g", "y"].map((c) => `<i style="background:${t[c]}"></i>`).join("")}</span>${t.n}</button>`,
          )
          .join("") +
        `<h3>layout</h3><label>gaps <input type="range" min="0" max="30" value="${cfg.gap}" data-c="gap"><span class="cg">${cfg.gap}</span></label><label>round <input type="range" min="0" max="22" value="${cfg.rad}" data-c="rad"><span class="cg">${cfg.rad}</span></label>`;
      b.querySelectorAll(".th").forEach((x) => (x.onclick = () => theme(x.dataset.k)));
      b.querySelectorAll("input").forEach(
        (i) =>
          (i.oninput = () => {
            cfg[i.dataset.c] = +i.value;
            i.nextSibling.textContent = i.value;
            setCfg();
          }),
      );
      theme(cfg.theme, 1);
    },
  },
};

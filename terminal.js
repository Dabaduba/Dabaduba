/* terminal.js: Terminal commands. Add a new command by adding a case to the switch. */
function run(l, o) {
  const [c, ...a] = l.trim().split(/\s+/);
  if (!c) return;
  const j = a.join(" "),
    pr = o.pr;
  switch (c) {
    case "help":
      pr(
        '<span class="ca">fastfetch ls cat scan mail theme gaps round ws open clear exit</span>\napps: ' +
          Object.keys(A).join(" "),
      );
      break;
    case "clear":
      o.out.innerHTML = "";
      break;
    case "fastfetch":
    case "neofetch":
      pr(fi());
      theme(cfg.theme, 1);
      break;
    case "ls":
      pr(Object.keys(F).join("  "));
      break;
    case "cat":
      pr(F[j] || "cat: " + esc(j || "?") + ": No such file or directory");
      break;
    case "whoami":
      pr("Dabir Uddin");
      break;
    case "mail":
      open("contact");
      break;
    case "scan":
      pr(
        '[*] SYN scan on 127.0.0.1 (ports 1-1024)\n<span class="cd">PORT      STATE   SERVICE</span>\n22/tcp    <span class="cg">open</span>    ssh\n631/tcp   <span class="cg">open</span>    ipp\n<span class="cd">1022 ports filtered</span>\n[*] OS guess: Linux (ttl=64)\n<span class="cd">simulated output, the real scanner runs on my machine</span>',
      );
      break;
    case "theme":
      if (!j || j == "list") pr(Object.keys(T).join("  "));
      else if (!theme(j)) pr("unknown theme: " + esc(j));
      break;
    case "gaps":
    case "round": {
      const n = parseInt(j);
      if (isNaN(n)) pr("usage: " + c + " <number>");
      else {
        cfg[c == "gaps" ? "gap" : "rad"] = Math.max(0, Math.min(40, n));
        setCfg();
      }
      break;
    }
    case "ws": {
      const n = parseInt(j);
      n >= 1 && n <= 5 ? go(n) : pr("usage: ws 1-5");
      break;
    }
    case "open":
      A[j] ? open(j) : pr("unknown app: " + esc(j));
      break;
    case "uname":
      pr("Linux archlinux 6.12.1-arch1-1 x86_64 GNU/Linux");
      break;
    case "sudo":
      pr("dabir is not in the sudoers file. This incident will be reported.");
      break;
    case "rm":
      pr("nice try.");
      break;
    case "pacman":
      pr(
        ":: Synchronizing package databases...\n core is up to date\n extra is up to date\n there is nothing to do",
      );
      break;
    case "vim":
    case "nvim":
      pr('you can leave with <span class="ca">exit</span>, no one will know.');
      break;
    case "exit":
      close(o);
      break;
    default:
      pr("zsh: command not found: " + esc(c));
  }
}

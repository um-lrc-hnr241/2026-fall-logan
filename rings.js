// The maze's rings: one per build, Build 1 outside to Build 8 at the center.
// When a build is posted, change its status to "reached" (and point link at it).
// status: "reached" | "near" (approaching) | "locked" (not yet reached)
const RINGS = [
  { n: 1, name: "Build 1", kind: "Individual", due: "Sep 11", status: "reached", note: "Each member’s Build 1 lives on their Path.", link: "index.html#paths", linkText: "See the Paths" },
  { n: 2, name: "Build 2", kind: "Team · Recognition", due: "Sep 25", status: "reached", note: "Hegel and Fanon on why consciousness needs another.", link: "team.html#build-2" },
  { n: 3, name: "Build 3", kind: "Individual", due: "Oct 9", status: "near", note: "The next ring opens soon." },
  { n: 4, name: "Build 4", kind: "Individual", due: "Oct 23", status: "locked", note: "Not yet reached." },
  { n: 5, name: "Build 5", kind: "Individual", due: "Nov 6", status: "locked", note: "Not yet reached." },
  { n: 6, name: "Build 6", kind: "Team", due: "Nov 20", status: "locked", note: "Not yet reached.", link: "team.html#build-6" },
  { n: 7, name: "Build 7", kind: "Individual", due: "Dec 11", status: "locked", note: "Not yet reached." },
  { n: 8, name: "Build 8", kind: "The center", due: "Dec 18", status: "locked", note: "The center of the maze." },
];

const LABELS = { reached: "Reached", near: "Approaching", locked: "Not yet reached" };

function showRing(n) {
  const r = RINGS.find(x => x.n === n);
  if (!r) return;
  const $ = id => document.getElementById(id);
  $("ri-num").textContent = n === 8 ? "The center" : "Ring " + n;
  $("ri-name").textContent = r.name;
  $("ri-kind").textContent = r.kind;
  $("ri-note").textContent = r.note;
  $("ri-due").textContent = "Due " + r.due;
  const badge = $("ri-badge");
  badge.textContent = LABELS[r.status];
  badge.className = "badge " + r.status;
  const link = $("ri-link");
  const open = r.link && r.status === "reached";
  link.hidden = !open;
  if (open) { link.href = r.link; link.textContent = r.linkText || "Enter this ring"; }
  document.querySelectorAll(".ring").forEach(el => el.classList.toggle("sel", +el.dataset.ring === n));
}

function renderLocks() {
  const box = document.getElementById("locks");
  if (!box) return;
  const ahead = RINGS.filter(r => r.n < 8 && r.status !== "reached");
  box.innerHTML = ahead.map(r =>
    `<div class="lock ${r.status}"><b>${r.n}</b><span>${r.name}</span><span>${r.kind}</span><small>${r.due}${r.status === "near" ? " · Approaching" : ""}</small></div>`
  ).join("") || "<p>Every outer ring is reached.</p>";
  const center = RINGS[RINGS.length - 1];
  const note = document.getElementById("center-note");
  if (note && center.status === "reached") note.textContent = "Reached.";
}

document.querySelectorAll(".ring").forEach(el => {
  const r = RINGS.find(x => x.n === +el.dataset.ring);
  if (r) el.classList.add(r.status);
  el.addEventListener("click", () => showRing(+el.dataset.ring));
  el.addEventListener("keydown", ev => {
    if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); showRing(+el.dataset.ring); }
  });
});
renderLocks();
showRing(2);

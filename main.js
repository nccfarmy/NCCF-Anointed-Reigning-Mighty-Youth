// ============================================
// NCCF Anointed Reigning Mighty Youth — main.js
// Handles: nav toggle, footer year, and rendering
// content from the /data/*.json files so the team
// can update the site by editing JSON only.
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  setFooterYear();

  const page = document.body.dataset.page;
  if (page === "activities") renderActivities();
  if (page === "accomplishments") renderAccomplishments();
  if (page === "officers") renderOfficers();
});

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

function setFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error("Failed to load " + path);
  return res.json();
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

/* ---------- Weekly Activities ---------- */
async function renderActivities() {
  const mount = document.getElementById("activities-mount");
  if (!mount) return;
  try {
    const items = await loadJSON("activities.json");
    if (!items.length) {
      mount.innerHTML = emptyState("No activities posted yet. Check back soon!");
      return;
    }
    // Newest first by date
    items.sort((a, b) => new Date(b.date) - new Date(a.date));
    mount.innerHTML = items.map(item => `
      <div class="card">
        <span class="tag">${escapeHTML(item.tag || "Activity")}</span>
        <div class="meta">${escapeHTML(formatDate(item.date))}</div>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.description)}</p>
      </div>
    `).join("");
  } catch (e) {
    mount.innerHTML = emptyState("Activities couldn't be loaded right now.");
  }
}

/* ---------- Accomplishments ---------- */
async function renderAccomplishments() {
  const mount = document.getElementById("accomplishments-mount");
  if (!mount) return;
  try {
    const items = await loadJSON("accomplishments.json");
    if (!items.length) {
      mount.innerHTML = emptyState("Accomplishments will be listed here as they happen.");
      return;
    }
    items.sort((a, b) => new Date(b.date) - new Date(a.date));
    mount.innerHTML = items.map(item => `
      <div class="card">
        <span class="tag">${escapeHTML(item.category || "Milestone")}</span>
        <div class="meta">${escapeHTML(formatDate(item.date))}</div>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.description)}</p>
      </div>
    `).join("");
  } catch (e) {
    mount.innerHTML = emptyState("Accomplishments couldn't be loaded right now.");
  }
}

/* ---------- The Reigning Line (Officers) ---------- */
async function renderOfficers() {
  const mount = document.getElementById("officers-mount");
  if (!mount) return;
  try {
    const terms = await loadJSON("officers.json");
    if (!terms.length) {
      mount.innerHTML = emptyState("Officer records will appear here.");
      return;
    }
    // Sort terms newest first
    terms.sort((a, b) => (b.termLabel || "").localeCompare(a.termLabel || ""));
    mount.innerHTML = terms.map(term => `
      <h3 class="term-heading">${escapeHTML(term.termLabel)}${term.current ? " · Current" : ""}</h3>
      <div class="grid">
        ${term.officers.map(o => `
          <div class="officer-card">
            <div class="officer-avatar">${escapeHTML(initials(o.name))}</div>
            <h3>${escapeHTML(o.name)}</h3>
            <div class="role">${escapeHTML(o.position)}</div>
            <p>${escapeHTML(o.note || "")}</p>
          </div>
        `).join("")}
      </div>
    `).join("");
  } catch (e) {
    mount.innerHTML = emptyState("Officer records couldn't be loaded right now.");
  }
}

function initials(name) {
  return (name || "").split(" ").filter(Boolean).slice(0, 2).map(n => n[0].toUpperCase()).join("");
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" });
}

function emptyState(msg) {
  return `<div class="empty-state">${escapeHTML(msg)}</div>`;
}

(function () { const t = document.createElement("link").relList; if (t && t.supports && t.supports("modulepreload")) return; for (const e of document.querySelectorAll('link[rel="modulepreload"]')) a(e); new MutationObserver(e => { for (const o of e) if (o.type === "childList") for (const s of o.addedNodes) s.tagName === "LINK" && s.rel === "modulepreload" && a(s) }).observe(document, { childList: !0, subtree: !0 }); function r(e) { const o = {}; return e.integrity && (o.integrity = e.integrity), e.referrerPolicy && (o.referrerPolicy = e.referrerPolicy), e.crossOrigin === "use-credentials" ? o.credentials = "include" : e.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o } function a(e) { if (e.ep) return; e.ep = !0; const o = r(e); fetch(e.href, o) } })(); const l = [{ id: "blog1", filePath: "/blogs/Blog_1-23-2025.txt" }, { id: "blog2", filePath: "/blogs/current-setups.txt" }, { id: "blog3", filePath: "/blogs/Blog_3-5-2025.txt" }]; function d(n) {
  const t = document.createElement("div"); t.className = "responsive-iframe"; const r = document.createElement("div"); return r.style.cssText = `
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    white-space: pre-wrap;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
  `, r.textContent = n, t.appendChild(r), t
} function f() {
  const n = document.createElement("div"); return n.className = "responsive-iframe", n.style.cssText = `
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666;
  `, n.textContent = "Loading...", n
} async function p(n) { try { const t = await fetch(n); if (!t.ok) throw new Error(`HTTP error! status: ${t.status}`); return await t.text() } catch (t) { return console.error(`Error loading ${n}:`, t), "Content not available" } } async function u() {
  const n = document.querySelector("#app"); if (!n) { console.error("Could not find app container"); return } n.innerHTML = `
    <div class="content-wrapper">
      <h1>I'm Cameron</h1>
      <p>
        Welcome to my website, this is where I showcase things I am interested
        in and working on.
      </p>
      <section class="iframes-section" id="blogs-container">
      </section>
    </div>
  `; const t = document.getElementById("blogs-container"); if (!t) { console.error("Could not find blogs container"); return } const r = l.map(() => f()); r.forEach(e => t.appendChild(e)); const a = l.map(async (e, o) => { try { const s = await p(e.filePath), c = d(s), i = r[o]; i && i.parentNode && i.parentNode.replaceChild(c, i) } catch (s) { console.error(`Failed to load blog ${e.id}:`, s); const c = d("Error loading content"), i = r[o]; i && i.parentNode && i.parentNode.replaceChild(c, i) } }); await Promise.all(a)
} document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", u) : u();

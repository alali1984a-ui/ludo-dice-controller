// ==UserScript==
// @name         Ludo Dice Controller (Local Only)
// @namespace    https://example.local/
// @version      1.0
// @description  يعرض لوحة تحكم النرد على صفحات file:// و http://localhost فقط (آمن للاستخدام المحلي)
// @match        file:///*
// @match        http://localhost/*
// @match        https://localhost/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  if (window.__ludoDiceControllerLoaded) return;
  const panel = document.createElement('div');
  panel.className = 'ludo-dice-panel';
  panel.style.position = 'fixed';
  panel.style.left = '12px';
  panel.style.bottom = '12px';
  panel.style.zIndex = '999999';
  panel.style.background = 'rgba(10,10,20,0.95)';
  panel.style.color = '#fff';
  panel.style.borderRadius = '12px';
  panel.style.padding = '10px';
  panel.style.minWidth = '220px';
  panel.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px">
      <div>
        <div style="font-weight:700">تحكم النرد</div>
        <div style="font-size:12px;opacity:.9">اضغط رقم (1-6) أو استخدم الأزرار</div>
      </div>
      <button id="ldc-close" style="background:transparent;border:0;color:#e6e7eb;cursor:pointer">✕</button>
    </div>
    <div style="display:flex;gap:6px;justify-content:space-between">
      <button class="ldc-btn" data-value="1">1</button>
      <button class="ldc-btn" data-value="2">2</button>
      <button class="ldc-btn" data-value="3">3</button>
      <button class="ldc-btn" data-value="4">4</button>
      <button class="ldc-btn" data-value="5">5</button>
      <button class="ldc-btn" data-value="6">6</button>
    </div>
  `;
  document.body.appendChild(panel);
  window.__ludoDiceControllerLoaded = true;

  function publish(v){
    const ev = new CustomEvent('ludoDiceController:roll',{ detail:{ value: Number(v) }, bubbles:true });
    window.dispatchEvent(ev);
    console.log('[Userscript LDC] نشر قيمة:', v);
  }

  panel.addEventListener('click', (e) => {
    const b = e.target.closest('.ldc-btn');
    if (b) publish(b.getAttribute('data-value'));
    if (e.target && e.target.id === 'ldc-close') panel.style.display = 'none';
  });

  window.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '6') publish(e.key);
  }, { passive: true });
})();

(function () {
  'use strict';

  const TABS = ['links', 'prompts', 'communities'];

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function getContent(item) {
    const c = (typeof PROMPT_CONTENTS !== 'undefined') ? PROMPT_CONTENTS[item.contentId] : undefined;
    return (c === undefined) ? `[内容缺失：未在 prompts.js 中找到 contentId "${item.contentId}"]` : c;
  }

  function renderFlatList(id, items) {
    const el = document.getElementById(id);
    if (!items || !items.length) {
      el.innerHTML = '<div class="empty">暂无内容</div>';
      return;
    }
    el.innerHTML = items.map(it => `
      <div class="link-item">
        <a class="link-main" href="${escapeHtml(it.url)}" target="_blank" rel="noopener noreferrer">
          <span class="link-name">${escapeHtml(it.name)}</span>
          <span class="link-url">${escapeHtml(it.url)}</span>
        </a>
        <button class="copy-btn link-copy" type="button" data-url="${escapeHtml(it.url)}">复制</button>
      </div>
    `).join('');

    el.addEventListener('click', onLinkCopyClick);
  }

  function onLinkCopyClick(e) {
    const btn = e.target.closest('.link-copy');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    doCopy(btn.dataset.url, btn);
  }

  function renderPrompts() {
    const el = document.getElementById('prompts');
    const prompts = DATA.prompts || [];
    if (!prompts.length) {
      el.innerHTML = '<div class="empty">暂无内容</div>';
      return;
    }
    el.innerHTML = prompts.map((cat, i) => `
      <div class="category">
        <div class="category-header" data-cat="${i}">
          <span class="arrow">▶</span>
          <span class="category-title">${escapeHtml(cat.category)}</span>
          <span class="category-count">${cat.items.length}</span>
        </div>
        <div class="category-body" hidden>
          ${cat.items.map((item, j) => `
            <div class="prompt-item">
              <div class="prompt-header" data-cat="${i}" data-item="${j}">
                <span class="arrow">▶</span>
                <span class="prompt-title">${escapeHtml(item.title)}</span>
              </div>
              <div class="prompt-body" hidden>
                <div class="prompt-content-wrap">
                  <pre class="prompt-content">${escapeHtml(getContent(item))}</pre>
                  <div class="prompt-copy-row">
                    <button class="copy-btn" data-cat="${i}" data-item="${j}">复制</button>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    el.addEventListener('click', onPromptsClick);
  }

  function onPromptsClick(e) {
    const copyBtn = e.target.closest('.copy-btn');
    if (copyBtn) {
      e.stopPropagation();
      const cat = +copyBtn.dataset.cat;
      const item = +copyBtn.dataset.item;
      const text = getContent(DATA.prompts[cat].items[item]);
      doCopy(text, copyBtn);
      return;
    }

    const promptHeader = e.target.closest('.prompt-header');
    if (promptHeader) {
      toggle(promptHeader);
      return;
    }

    const catHeader = e.target.closest('.category-header');
    if (catHeader) {
      toggle(catHeader);
    }
  }

  function toggle(headerEl) {
    const body = headerEl.nextElementSibling;
    const arrow = headerEl.querySelector('.arrow');
    const opening = body.hidden;
    body.hidden = !opening;
    arrow.textContent = opening ? '▼' : '▶';
  }

  function doCopy(text, btn) {
    const original = btn.dataset.orig || btn.textContent;
    btn.dataset.orig = original;

    const restore = () => {
      btn.textContent = original;
      btn.classList.remove('copied', 'failed');
    };
    const succeed = () => {
      btn.textContent = '已复制 ✓';
      btn.classList.remove('failed');
      btn.classList.add('copied');
      clearTimeout(btn._t);
      btn._t = setTimeout(restore, 2000);
    };
    const fail = () => {
      btn.textContent = '复制失败';
      btn.classList.remove('copied');
      btn.classList.add('failed');
      clearTimeout(btn._t);
      btn._t = setTimeout(restore, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(succeed, () => {
        legacyCopy(text) ? succeed() : fail();
      });
    } else {
      legacyCopy(text) ? succeed() : fail();
    }
  }

  function legacyCopy(text) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '0';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, text.length);
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      return false;
    }
  }

  function switchTab(name) {
    if (!TABS.includes(name)) return;
    document.querySelectorAll('.tab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === name);
    });
    document.querySelectorAll('.panel').forEach(p => {
      p.classList.toggle('active', p.id === name);
    });
    if (location.hash.slice(1) !== name) {
      history.replaceState(null, '', `#${name}`);
    }
  }

  function setupTabs() {
    document.querySelector('.tabs').addEventListener('click', (e) => {
      const t = e.target.closest('.tab');
      if (t) switchTab(t.dataset.tab);
    });
    window.addEventListener('hashchange', () => {
      const h = location.hash.slice(1);
      if (TABS.includes(h)) switchTab(h);
    });
  }

  function init() {
    renderFlatList('links', DATA.links);
    renderFlatList('communities', DATA.communities);
    renderPrompts();
    setupTabs();

    const hash = location.hash.slice(1);
    if (TABS.includes(hash)) switchTab(hash);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

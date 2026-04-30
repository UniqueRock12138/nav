(function () {
  'use strict';

  const TABS = ['prompts', 'forum', 'tutorial', 'docs'];

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function getContent(item) {
    const c = (typeof PROMPT_CONTENTS !== 'undefined') ? PROMPT_CONTENTS[item.contentId] : undefined;
    return (c === undefined) ? `[内容缺失：未在 prompts.js 中找到 contentId "${item.contentId}"]` : c;
  }

  function getContentById(contentId) {
    const c = (typeof PROMPT_CONTENTS !== 'undefined') ? PROMPT_CONTENTS[contentId] : undefined;
    return (c === undefined) ? `[内容缺失：未在 prompts.js 中找到 contentId "${contentId}"]` : c;
  }

  function normalizeContents(item) {
    if (item.contents && item.contents.length) return item.contents;
    return [{ label: null, contentId: item.contentId }];
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
    const domains = DATA.prompts || [];
    if (!domains.length) {
      el.innerHTML = '<div class="empty">暂无内容</div>';
      return;
    }
    el.innerHTML = domains.map(function(domain, di) {
      const cats = domain.categories || [];
      const categoriesHtml = cats.length ? cats.map(function(cat, ci) {
        const itemsHtml = (cat.items || []).map(function(item, j) {
          const contents = normalizeContents(item);
          const multi = contents.length > 1;
          const contentsHtml = contents.map(function(c, k) {
            const subLabel = multi ? '<div class="prompt-sub-label">' + escapeHtml(c.label || c.contentId) + '</div>' : '';
            return '<div class="prompt-content-wrap' + (multi ? ' prompt-content-wrap--multi' : '') + '">'
              + subLabel
              + '<pre class="prompt-content">' + escapeHtml(getContentById(c.contentId)) + '</pre>'
              + '<div class="prompt-copy-row">'
              + '<button class="copy-btn" data-domain="' + di + '" data-cat="' + ci + '" data-item="' + j + '" data-sub="' + k + '">复制</button>'
              + '</div>'
              + '</div>';
          }).join('');
          return '<div class="prompt-item">'
            + '<div class="prompt-header" data-domain="' + di + '" data-cat="' + ci + '" data-item="' + j + '">'
            + '<span class="arrow">▶</span>'
            + '<span class="prompt-title">' + escapeHtml(item.title) + '</span>'
            + '</div>'
            + '<div class="prompt-body" hidden>'
            + contentsHtml
            + '</div>'
            + '</div>';
        }).join('');
        return '<div class="category">'
          + '<div class="category-header" data-domain="' + di + '" data-cat="' + ci + '">'
          + '<span class="arrow">▶</span>'
          + '<span class="category-title">' + escapeHtml(cat.category) + '</span>'
          + '<span class="category-count">' + (cat.items || []).length + '</span>'
          + '</div>'
          + '<div class="category-body" hidden>'
          + itemsHtml
          + '</div>'
          + '</div>';
      }).join('') : '<div class="empty" style="padding:8px 16px 8px 24px">暂无内容</div>';

      return '<div class="domain">'
        + '<div class="domain-label">' + escapeHtml(domain.label) + '</div>'
        + categoriesHtml
        + '</div>';
    }).join('');

    el.addEventListener('click', onPromptsClick);
  }

  function onPromptsClick(e) {
    const copyBtn = e.target.closest('.copy-btn');
    if (copyBtn) {
      e.stopPropagation();
      const di = +copyBtn.dataset.domain;
      const ci = +copyBtn.dataset.cat;
      const itemIdx = +copyBtn.dataset.item;
      const subIdx = copyBtn.dataset.sub !== undefined ? +copyBtn.dataset.sub : 0;
      const item = DATA.prompts[di].categories[ci].items[itemIdx];
      const contents = normalizeContents(item);
      const text = getContentById(contents[subIdx].contentId);
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
    renderFlatList('forum', DATA.forum);
    renderFlatList('tutorial', DATA.tutorial);
    renderFlatList('docs', DATA.docs);
    renderPrompts();
    setupTabs();

    const hash = location.hash.slice(1);
    switchTab(TABS.includes(hash) ? hash : TABS[0]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

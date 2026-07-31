(function () {
  "use strict";

  const App = window.App = window.App || {};

  function getGroups(activeGroupId) {
    return (window.NAV_GROUPS || []).filter(function (group) {
      return !activeGroupId || group.id === activeGroupId;
    });
  }

  function renderLinkCard(item) {
    return [
      '<article class="link-card">',
      '  <a class="link-card__main" href="' + App.escapeHtml(item.url) + '" target="_blank" rel="noopener noreferrer">',
      '    <span class="link-card__title">' + App.escapeHtml(item.title) + '</span>',
      '    <p class="link-card__desc">' + App.escapeHtml(item.description || "") + '</p>',
      '    <span class="link-card__url">' + App.escapeHtml(item.url) + '</span>',
      "  </a>",
      '  <div class="link-card__actions">',
      '    <a class="btn btn--primary" href="' + App.escapeHtml(item.url) + '" target="_blank" rel="noopener noreferrer">打开</a>',
      '    <button class="btn" type="button" data-copy-url="' + App.escapeHtml(item.url) + '">复制链接</button>',
      "  </div>",
      "</article>"
    ].join("");
  }

  function renderGroup(group) {
    return [
      '<section class="nav-section" id="' + App.escapeHtml(group.id) + '">',
      '  <div class="section-header">',
      "    <div>",
      '      <h2 class="section-header__title">' + App.escapeHtml(group.title) + '</h2>',
      '      <p class="section-header__desc">' + App.escapeHtml(group.description || "") + '</p>',
      "    </div>",
      '    <span class="section-header__count">' + group.items.length + " 个</span>",
      "  </div>",
      '  <div class="card-grid">',
      group.items.map(renderLinkCard).join(""),
      "  </div>",
      "</section>"
    ].join("");
  }

  App.renderLinks = function renderLinks(containerId, activeGroupId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const groups = getGroups(activeGroupId);
    container.innerHTML = groups.map(renderGroup).join("");
    container.onclick = function (event) {
      const button = event.target.closest("[data-copy-url]");
      if (!button) return;
      App.copyText(button.dataset.copyUrl, button);
    };
  };
})();

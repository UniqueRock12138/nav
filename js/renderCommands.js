(function () {
  "use strict";

  const App = window.App = window.App || {};

  function getGroups(activeGroupId) {
    return (window.COMMAND_GROUPS || []).filter(function (group) {
      return !activeGroupId || group.id === activeGroupId;
    });
  }

  function renderCommandCard(item) {
    return [
      '<article class="command-card">',
      '  <div class="command-card__top">',
      '    <div>',
      '      <h3 class="command-card__title">' + App.escapeHtml(item.title) + '</h3>',
      '      <p class="command-card__desc">' + App.escapeHtml(item.description || "") + '</p>',
      "    </div>",
      "  </div>",
      '  <div class="code-row">',
      '    <code class="code-row__content">' + App.escapeHtml(item.command) + '</code>',
      '    <button class="btn" type="button" data-copy-command="' + App.escapeHtml(item.command) + '">复制</button>',
      "  </div>",
      "</article>"
    ].join("");
  }

  function renderGroup(group) {
    return [
      '<section class="section" id="command-' + App.escapeHtml(group.id) + '">',
      '  <div class="section-header">',
      "    <div>",
      '      <h2 class="section-header__title">' + App.escapeHtml(group.title) + '</h2>',
      '      <p class="section-header__desc">' + App.escapeHtml(group.description || "") + '</p>',
      "    </div>",
      '    <span class="section-header__count">' + group.items.length + " 条</span>",
      "  </div>",
      group.items.map(renderCommandCard).join(""),
      "</section>"
    ].join("");
  }

  App.renderCommands = function renderCommands(containerId, activeGroupId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const groups = getGroups(activeGroupId);
    container.innerHTML = groups.map(renderGroup).join("");
    container.onclick = function (event) {
      const button = event.target.closest("[data-copy-command]");
      if (!button) return;
      App.copyText(button.dataset.copyCommand, button);
    };
  };
})();

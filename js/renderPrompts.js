(function () {
  "use strict";

  const App = window.App = window.App || {};

  function normalizeContents(item) {
    if (item.contents && item.contents.length) return item.contents;
    return [{ label: null, contentId: item.contentId }];
  }

  function getContent(contentId) {
    const contents = window.PROMPT_CONTENTS || {};
    if (contents[contentId] === undefined) {
      return '[内容缺失：未找到 contentId "' + contentId + '"]';
    }
    return contents[contentId];
  }

  function itemMatches(query, group, category, item) {
    const contents = normalizeContents(item);
    const contentText = contents.map(function (content) {
      return [content.label, content.contentId, getContent(content.contentId)].join(" ");
    }).join(" ");

    return App.matchesQuery(query, [
      group.title,
      category.title,
      item.title,
      contentText
    ]);
  }

  function getGroups(query, activeGroupId) {
    return (window.PROMPT_GROUPS || []).filter(function (group) {
      return !activeGroupId || group.id === activeGroupId;
    }).map(function (group) {
      const categories = (group.categories || []).map(function (category) {
        const items = (category.items || []).filter(function (item) {
          return itemMatches(query, group, category, item);
        });
        return Object.assign({}, category, { items: items });
      }).filter(function (category) {
        return category.items.length > 0;
      });
      return Object.assign({}, group, { categories: categories });
    }).filter(function (group) {
      return group.categories.length > 0;
    });
  }

  function renderPromptContent(content, multi) {
    const label = multi
      ? '<p class="prompt-content-label">' + App.escapeHtml(content.label || content.contentId) + '</p>'
      : "";

    return [
      '<div class="prompt-content-block">',
      label,
      '<pre class="prompt-content">' + App.escapeHtml(getContent(content.contentId)) + '</pre>',
      '<div class="prompt-actions">',
      '<button class="btn" type="button" data-copy-content-id="' + App.escapeHtml(content.contentId) + '">复制</button>',
      "</div>",
      "</div>"
    ].join("");
  }

  function renderPromptItem(item) {
    const contents = normalizeContents(item);
    const multi = contents.length > 1;

    return [
      '<div class="prompt-item">',
      '  <button class="prompt-item__header" type="button" data-disclosure>',
      '    <span class="disclosure-icon">▶</span>',
      '    <span class="prompt-item__title">' + App.escapeHtml(item.title) + '</span>',
      "  </button>",
      '  <div class="prompt-item__body" hidden>',
      contents.map(function (content) {
        return renderPromptContent(content, multi);
      }).join(""),
      "  </div>",
      "</div>"
    ].join("");
  }

  function renderCategory(category) {
    return [
      '<div class="prompt-group">',
      '  <button class="prompt-group__header" type="button" data-disclosure>',
      '    <span class="disclosure-icon">▶</span>',
      '    <span class="prompt-group__title">' + App.escapeHtml(category.title) + '</span>',
      '    <span class="prompt-group__count">' + category.items.length + '</span>',
      "  </button>",
      '  <div class="prompt-group__body" hidden>',
      category.items.map(renderPromptItem).join(""),
      "  </div>",
      "</div>"
    ].join("");
  }

  function renderGroup(group) {
    const count = group.categories.reduce(function (sum, category) {
      return sum + category.items.length;
    }, 0);

    return [
      '<section class="section" id="prompt-' + App.escapeHtml(group.id) + '">',
      '  <div class="section-header">',
      "    <div>",
      '      <h2 class="section-header__title">' + App.escapeHtml(group.title) + '</h2>',
      '      <p class="section-header__desc">按分类保存可复制的 LLM 提示词。</p>',
      "    </div>",
      '    <span class="section-header__count">' + count + " 条</span>",
      "  </div>",
      group.categories.map(renderCategory).join(""),
      "</section>"
    ].join("");
  }

  function toggleDisclosure(button) {
    const body = button.nextElementSibling;
    const icon = button.querySelector(".disclosure-icon");
    if (!body) return;

    const open = body.hidden;
    body.hidden = !open;
    if (icon) icon.textContent = open ? "▼" : "▶";
  }

  App.renderPrompts = function renderPrompts(containerId, query, activeGroupId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const groups = getGroups(query, activeGroupId);
    if (!groups.length) {
      container.innerHTML = '<div class="empty-state">没有匹配的提示词</div>';
      return;
    }

    container.innerHTML = groups.map(renderGroup).join("");
    container.onclick = function (event) {
      const copyButton = event.target.closest("[data-copy-content-id]");
      if (copyButton) {
        App.copyText(getContent(copyButton.dataset.copyContentId), copyButton);
        return;
      }

      const disclosure = event.target.closest("[data-disclosure]");
      if (disclosure) {
        toggleDisclosure(disclosure);
      }
    };
  };
})();

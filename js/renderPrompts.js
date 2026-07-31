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

  function getGroups(activeGroupId) {
    return (window.PROMPT_GROUPS || []).filter(function (group) {
      return !activeGroupId || group.id === activeGroupId;
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

  function renderGroup(group) {
    return [
      '<section class="section" id="prompt-' + App.escapeHtml(group.id) + '">',
      '  <div class="section-header">',
      "    <div>",
      '      <h2 class="section-header__title">' + App.escapeHtml(group.title) + '</h2>',
      '      <p class="section-header__desc">展开条目查看原文，复制按钮只复制对应提示词。</p>',
      "    </div>",
      '    <span class="section-header__count">' + group.items.length + " 条</span>",
      "  </div>",
      group.items.map(renderPromptItem).join(""),
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

  App.renderPrompts = function renderPrompts(containerId, activeGroupId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const groups = getGroups(activeGroupId);
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

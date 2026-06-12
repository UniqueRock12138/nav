(function () {
  "use strict";

  const App = window.App = window.App || {};

  App.escapeHtml = function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
      }[char];
    });
  };

  App.normalizeText = function normalizeText(value) {
    return String(value == null ? "" : value).toLowerCase().trim();
  };

  // 按空格分词，每个词都要在条目的任意字段中出现（词间 AND，字段间 OR）
  App.matchesQuery = function matchesQuery(query, values) {
    const tokens = App.normalizeText(query).split(/\s+/).filter(Boolean);
    if (!tokens.length) return true;
    const haystack = values.map(App.normalizeText).join(" ");
    return tokens.every(function (token) {
      return haystack.includes(token);
    });
  };

  function setActiveTopNav() {
    const current = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav-link]").forEach(function (link) {
      const href = link.getAttribute("href");
      const target = href ? href.split("#")[0] : "";
      link.classList.toggle("is-active", target === current || (current === "" && target === "index.html"));
    });
  }

  function setActiveSidebarLink(hash) {
    document.querySelectorAll("[data-sidebar-link]").forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === hash);
    });
  }

  function initSearch(onInput) {
    const input = document.getElementById("page-search");
    if (!input) return;
    input.addEventListener("input", function () {
      onInput(input.value);
    });
  }

  function getSearchQuery() {
    const input = document.getElementById("page-search");
    return input ? input.value : "";
  }

  // 工具箱 hash 解析：每次只显示一个分组，旧锚点映射到各模块第一个分组
  function parseToolsHash() {
    const hash = location.hash;
    if (hash === "#commands") return { module: "commands", group: "linux", hash: "#command-linux" };
    if (hash.indexOf("#command-") === 0) {
      return { module: "commands", group: hash.slice("#command-".length), hash: hash };
    }
    if (hash.indexOf("#prompt-") === 0) {
      return { module: "prompts", group: hash.slice("#prompt-".length), hash: hash };
    }
    return { module: "prompts", group: "engineering", hash: "#prompt-engineering" };
  }

  function initToolsPage() {
    const promptsSection = document.getElementById("prompts");
    const commandsSection = document.getElementById("commands");

    function render() {
      const active = parseToolsHash();
      const query = getSearchQuery();
      const searching = App.normalizeText(query) !== "";

      // 搜索时跨全部分组匹配；非搜索状态只显示当前分组
      if (promptsSection) promptsSection.hidden = !searching && active.module !== "prompts";
      if (commandsSection) commandsSection.hidden = !searching && active.module !== "commands";

      if (App.renderPrompts && (searching || active.module === "prompts")) {
        App.renderPrompts("prompts-root", query, searching ? null : active.group);
      }
      if (App.renderCommands && (searching || active.module === "commands")) {
        App.renderCommands("commands-root", query, searching ? null : active.group);
      }
      setActiveSidebarLink(active.hash);
    }

    initSearch(render);
    window.addEventListener("hashchange", render);
    render();
  }

  function initNavPage() {
    function render() {
      const groups = window.NAV_GROUPS || [];
      const groupId = location.hash.slice(1);
      const exists = groups.some(function (group) { return group.id === groupId; });
      const activeId = exists ? groupId : (groups.length ? groups[0].id : "");
      const query = getSearchQuery();
      const searching = App.normalizeText(query) !== "";

      // 搜索时跨全部分组匹配；非搜索状态只显示当前分组
      if (App.renderLinks) App.renderLinks("nav-root", query, searching ? null : activeId);
      setActiveSidebarLink("#" + activeId);
    }

    initSearch(render);
    window.addEventListener("hashchange", render);
    render();
  }

  function init() {
    setActiveTopNav();

    const page = document.body.dataset.page;
    if (page === "tools") {
      initToolsPage();
      return;
    }
    if (page === "nav") {
      initNavPage();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

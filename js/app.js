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

  function getActiveGroupId(groups, prefix, defaultId) {
    const hash = location.hash;
    const requestedId = hash.indexOf(prefix) === 0 ? hash.slice(prefix.length) : defaultId;
    const exists = groups.some(function (group) {
      return group.id === requestedId;
    });
    return exists ? requestedId : defaultId;
  }

  function initGroupedPage(options) {
    function render() {
      const groups = options.getGroups();
      const activeId = getActiveGroupId(groups, options.hashPrefix, options.defaultId);

      if (options.render) options.render(options.containerId, activeId);
      setActiveSidebarLink(options.hashPrefix + activeId);
    }

    window.addEventListener("hashchange", render);
    render();
  }

  function init() {
    setActiveTopNav();

    const page = document.body.dataset.page;
    if (page === "prompts") {
      initGroupedPage({
        containerId: "prompts-root",
        hashPrefix: "#prompt-",
        defaultId: "meta",
        getGroups: function () { return window.PROMPT_GROUPS || []; },
        render: App.renderPrompts
      });
      return;
    }
    if (page === "commands") {
      initGroupedPage({
        containerId: "commands-root",
        hashPrefix: "#command-",
        defaultId: "linux",
        getGroups: function () { return window.COMMAND_GROUPS || []; },
        render: App.renderCommands
      });
      return;
    }
    if (page === "nav") {
      initGroupedPage({
        containerId: "nav-root",
        hashPrefix: "#",
        defaultId: "news",
        getGroups: function () { return window.NAV_GROUPS || []; },
        render: App.renderLinks
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

(function () {
  "use strict";

  const App = window.App = window.App || {};

  function legacyCopy(text) {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.top = "0";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, text.length);
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      return ok;
    } catch (error) {
      return false;
    }
  }

  App.copyText = function copyText(text, button) {
    const original = button.dataset.originalText || button.textContent;
    button.dataset.originalText = original;

    function restore() {
      button.textContent = original;
      button.classList.remove("copied", "failed");
    }

    function succeed() {
      button.textContent = "已复制";
      button.classList.remove("failed");
      button.classList.add("copied");
      clearTimeout(button._copyTimer);
      button._copyTimer = setTimeout(restore, 1600);
    }

    function fail() {
      button.textContent = "复制失败";
      button.classList.remove("copied");
      button.classList.add("failed");
      clearTimeout(button._copyTimer);
      button._copyTimer = setTimeout(restore, 1600);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(succeed, function () {
        legacyCopy(text) ? succeed() : fail();
      });
      return;
    }

    legacyCopy(text) ? succeed() : fail();
  };
})();

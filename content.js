// content.js
// Runs in the context of the webpage that the user is viewing.
// Meant to enable typewriter scrolling in Google Docs.

const enableTypewriterScrolling = () => {
  let scrollTimeout;
  let lastCursorTop = 0;

  const scrollToCenter = () => {
    const editor = document.querySelector(".kix-appview-editor");
    const cursor = document.querySelector(".kix-cursor-caret");

    if (editor && cursor) {
      const cursorRect = cursor.getBoundingClientRect();
      const editorRect = editor.getBoundingClientRect();
      const offset = cursorRect.top - editorRect.top;
      const scrollTop = editor.scrollTop;
      const desiredScrollTop = scrollTop + offset - editorRect.height / 2;

      if (cursorRect.top !== lastCursorTop) {
        editor.scrollTo({ top: desiredScrollTop, behavior: "smooth" });
        lastCursorTop = cursorRect.top;
      }
    } else {
      console.warn("Editor or cursor element not found.");
    }
  };

  const debouncedScrollToCenter = () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
      requestAnimationFrame(scrollToCenter);
    }, 100);
  };

  const setupObserver = () => {
    const editor = document.querySelector(".kix-appview-editor");
    if (editor) {
      const cursorObserver = new MutationObserver(debouncedScrollToCenter);
      cursorObserver.observe(editor, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });
    } else {
      console.warn("Editor element not found.");
    }
  };

  window.addEventListener("load", setupObserver);
};

enableTypewriterScrolling();

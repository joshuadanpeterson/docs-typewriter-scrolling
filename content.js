// content.js
// Runs in the context of the webpage that the user is viewing.
// Meant to enable typewriter scrolling in Google Docs.

const enableTypewriterScrolling = () => {
  let scrollTimeout;

  const scrollToCenter = () => {
    const editor = document.querySelector(".kix-appview-editor");
    const cursor = document.querySelector(".kix-cursor-caret");

    if (editor && cursor) {
      const cursorRect = cursor.getBoundingClientRect();
      const editorRect = editor.getBoundingClientRect();
      const offset = cursorRect.top - editorRect.top;
      const scrollTop = editor.scrollTop;
      const desiredScrollTop = scrollTop + offset - editorRect.height / 2;

      editor.scrollTo({ top: desiredScrollTop, behavior: "smooth" });
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
      const observer = new MutationObserver(debouncedScrollToCenter);
      observer.observe(editor, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    } else {
      console.warn("Editor element not found.");
    }
  };

  window.addEventListener("load", setupObserver);
  document.addEventListener("keydown", debouncedScrollToCenter);
  document.addEventListener("click", debouncedScrollToCenter);
};

enableTypewriterScrolling();

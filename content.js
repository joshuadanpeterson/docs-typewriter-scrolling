// content.js
// content.js
// Runs in the context of the webpage that the user is viewing.
// Meant to enable typewriter scrolling in Google Docs.

const enableTypewriterScrolling = () => {
  let scrollTimeout; // Variable to store the timeout ID for debouncing
  let lastCursorTop = 0; // Variable to store the last known cursor position

  // Function to center the cursor in the editor
  const scrollToCenter = () => {
    // Select the editor and cursor elements within the Google Docs iframe
    const editor = document.querySelector(".kix-appview-editor");
    const cursor = document.querySelector(".kix-cursor-caret");

    if (editor && cursor) {
      // Get the bounding rectangles of the cursor and editor
      const cursorRect = cursor.getBoundingClientRect();
      const editorRect = editor.getBoundingClientRect();
      // Calculate the offset of the cursor from the top of the editor
      const offset = cursorRect.top - editorRect.top;
      // Calculate the desired scroll position to center the cursor
      const scrollTop = editor.scrollTop;
      const desiredScrollTop = scrollTop + offset - editorRect.height / 2;

      // Check if the cursor position has changed
      if (cursorRect.top !== lastCursorTop) {
        // Scroll the editor to the desired position
        editor.scrollTo({ top: desiredScrollTop, behavior: "smooth" });
        // Update the last known cursor position
        lastCursorTop = cursorRect.top;
      }
    } else {
      console.warn("Editor or cursor element not found."); // Warn if elements are not found
    }
  };

  // Debounced version of the scrollToCenter function
  const debouncedScrollToCenter = () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout); // Clear the previous timeout if it exists
    }
    // Set a new timeout to call scrollToCenter after 100ms
    scrollTimeout = setTimeout(() => {
      requestAnimationFrame(scrollToCenter); // Use requestAnimationFrame for smoother scrolling
    }, 100);
  };

  // Setup a MutationObserver to watch for changes in the editor
  const setupObserver = () => {
    const editor = document.querySelector(".kix-appview-editor");
    if (editor) {
      // Create a new MutationObserver that calls the debounced scroll function
      const cursorObserver = new MutationObserver(debouncedScrollToCenter);
      // Observe changes in the editor's child elements, attributes, and character data
      cursorObserver.observe(editor, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });
    } else {
      console.warn("Editor element not found."); // Warn if the editor element is not found
    }
  };

  // Add an event listener to set up the observer when the window loads
  window.addEventListener("load", setupObserver);
};

// Call the function to enable typewriter scrolling
enableTypewriterScrolling();

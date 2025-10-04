// content.js
// content.js
// Runs in the context of the webpage that the user is viewing.
// Meant to enable typewriter scrolling in Google Docs.

const enableTypewriterScrolling = () => {
  let scrollTimeout; // Variable to store the timeout ID for debouncing
  let lastCursorTop = 0; // Variable to store the last known cursor position
  let autoScrollEnabled = true; // Variable to track if auto-scroll is enabled


  // Function to toggle auto-scroll on/off
  const toggleAutoScroll = () => {
    autoScrollEnabled = !autoScrollEnabled;
    console.log("Auto-scroll", autoScrollEnabled ? "ENABLED" : "DISABLED");
    
    // Show visual feedback
    const editor = document.querySelector(".kix-appview-editor");
    if (editor) {
      // Create or update status indicator
      let indicator = document.getElementById("typewriter-scroll-indicator");
      if (!indicator) {
        indicator = document.createElement("div");
        indicator.id = "typewriter-scroll-indicator";
        indicator.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: ${autoScrollEnabled ? "#4CAF50" : "#f44336"};
          color: white;
          padding: 8px 16px;
          border-radius: 4px;
          font-family: Arial, sans-serif;
          font-size: 14px;
          z-index: 10000;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
        `;
        document.body.appendChild(indicator);
      }
      
      indicator.textContent = `Typewriter Scroll: ${autoScrollEnabled ? "ON" : "OFF"}`;
      indicator.style.background = autoScrollEnabled ? "#4CAF50" : "#f44336";
      
      // Hide indicator after 2 seconds
      setTimeout(() => {
        if (indicator) {
          indicator.style.opacity = "0";
          setTimeout(() => {
            if (indicator && indicator.parentNode) {
              indicator.parentNode.removeChild(indicator);
            }
          }, 300);
        }
      }, 2000);
    }
  };

  // Function to center the cursor in the editor
  const scrollToCenter = () => {
    // Only scroll if auto-scroll is enabled
    if (!autoScrollEnabled) {
      return;
    }

    // Select the editor and cursor elements within the Google Docs iframe
    const editor = document.querySelector(".kix-appview-editor");
    const cursor = document.querySelector(".kix-cursor-caret");

    if (editor && cursor) {
      // Get the bounding rectangles of the cursor and editor
      const cursorRect = cursor.getBoundingClientRect();
      const editorRect = editor.getBoundingClientRect();
      // Calculate the offset of the cursor from the top of the editor
      const offset = cursorRect.top - editorRect.top + 150;
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

  // Listen for messages from background script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleAutoScroll") {
      toggleAutoScroll();
    }
  });

  // Add padding to the document, so also on the last page, we have enough space to scroll.
  const addDocumentPadding = () => {
    const scrollArea = document.querySelector(".kix-scrollareadocumentplugin");
    if (scrollArea) {
      scrollArea.style.paddingBottom = "50vh";
      console.log("Added 50vh padding to document");
    } else {
      console.log("Scroll area element not found");
    }
  };

  // Add event listener when the window loads
  window.addEventListener("load", () => {
    setupObserver();
    addDocumentPadding();
  });
};

// Call the function to enable typewriter scrolling
enableTypewriterScrolling();

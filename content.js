// content.js
// Runs in the context of the webpage that the user is viewing.

const enableTypewriterScrolling = () => {
  document.addEventListener("keydown", (event) => {
    const activeElement = document.activeElement;

    if (activeElement && activeElement.tagName === "BODY") {
      // Calculate the position for typewriter scrolling
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = document.documentElement.scrollTop;
      const elementRect = activeElement.getBoundingClientRect();

      const desiredScrollPosition =
        scrollTop + elementRect.top - clientHeight / 2 + elementRect.height / 2;

      if (
        desiredScrollPosition < scrollHeight - clientHeight &&
        desiredScrollPosition > 0
      ) {
        window.scrollTo({
          top: desiredScrollPosition,
          behavior: "smooth",
        });
      }
    }
  });
};

enableTypewriterScrolling();

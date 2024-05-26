// background.js is a script that runs in the background of the browser.
// It listens for events that occur in the browser,
// such as the installation of an extension or a user clicking on the extension icon.
// In this case, we are using background.js to listen for the installation of the extension.

chrome.runtime.onInstalled.addListener(() => {
  console.log("Typewriter Scrolling extension installed");
});

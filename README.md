# Google Docs Typewriter Scrolling Extension

This is a Chrome extension that enables typewriter-style scrolling in Google Docs. When activated, the extension automatically scrolls the page to keep the cursor at the center of the screen as you type or move the cursor within the document.

## Features

- Automatic scrolling: The extension automatically scrolls the page to keep the cursor centered vertically in the editor.
- Smooth scrolling: The scrolling behavior is smooth and seamless, providing a pleasant typing experience.
- Cursor movement detection: The extension detects cursor movement and triggers the scrolling accordingly.
- Debounced scrolling: The scrolling function is debounced to avoid excessive scrolling during rapid cursor movements.

## Installation

To install the Google Docs Typewriter Scrolling Extension, follow these steps:

1. Download the extension files from the repository.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click on "Load unpacked" and select the directory containing the extension files.
5. The extension should now be loaded and active in Chrome.

## Usage

Once the extension is installed, it will automatically enable typewriter scrolling in Google Docs. Simply open a Google Docs document and start typing or moving the cursor. The page will scroll smoothly to keep the cursor at the center of the screen.

If you encounter any issues or the extension doesn't work as expected, please refer to the troubleshooting section below.

## Troubleshooting

If the typewriter scrolling functionality doesn't work or you experience any issues, try the following:

- Refresh the Google Docs page and ensure that the extension is still active.
- Check the browser console for any error messages or warnings related to the extension.
- Verify that the Google Docs editor and cursor elements are accessible using the selectors `.kix-appview-editor` and `.kix-cursor-caret`, respectively. If the selectors have changed, update them in the extension code.
- Disable any other extensions that may interfere with the functionality of this extension.

If the issue persists, please open an issue on the GitHub repository with a detailed description of the problem and any relevant information.

## Contributing

Contributions to the Google Docs Typewriter Scrolling Extension are welcome! If you find any bugs, have suggestions for improvements, or want to add new features, please open an issue or submit a pull request on the GitHub repository.

When contributing, please ensure that your code follows the existing coding style and conventions. Also, provide a clear description of the changes made and the problem they solve.

## License

This extension is open-source and released under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

## Acknowledgements

This extension was developed with the help of the OpenAI Assistant, which provided guidance and code snippets throughout the development process.

## Contact

If you have any questions, suggestions, or feedback regarding the Google Docs Typewriter Scrolling Extension, please feel free to open an issue.

Enjoy the typewriter scrolling experience in Google Docs!

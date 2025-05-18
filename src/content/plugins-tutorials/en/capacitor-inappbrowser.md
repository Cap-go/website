---
locale: en
---
# @capgo/inappbrowser Package Tutorial

The `@capgo/inappbrowser` package is a Capacitor plugin that allows you to open a URL in an in-app browser window. Here's a step-by-step guide on how to use this package:

## Installation

To install the package, run the following command in your project's root directory:

```bash
npm install @capgo/inappbrowser
npx cap sync
```

## Usage

1. Import the `InAppBrowser` class from the `@capgo/inappbrowser` package:

   ```javascript
   import { InAppBrowser } from '@capgo/inappbrowser';
   ```

2. Use the `InAppBrowser.open` method to open a URL in a new fullscreen window:

   ```javascript
   InAppBrowser.open("YOUR_URL");
   ```

   Replace `"YOUR_URL"` with the URL you want to open.

3. You can also use other methods provided by the `InAppBrowser` class:

   - `clearCookies`: Clear all cookies.
   - `close`: Close the in-app browser window.
   - `openWebView`: Open a URL in a new webview with toolbars.
   - `setUrl`: Set the URL of the in-app browser.

   Refer to the API section below for more details on these methods.

## API

The `@capgo/inappbrowser` package provides the following API methods:

- `open(options: OpenOptions)`: Open a URL in a new fullscreen window. Takes an `OpenOptions` object as a parameter.
- `clearCookies()`: Clear all cookies.
- `close()`: Close the in-app browser window.
- `openWebView(options: OpenWebViewOptions)`: Open a URL in a new webview with toolbars. Takes an `OpenWebViewOptions` object as a parameter.
- `setUrl(options: { url: string; })`: Set the URL of the in-app browser. Takes an object with a `url` property as a parameter.
- `addListener('urlChangeEvent', listenerFunc: UrlChangeListener)`: Listen for URL change events. Takes a `UrlChangeListener` function as a parameter.
- `addListener('closeEvent', listenerFunc: UrlChangeListener)`: Listen for close events. Takes a `UrlChangeListener` function as a parameter.
- `addListener('confirmBtnClicked', listenerFunc: UrlChangeListener)`: Listen for confirm button click events. Takes a `UrlChangeListener` function as a parameter.
- `removeAllListeners()`: Remove all event listeners.

For more information on the parameters and return values of these methods, refer to the package documentation.

And that's it! You've learned how to use the `@capgo/inappbrowser` package to open URLs in an in-app browser window in Capacitor. Happy coding!

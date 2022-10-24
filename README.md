# blueshell-demo

Node (typescript) app that demonstrates basic usage of the [blueshell](https://github.com/6RiverSystems/blueshell) behavior tree library. Both browser-based and node.js sample apps are provided. 
All examples use a shared behavior tree implementation in [behavior-tree.ts](src/behavior-tree.ts)

## Browser sample

Code is in [browser.ts](src/browser.ts).

To build and run:

```bash
npm run install
npm run webpack-serve-browser
```

* This should cause Chrome to open to the app immediately, which is served at: `http://localhost:9000/browser/`

* Open the dev console. In Chrome, right click on the page > Inspect > Console tab.

* Clicking the button will trigger a `valueChanged` event.

![blueshell-demo in browser](doc/browser.gif)

## Browser Webworker sample

* Very similar to the single-threaded browser sample above, but this time the behavior tree code runs in a separate [web worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).
* Code is in [webworker-browser.ts](src/webworker-browser.ts) and [webworker-worker.ts](src/webworker-worker.ts)


To build and run:

```bash
npm run install
npm run webpack-serve-webworker
```


## Node.js sample

* Code is in [browser.ts](src/browser.ts)


To build and run:

```bash
npm install
npn run build
npm run start
```

* Pressing any key will trigger a `valueChanged` event.  

* Press Ctrl-C to exit.

![blueshell-demo in node.js](doc/node.gif)
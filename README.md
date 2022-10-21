# blueshell-demo

Node (typescript) app that demonstrates basic usage of the [blueshell](https://github.com/6RiverSystems/blueshell) behavior tree library. Both browser-based and node.js sample apps are provided. 


## Browser sample

* Code is in [browser.ts](src/browser.ts)
* Uses a shared behavior tree implementation in [behavior-tree.ts](src/behavior-tree.ts)

### Run it

```bash
npm install
npm run build
```

* Now, open **Chrome** (or your preferred web browser) to 'dist.index.html'. For example: `file:///Users/cody/git/blueshell-demo/dist/index.html`.

* Open the dev console. In Chrome, right click on the page > Inspect > Console tab.

* Clicking the button will trigger a `valueChanged` event.

![blueshell-demo in browser](doc/browser.gif)

## Node.js sample

* Code is in [browser.ts](src/browser.ts)
* Uses a shared behavior tree implementation in [behavior-tree.ts](src/behavior-tree.ts)

### Run it

```bash
npm install
npn run build
npm run start
```

* Pressing any key will trigger a `valueChanged` event.  

* Press Ctrl-C to exit.

![blueshell-demo in node.js](doc/node.gif)
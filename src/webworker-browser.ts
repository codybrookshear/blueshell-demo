import * as browser_common from './browser-common';

if (window.Worker) {
    const myWorker = new Worker('worker-bundle.js');

    document.body.appendChild(browser_common.content(btnOnClick));

    myWorker.onmessage = (e) => {
        //e.data[0] : AppState, e.data[1] : AppEvent
        console.log(e.data[1].desc + ': ' + e.data[0].value + " " + e.data[0].alarm);
    }

    function btnOnClick() {
        myWorker.postMessage([Math.random()])
    }
}
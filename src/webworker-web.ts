import * as web_common from './web-common';

if (window.Worker) {
    const myWorker = new Worker('worker-bundle.js');

    document.body.appendChild(web_common.content(btnOnClick));

    myWorker.onmessage = (e) => {
        document.body.append(e.data[1].desc + ': ' + e.data[0].value + " " + e.data[0].alarm);
        document.body.append(document.createElement('br'));
    }

    function btnOnClick() {
        myWorker.postMessage([Math.random()])
    }
}
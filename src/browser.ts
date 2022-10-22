//import { BehaviorTreeRunner } from './behavior-tree';

//const btr = new BehaviorTreeRunner();

if (window.Worker) {
    const myWorker = new Worker('./behavior-tree.bundle.js');

    document.body.appendChild(content());

    myWorker.onmessage = (e) => {
        console.log(e);
    }

    function content() {
        const element = document.createElement('div');
        const btn = document.createElement('button');
        btn.innerHTML = 'Keep clicking me and check the dev console';
        btn.onclick = btnOnClick;
        element.appendChild(btn);

        return element;
    }

    function btnOnClick() {
        //btr.dataReceived(Math.random());
        myWorker.postMessage([Math.random()])
    }
}
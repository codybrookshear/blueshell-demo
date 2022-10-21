import { BehaviorTreeRunner } from './behavior-tree';

const btr = new BehaviorTreeRunner();

document.body.appendChild(content());

function content() {
    const element = document.createElement('div');
    const btn = document.createElement('button');
    btn.innerHTML = 'Keep clicking me and check the dev console';
    btn.onclick = btnOnClick;
    element.appendChild(btn);

    return element;
}

function btnOnClick() {
    btr.dataReceived(Math.random());
}
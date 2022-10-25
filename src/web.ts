import { BehaviorTreeRunner } from './behavior-tree';
import * as web_common from './web-common';

const btr = new BehaviorTreeRunner();

document.body.appendChild(web_common.content(btnOnClick));

function btnOnClick() {
    btr.dataReceived(Math.random());
}

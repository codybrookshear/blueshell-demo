import { BehaviorTreeRunner } from './behavior-tree';
import * as browser_common from './browser-common';

const btr = new BehaviorTreeRunner();

document.body.appendChild(browser_common.content(btnOnClick));

function btnOnClick() {
    btr.dataReceived(Math.random());
}

import * as readline from 'readline';
import { BehaviorTreeRunner } from './behavior-tree';


const btr = new BehaviorTreeRunner();

// each key press on stdin simulates a state change
console.log('Press keys => random state changes')
handleInput();

function handleInput()
{
    readline.emitKeypressEvents(process.stdin);

    if (process.stdin.isTTY)
        process.stdin.setRawMode(true);

    process.stdin.on('keypress', (str: string, key: any) => {

        if (key && key.ctrl && key.name == 'c')
        {
            process.kill(process.pid, 'SIGINT');
        }

        btr.dataReceived(Math.random());
    });
}
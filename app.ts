import * as Blueshell from 'blueshell';
import * as readline from 'readline';

class AppState implements Blueshell.BlueshellState {
    public value: number = 0;
	public success: boolean = false;
	public failure: boolean = false;
	public errorReason?: Error;
	public __blueshell: any;
}

class AppEvent {
    constructor(public desc: string = "") {}
}

//interface AppAction extends Blueshell.Action<AppState, AppEvent> {};

export type AppAction = Blueshell.BaseNode<AppState, AppEvent>;

const successAction = new (class extends Blueshell.Action<AppState, AppEvent> {
    onEvent(state: AppState) {
        state.success = true;

        return Blueshell.rc.SUCCESS;
    }
})();

const failureAction = new (class extends Blueshell.Action<AppState, AppEvent> {
    onEvent(state: AppState) {
        state.failure = true;

        return Blueshell.rc.FAILURE;
    }
})();


const state = new AppState();

let behavior : Blueshell.ParentNode<AppState, AppEvent> = new Blueshell.Selector<AppState, AppEvent>('baseNode', [
    new Blueshell.IfElse('testIfElse',
				(state) => {
                    return (state.value > 0.5)
                },
				successAction,
				//failureAction
			)
    ])

// run-time error with this line. The ParentNode automatically gets registered for debug it seems
// Blueshell.Action.registerNodeForDebug(behavior);

// debug server runs on ws://localhost:8990 (not for human consumption)
Blueshell.NodeManager.reset();
Blueshell.NodeManager.getInstance().runServer();

// log events
let lastPublishStr = "";
const publisher = {
    publishResult(_state: any, _event: any, _topLevel: boolean ) {
        // we get a separate event for each variable that changes in _state!
        const newStr = _event.desc + ": " + _state.value + " " + _state.success;
        if (lastPublishStr !== newStr) {
            console.log(newStr);
            lastPublishStr = newStr;
        }
    },
    configure(_options: object) {},
} as Blueshell.TreePublisher<any, any>;

Blueshell.Action.registerTreePublisher(publisher);

// each key press on stdin simulates a state change
readline.emitKeypressEvents(process.stdin);
handleInput();

function handleInput()
{
    if (process.stdin.isTTY)
        process.stdin.setRawMode(true);

    process.stdin.on('keypress', (str: string, key: any) => {

        if (key && key.ctrl && key.name == 'c')
        {
            process.kill(process.pid, 'SIGINT');
        }

        state.value = Math.random();
        const res = behavior.handleEvent(state, new AppEvent('valueChanged'));
    });
}
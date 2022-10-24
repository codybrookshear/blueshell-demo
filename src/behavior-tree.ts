import * as Blueshell from 'blueshell';

class AppState implements Blueshell.BlueshellState {
    public value: number = 0;
	public alarm: boolean = false;
	public errorReason?: Error;
	public __blueshell: any;
}

class AppEvent {
    constructor(public desc: string = "") {}
}

class SuccessAction extends Blueshell.Action<AppState, AppEvent> {
    onEvent(state: AppState) {
        state.alarm = true;

        return Blueshell.rc.SUCCESS;
    }
};

class FailureAction extends Blueshell.Action<AppState, AppEvent> {
    onEvent(state: AppState) {
        state.alarm = false;

        return Blueshell.rc.FAILURE;
    }
};

export class ConsolePublisher implements Blueshell.TreePublisher<AppState, AppEvent> {
    
    private lastAlarm = false;

    publishResult(_state: AppState, _event: AppEvent, _topLevel: boolean ) {
        // we get a separate event for each variable that changes in _state;
        // but we only log if alarm changed
        if (this.lastAlarm !== _state.alarm) {
            console.log(_event.desc + ": " + _state.value + " " + _state.alarm);
            this.lastAlarm = _state.alarm;
        }
    };

    configure(_options: object) {};
};

export class PostPublisher implements Blueshell.TreePublisher<AppState, AppEvent> {
    
    private lastAlarm = false;

    publishResult(_state: AppState, _event: AppEvent, _topLevel: boolean ) {
        // we get a separate event for each variable that changes in _state;
        // but we only log if alarm changed
        if (this.lastAlarm !== _state.alarm) {
            this.lastAlarm = _state.alarm;
            postMessage([_state, _event]);
        }
    };

    configure(_options: object) {};
};

export class BehaviorTreeRunner {
    private state = new AppState();

    private behavior : Blueshell.ParentNode<AppState, AppEvent> = new Blueshell.Selector<AppState, AppEvent>('baseNode', [
        new Blueshell.IfElse('testIfElse',
            (state) => {
                return (state.value > 0.5)
            },
            new SuccessAction(),
            new FailureAction(),
        )
    ]);

    constructor(publisher : Blueshell.TreePublisher<AppState, AppEvent> = new ConsolePublisher()) {

        Blueshell.Action.registerTreePublisher(publisher);
    }

    public dataReceived(data: number) {
        this.state.value = data;
        this.behavior.handleEvent(this.state, new AppEvent('valueChanged'));  
    }
}

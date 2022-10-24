import { BehaviorTreeRunner, PostPublisher } from './behavior-tree';

const btr = new BehaviorTreeRunner(new PostPublisher());

onmessage = (e) => {
    btr.dataReceived(e.data);
}
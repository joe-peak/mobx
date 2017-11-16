import React from 'react';
import ReactDOM from 'react-dom';
import { observable, autorun, action, extendObservable, computed } from 'mobx';
import { observer } from 'mobx-react';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// @observer
class Todo {
    id = Math.random();
    constructor() {
        extendObservable(this, {
            title: 'hahah',
            finished: false,
            // 有效的计算属性
            get foo() {
                //...
            },
            // 有效的计算属性
            bar: computed(() => {
                //...
            })
        });
    }
    // @observable title = "hahah";
    // @observable finished = false;
}

let todo = new Todo();
autorun(() => {
    console.log('autorun:',todo.finished, todo.title);
});

setTimeout(() => {
    todo.finished = true;
    todo.title = 'JOE';
}, 2000);

// const appState = observable({
//     time: 0
// });
// 与上面写法等价
const appState = observable.object({
    timer: 0
});


@observer
class TimerView extends React.Component {
    @computed get foo() {
        return this.props.appState.timer*2;
    }

    @computed get bar() {
        return this.foo;
    }

    reset = () => {
        this.props.appState.resetTime();
    }

    render() {
        return (
            <div>
                <button onClick={this.reset}>Seconds passed:{this.props.appState.timer} </button>
                <div>
                    {this.bar}
                </div>
            </div>
        );
    }
}

appState.resetTime = () => { 
    appState.timer = 0;
};

setInterval(() => {
    appState.timer ++;
}, 1000);

const todoStore = observable({
    todos: [],
    // 计算属性
    get completedCount() {
        return this.todos.filter(todo => todo.done).length;
    }
});

const todoMap = observable(new Map());
todoMap.set('name', 'joe');
/* 观察状态改变的函数 */
autorun(() => {
    console.log("Completed %d of %d items", todoStore.completedCount, todoStore.todos.length);
    // 3s后输出为undefined
    console.log(todoMap.get('name'));
});

setTimeout(() => {
    todoStore.todos[0] = {};
    todoStore.todos[0].done = true;
    // 删除对象属性不会有触发reaction 
    delete todoStore.todos[0].done;
    todoMap.delete('name');
}, 3000);

const map = observable.map({ 'name': 'Dennis' });
map.set('key', 'value');

// const list = observable([1, 2, 300]);
const list = observable.array([1, 2, 300]);
list[2] = 3;
console.log('$$$$', map.get('key'));

const name = observable('Dennis');
const UpperName = computed(() => {
    return name.get().toUpperCase();
});

UpperName.observe(change => {
    console.log(change.newValue);
});

ReactDOM.render(<TimerView appState={appState}/>, document.getElementById('root'));
registerServiceWorker();

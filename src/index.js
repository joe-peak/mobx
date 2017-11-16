import React from 'react';
import ReactDOM from 'react-dom';
import { observable, autorun, action, extendObservable, computed, isObservableArray, whyRun } from 'mobx';
import { observer } from 'mobx-react';
// import Devtools from 'mobx-react-devtools';
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
// class Todo {
//     id = Math.random();
//     @observable title = "";
//     @observable todolist = [];
//     @observable finished = false;
//     @computed get unfinishedTodoCount() {
//         return todolist.filter(item => !item.done).length;
//     }
// }

// function ToDoItem () {
//     extendObservable(this, {
//         title: 'Mobx',
//         finished: false
//     });
// }

// @observer
class TodoList extends React.Component {
    @observable todos = [];
    @computed get undoTasksCount() {
         return this.todos.filter(todo => !todo.done).length;
    }
}

const timerData  =  observable.object({
    passedSeconds: 0
});

timerData.reset = () => {
    timerData.passedSeconds = 0;
};

setInterval(() => {
    timerData.passedSeconds++;
}, 1000);

// observer(class)
// const Timer = observer(class Timer extends React.Component {
//     reset = () => {
//         this.props.timerData.reset();
//     }

//     render() {
//        return (<div>
//             <button onClick = {this.reset}>RESET</button>
//             <div>There has passed {this.props.timerData.passedSeconds} seconds</div>
//        </div>);
//     }
// });

// @observer
// class Timer extends React.Component {
//     reset = () => {
//         this.props.timerData.reset();
//     }

//     render() {
//        return (<div>
//             <button onClick = {this.reset}>RESET</button>
//             <div>There has passed {this.props.timerData.passedSeconds} seconds</div>
//        </div>);
//     }
// }

// 无状态函数组件
// const Timer = observer(props => {
//     const reset = () => {
//         props.timerData.reset();
//     }
//     return (<div>
//             <button onClick = {reset}>RESET</button>
//             <div>There has passed {props.timerData.passedSeconds} seconds</div>
//        </div>);
// });

@observer
class Timer extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.passedSeconds = 0;
    // }
    @observable passedSeconds = 0;
    reset = () => {
        this.passedSeconds = 0;
    }

    render() {
       return (<div>
            <button onClick = {this.reset}>RESET</button>
            <div>There has passed {this.passedSeconds} seconds</div>
            {/*<Devtools/>*/}
            </div>
       )
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.passedSeconds++;
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    componentWillReact() {
        console.log('1111');
    }
}

const observableArr = observable.array([1, 2, 3, 4]);
// 
console.log('----observable.array----');
console.log(observableArr); // false
console.log(Array.isArray(observableArr));
// observable数组转换为普通的js数组
console.log(Array.isArray(observableArr.slice())); //true
console.log(Array.isArray(observableArr.toJS())); //true
console.log(Array.isArray(Array.from(observableArr))); //true
console.log(Array.isArray(observableArr.peek())); //true

// isObservableArray检测是否是
console.log('-----isObservableArray-----');
const plainArr = [1, 2, 3,];
console.log(isObservableArray(plainArr)); // false 
console.log(isObservableArray(observableArr));

const foo = observable.object({
    name: 'JOE'
});

autorun(() => {
    console.log(`The is changed: ${foo.name} and the sex is ${foo.sex}`);
    whyRun();
});

setTimeout(() => {
    foo.name = 'Dennis';
}, 3000);




// ReactDOM.render(<Timer timerData={timerData} />, document.getElementById('root'));
ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();

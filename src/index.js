import React from 'react';
import ReactDOM from 'react-dom';
import { observable, extendObservable, computed } from 'mobx';
import { observer } from 'mobx-react';
import Devtools from 'mobx-react-devtools';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// @observer
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
            <Devtools/>
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

ReactDOM.render(<Timer  timerData = {timerData}/>, document.getElementById('root'));
registerServiceWorker();

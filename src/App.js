import React, { Component } from 'react';
import { observable, autorun, action, extendObservable, computed, isObservableArray, whyRun } from 'mobx';
import { observer } from 'mobx-react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const sleep = (fn, time) => {
    setTimeout(fn, time);
};

const message = observable.object({
    title: 'Test',
    author: {
        name: 'Dennis'
    },
    likes: [
        'Jone', 'Sara'
    ]
});

const fooArr = observable([1, 2, 3, 4]);
console.log('**********');
console.log(Array.isArray(Array.from(fooArr)));
const reverseArr = fooArr.reverse(fooArr);
console.log(reverseArr);
const title = message.title;
autorun(() => {
    console.log(`#######${message.title}#######`);

    // 在跟踪函数外间接引用不能被观察
    // console.log(`#######${title}#######`);
});

// setTimeout(() => {
//     message.title = 'Joe';
// }, 2000);

// setTimeout(() => {
//     // 改变了message的引用，message只是存放引用的变量，不能变成可观察的
//     message = observable({
//         title: 'Huge'
//     });
// }, 2000);
sleep(() => { 
    message.title = 'Steven';
});
console.log('--------分割线--------');
export default App;
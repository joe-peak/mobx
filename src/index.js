import React from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// @observer
class Todo {
    id = Math.random();
    @observable title = "";
    @observable finished = false;
}
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

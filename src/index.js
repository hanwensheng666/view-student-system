import React from 'react';
import ReactDOM from 'react-dom';
import {support_webp} from '@/basic/utils'

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
import './App.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
window.is_support_webp = support_webp(); // 检测浏览器是否支持 webp 格式图片


ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();



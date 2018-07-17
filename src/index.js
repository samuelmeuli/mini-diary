import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import './styles/styles.scss';

// Create 'root' div and render React app inside it
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);
ReactDOM.render(<App />, root);

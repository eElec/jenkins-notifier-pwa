import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import db, { Job } from './db';
import registerSW from './sW';
import registerServiceWorker from './sW';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

registerServiceWorker();

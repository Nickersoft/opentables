import React from 'react';
import ReactDOM from 'react-dom';

import { App } from 'alg-containers';

if (module.hot) module.hot.accept();

ReactDOM.hydrate(<App />, document.getElementById('root'));

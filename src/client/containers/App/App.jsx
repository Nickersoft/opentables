import React, { PureComponent } from 'react';

// Even though it is unused in this file,
// importing the global styles ensures they appear inside the app
// So don't remove it.
import Styles from './App.scss';

import { Window } from 'alg-containers';

/**
 * App
 * ===
 * Main app entry point
 */
class App extends PureComponent {
  /**
   * Render method
   *
   * @returns {*}
   */
  render() {
    return <Window />;
  }
}

export default App;

import React, { PureComponent } from 'react';
import classnames from 'classnames';

import Styles from './EmptyState.scss';

/**
 * EmptyState
 * ==========
 * Empty state for when no results are returned
 */
class EmptyState extends PureComponent {
  /**
   * Render method
   *
   * @returns {*}
   */
  render() {
    return (
      <div className={Styles.container}>
        <i className={classnames('fa fa-frown-o', Styles.icon)} />
        <h1 className={Styles.header}>Aw, shucks</h1>
        <p className={Styles.body}>
          We couldn't find what you were looking for. Perhaps try the full{' '}
          <a href="https://opentable.com" target="_blank">
            OpenTable website
          </a>{' '}
          instead?
        </p>
      </div>
    );
  }
}

export default EmptyState;

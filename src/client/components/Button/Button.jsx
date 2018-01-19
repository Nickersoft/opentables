import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Styles from './Button.scss';

/**
 * Button
 * ======
 * Button component used for "Show More" and other actions
 */
class Button extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string
  };

  /**
   * Render method
   *
   * @returns {*}
   */
  render() {
    const { children, className, onClick } = this.props;
    return (
      <a href="javascript:void(0)" onClick={onClick} className={classnames(Styles.button, className)}>
        {children}
      </a>
    );
  }
}

export default Button;

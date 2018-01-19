import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Styles from './Loader.scss';

/**
 * Loader
 * ======
 * Ajax loader lifted directly from the Algolia dashboard and React-ified
 */
class Loader extends PureComponent {
  static propTypes = {
    size: PropTypes.number,
    colored: PropTypes.bool,
    className: PropTypes.string
  };

  static defaultProps = {
    size: 18,
    colored: false,
    className: ''
  };

  /**
   * Render method
   *
   * @returns {*}
   */
  render() {
    const { size, colored } = this.props;
    const color = colored ? '#7885bf' : '#333';

    return (
      <div style={{ color, width: size, height: size }} className={classnames(Styles.loader, this.props.className)}>
        <svg
          width={38}
          height={38}
          viewBox={`0 0 38 38`}
          style={{ stroke: color }}
          xmlns="http://www.w3.org/2000/svg"
          stroke="#fff">
          <g transform="translate(1 1)" strokeWidth="2" fill="none" fillRule="evenodd">
            <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18" />
          </g>
        </svg>
      </div>
    );
  }
}

export default Loader;

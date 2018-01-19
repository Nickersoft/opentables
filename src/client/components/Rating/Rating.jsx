import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Styles from './Rating.scss';

/**
 * Rating
 * ======
 * Starred-rating component that appears as a part of the Result component
 * Includes graphical stars, numerical stars, and number of reviews
 */
class Rating extends PureComponent {
  static propTypes = {
    stars: PropTypes.number,
    reviews: PropTypes.number,
    basic: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func
  };

  static defaultProps = {
    stars: 1,
    reviews: 1,
    basic: false,
    className: '',
    onClick: () => null
  };

  /**
   * Render method
   *
   * @returns {*}
   */
  render() {
    let { basic, onClick, className, stars, reviews } = this.props;

    if (stars > 5) {
      console.warn('Number of rating stars cannot be over 5. Defaulting to 5.');
      stars = 5;
    }

    if (stars < 1) {
      console.warn('Number of rating stars cannot be less than 1. Defaulting to 1.');
      stars = 1;
    }

    return (
      <div onClick={onClick} className={classnames(Styles.rating, className)}>
        {!basic && <span>{stars}</span>}
        <div className={Styles.stars}>
          <div className={Styles.star} />
          <div className={classnames(Styles.star, Styles.filled)} style={{ width: 81 / 5 * stars }} />
        </div>
        {!basic && `${reviews} reviews`}
      </div>
    );
  }
}

export default Rating;

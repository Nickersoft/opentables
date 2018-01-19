import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Rating } from 'alg-components';

import Styles from './Result.scss';

/**
 * Result
 * ======
 * Search result item
 */
class Result extends PureComponent {
  static propTypes = {
    image: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    priceRange: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    stars: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    reviews: PropTypes.number.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  /**
   * Navigates to the booking URL associated with this result
   *
   * @returns {Window | null}
   */
  navigate = () => window.open(this.props.url);

  /**
   * Render method
   *
   * @returns {*}
   */
  render() {
    const { image, area, type, name, className, priceRange, reviews, stars } = this.props;
    return (
      <div className={classnames(Styles.item, className)} onClick={::this.navigate}>
        <div
          className={Styles.image}
          style={{
            backgroundImage: `url(${image})`
          }}
        />
        <div className={Styles.content}>
          <h2>{name}</h2>
          <Rating stars={stars} reviews={reviews} />
          <div className={Styles.info}>
            {type} | {area} | {priceRange}
          </div>
        </div>
      </div>
    );
  }
}

export default Result;

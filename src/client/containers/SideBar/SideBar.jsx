import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';

import { Rating, Facet } from 'alg-components';

import Styles from './SideBar.scss';

const itemType = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string,
    count: PropTypes.number,
    isRefined: PropTypes.bool,
    isExcluded: PropTypes.bool
  })
);

/**
 * SideBar
 * =======
 * SideBar component where all filtering options appear
 */
class SideBar extends PureComponent {
  static propTypes = {
    foods: PropTypes.arrayOf(itemType),
    ratings: PropTypes.arrayOf(itemType),
    payment: PropTypes.arrayOf(itemType),
    addRefinement: PropTypes.func,
    removeRefinement: PropTypes.func,
    refineRating: PropTypes.func
  };

  static defaultProps = {
    foods: [],
    ratings: [],
    payment: [],
    refine: () => null
  };

  /**
   * Filters the available rating facets into whole numbers only, makes sure there are
   * only distinct values, and sorts them in descending order
   *
   * @returns {Array}
   */
  getSortedDistinctRatings() {
    const { facets } = this.props;
    const { ratings } = facets;

    const roundedDown = ratings.map(x => {
      x.name = x.name.split('.')[0];
      return x;
    });

    const unique = _.uniqBy(roundedDown, 'name');
    const sorted = _.orderBy(unique, 'name', 'desc');

    return sorted;
  }

  /**
   * Render method
   *
   * @returns {*}
   */
  render() {
    const { facets, refineRating, addRefinement, removeRefinement } = this.props;
    const { foods, payment } = facets;

    const ratings = this.getSortedDistinctRatings();
    const paymentBlacklist = ['Cash Only', 'Pay with OpenTable', 'JCB'];

    return (
      <div className={Styles.sidebar}>
        {foods.length > 0 && (
          <Facet.Text
            title="Cuisine/Food Type"
            name="food_type"
            addRefinement={addRefinement}
            removeRefinement={removeRefinement}
            data={foods}
          />
        )}
        {ratings.length > 0 && <Facet.Rating title="Ratings" name="stars_count" refine={refineRating} data={ratings} />}
        {payment.length > 0 && (
          <Facet.Text
            title="Payment Method"
            name="payment_options"
            addRefinement={addRefinement}
            removeRefinement={removeRefinement}
            blacklist={paymentBlacklist}
            synonyms={{
              Discover: ['Carte Blanche', 'Diners Club']
            }}
            data={payment}
          />
        )}
      </div>
    );
  }
}

export default SideBar;

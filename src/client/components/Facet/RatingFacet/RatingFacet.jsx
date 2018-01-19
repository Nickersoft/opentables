import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Rating } from 'alg-components';

import Styles from './RatingFacet.scss';

/**
 * RatingFacet
 * ===========
 * Used to display rating facet filters in the sidebar
 */
class RatingFacet extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        count: PropTypes.number,
        isRefined: PropTypes.bool,
        isExcluded: PropTypes.bool
      })
    ),
    refine: PropTypes.func,
    name: PropTypes.string
  };

  static defaultProps = {
    items: [],
    refine: () => null
  };

  /**
   * Local method for calling the parent refine() method, ultimately setting the facet toggle
   * Requires a nested function in order to avoid local function declaration during render
   *
   * @param value Facet value to submit (in this case, number of stars)
   * @returns {function()}
   */
  refineRatingValue = value => () => this.props.refine(value);

  /**
   * Renders a facet filter item
   *
   * @param name        Name/value to display for the item
   * @param count       Available results categorized under facet
   * @param isRefined   Denotes whether facet is currently enabled
   * @param index       Item index
   * @returns {*}
   */
  renderItem = ({ name, count, isRefined }, index) => {
    const stars = parseInt(name);
    const styles = classnames(Styles.ratingItem, { [`${Styles.active}`]: isRefined });

    return <Rating key={index} basic className={styles} stars={stars} onClick={::this.refineRatingValue(stars)} />;
  };

  /**
   * Render method
   *
   * @returns {*}
   */
  render() {
    const { title, data } = this.props;
    const items = data.map(::this.renderItem);

    return (
      <div>
        <h1 className={Styles.header}>{title}</h1>
        <div className={Styles.list}>{items}</div>
      </div>
    );
  }
}

export default RatingFacet;

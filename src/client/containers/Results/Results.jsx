import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import $ from 'jquery';

import { Button, Loader, Result } from 'alg-components';

import Styles from './Results.scss';

/**
 * Results
 * =======
 * Container for all search results
 */
class Results extends PureComponent {
  static propTypes = {
    nextPage: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    hits: PropTypes.array.isRequired,
    time: PropTypes.number.isRequired,
    hasMore: PropTypes.bool
  };

  static defaultProps = {
    hits: [],
    count: 0,
    time: 0,
    nextPage: () => null,
    hasMore: false
  };

  constructor(props) {
    super(props);
    this.trackScrolling.bind(this);
  }

  /**
   * Renders a result item
   *
   * @param food_type       Type of food/cuisine
   * @param stars_count     Number of rating stars
   * @param area            Area of the city
   * @param name            Name of the restaurant
   * @param reviews_count   Number of reviews
   * @param image_url       URL of the display image
   * @param price_range     String representation of price range
   * @param reserve_url     URL to make reservation
   * @param index           Item index
   * @returns {*}
   */
  renderResult({ food_type, stars_count, area, name, reviews_count, image_url, price_range, reserve_url }, index) {
    return (
      <Result
        key={index}
        type={food_type}
        area={area}
        className={Styles.result}
        name={name}
        stars={parseInt(stars_count)}
        image={image_url}
        priceRange={price_range}
        reviews={parseInt(reviews_count)}
        url={reserve_url}
      />
    );
  }

  /**
   * Tracks the scrolling of the list so we can add more results when the user reaches the bottom
   */
  trackScrolling = () => {
    const { listNode, props } = this;
    const { nextPage } = props;
    const offset = $(listNode).scrollTop() + $(listNode).innerHeight();

    if (offset >= this.listNode.scrollHeight) nextPage();
  };

  /**
   * Assigns the ref of the result list as well as its DOM node to `this`
   * @param view
   */
  handleListRef = view => {
    this.listRef = view;
    this.listNode = ReactDOM.findDOMNode(view);
  };

  /**
   * Bindings that occur when the component mounts
   */
  componentDidMount() {
    this.listNode.addEventListener('scroll', this.trackScrolling);
  }

  /**
   * Bindings that are removed when the component unmounts
   */
  componentWillUnmount() {
    this.listNode.removeEventListener('scroll', this.trackScrolling);
  }

  /**
   * Render method
   *
   * @returns {*}
   */
  render() {
    const { hits, count, time, hasMore } = this.props;

    const formattedCount = count.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    const formattedTime = (time / 1000).toString();

    return (
      <div className={Styles.results}>
        <div className={Styles.header}>
          <div className={Styles.text}>
            <strong>{formattedCount} results found</strong> in {formattedTime} seconds
          </div>
        </div>
        <div ref={::this.handleListRef} className={Styles.list}>
          {hits.map(this.renderResult)}
          {hasMore && <Loader className={Styles.loader} />}
        </div>
      </div>
    );
  }
}

export default Results;

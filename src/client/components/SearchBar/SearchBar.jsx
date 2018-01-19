import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Styles from './SearchBar.scss';

/**
 * SearchBar
 * =========
 * Search bar used for all Algolia searches
 */
class SearchBar extends PureComponent {
  static propTypes = {
    onKeyUp: PropTypes.func
  };

  /**
   * Render method
   *
   * @returns {*}
   */
  render() {
    const { onKeyUp } = this.props;

    return (
      <div className={Styles.searchBar}>
        <i className={classnames('fa fa-search', Styles.icon)} />
        <input
          onKeyUp={onKeyUp}
          type="text"
          placeholder="Search Here for Restaurants by Name, Cuisine, Location"
          className={Styles.search}
        />
        <a href="https://algolia.com" target="_blank">
          <img className={Styles.logo} src={require('alg-assets/images/algolia.svg')} />
        </a>
      </div>
    );
  }
}

export default SearchBar;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';

import Styles from './TextFacet.scss';

/**
 * TextFacet
 * =========
 * Used to display textual facet filters in the sidebar
 * Consists of a title and a list of available filter items
 */
class TextFacet extends Component {
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
    synonyms: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    blacklist: PropTypes.arrayOf(PropTypes.string),
    addRefinement: PropTypes.func,
    removeRefinement: PropTypes.func,
    name: PropTypes.string
  };

  static defaultProps = {
    items: [],
    synonyms: {},
    blacklist: [],
    refine: () => null
  };

  state = {
    showAll: false
  };

  /**
   * Local method for calling setting the facet filter
   * Requires a nested function in order to avoid local function declaration during render
   *
   * @param value Facet value to submit
   * @returns {function()}
   */
  refineSearch = (value, isRefined) => () => {
    const { addRefinement, removeRefinement, synonyms } = this.props;
    const callback = isRefined ? removeRefinement : addRefinement;

    if (_.has(synonyms, value)) {
      callback(this.props.name, value, ...synonyms[value]);
    } else {
      callback(this.props.name, value);
    }
  };

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
    const styles = classnames(Styles.listItem, { [`${Styles.active}`]: isRefined });

    return (
      <div key={index} className={styles} onClick={::this.refineSearch(name, isRefined)}>
        <div className={Styles.name}>{name}</div>
        <div className={Styles.count}>{count}</div>
      </div>
    );
  };

  /**
   * Toggles whether all items should show up at once (if there are more than 6 items)
   */
  toggleShowAll = () => {
    this.setState({
      showAll: !this.state.showAll
    });
  };

  /**
   * Render method
   *
   * @returns {*}
   */
  render() {
    const { title, data: originalData, blacklist: originalBlacklist, synonyms } = this.props;
    const { showAll } = this.state;

    const blacklist = [...originalBlacklist, ...[].concat(...Object.values(synonyms))];

    // Remove data that's on the blacklist
    const data = originalData.filter(x => !blacklist.includes(x.name)).map(x => {
      // Group result counts of synonyms into their parent facet
      if (_.has(synonyms, x.name))
        synonyms[x.name].forEach(val => {
          const synonymData = originalData.find(x => x.name == val);

          if (synonymData) {
            x.count += synonymData.count;
          }
        });
      return x;
    });

    // Get our base item components
    let items = data.map(::this.renderItem);

    // Calculate whether any need to be hidden, and if so add Show Less/More label
    if (data.length > 6) {
      const label = showAll ? 'Show Less' : 'Show More';
      items = (
        <>
          {showAll ? data.map(::this.renderItem) : data.slice(0, 6).map(::this.renderItem)}
          <a href="javascript:void(0)" onClick={::this.toggleShowAll} className={Styles.label}>
            {label}
          </a>
        </>
      );
    }

    return (
      <div>
        <h1 className={Styles.header}>{title}</h1>
        <div className={Styles.list}>{items}</div>
      </div>
    );
  }
}

export default TextFacet;

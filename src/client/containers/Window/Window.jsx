import React, { Component } from 'react';
import algoliasearchHelper from 'algoliasearch-helper';

import { client, index } from 'alg-config';

import { Button, EmptyState, SearchBar, Loader, Result } from 'alg-components';
import { SideBar, Results } from 'alg-containers';

import Styles from './Window.scss';

/**
 * Window
 * ======
 * Main application window
 * The majority of all state management occurs here
 */
class Window extends Component {
  state = {
    loading: true,
    results: [],
    query: '',
    pageCount: 0,
    time: 0,
    hitCount: 0,
    currentPage: 0,
    facets: {
      foods: [],
      ratings: [],
      payment: []
    }
  };

  newSearch = true;

  /**
   * Establishes the global Algolia helper and listeners, as well as executes the initial empty query
   *
   * @param props
   */
  constructor(props) {
    super(props);

    this.helper = algoliasearchHelper(client, 'Restaurants', {
      disjunctiveFacets: ['food_type', 'payment_options'],
      facets: ['stars_count'],
      aroundLatLngViaIP: true
    });

    this.helper.on('result', content => {
      const getFacet = this.getFacetValues(content);

      this.setState({
        time: content.processingTimeMS,
        results: this.newSearch ? content.hits : [...this.state.results, ...content.hits],
        currentPage: content.page,
        loading: false,
        pageCount: content.nbPages,
        hitCount: content.nbHits,
        facets: {
          foods: getFacet('food_type'),
          ratings: content
            .getFacetValues('stars_count', {
              sortBy: ['count:asc']
            })
            .map(x => {
              x.isRefined = this.helper.hasRefinements('stars_count');
              return x;
            }),
          payment: getFacet('payment_options')
        }
      });
    });

    this.helper.search();
  }

  getFacetValues = content => name =>
    content.getFacetValues(name, {
      sortBy: ['count:desc']
    });

  /**
   * Top-level search refinement method that applies a disjunctive filter for given values
   *
   * @param facetName     Facet name
   * @param facetValues   Facet values
   */
  addRefinement(facetName, ...facetValues) {
    this.newSearch = true;

    facetValues.forEach(value => {
      this.helper.addDisjunctiveFacetRefinement(facetName, value).search();
    });
  }

  /**
   * Top-level search refinement method that removes a facet filters for a given value
   *
   * @param facetName     Facet name
   * @param facetValues   Facet values
   */
  removeRefinement(facetName, ...facetValues) {
    this.newSearch = true;

    facetValues.forEach(value => {
      this.helper.removeDisjunctiveFacetRefinement(facetName, value).search();
    });
  }

  /**
   * Top-level search refinement method specifically for filtering rating ranges
   *
   * @param value
   */
  toggleRatingRefinement(value) {
    const facet = 'stars_count';

    this.newSearch = true;

    if (this.helper.hasRefinements(facet)) {
      this.helper.removeNumericRefinement(facet).search();
    } else {
      this.helper
        .addNumericRefinement(facet, '>=', value)
        .addNumericRefinement(facet, '<', value + 1)
        .search();
    }
  }

  /**
   * onKeyUp callback method for executing an Algolia search
   *
   * @param event `onKeyUp` (or other) input SyntheticEvent
   */
  search(event) {
    const query = event.target.value;

    this.newSearch = true;
    this.setState({
      query
    });

    this.helper
      .setQuery(query)
      .setPage(0)
      .setQueryParameter('hitsPerPage', 10)
      .search();
  }

  /**
   * Callback method for loading the next page of search results
   */
  next() {
    this.newSearch = false;
    this.helper.setPage(this.state.currentPage + 1).search();
  }

  /**
   * Render method
   *
   * @returns {*}
   */
  render() {
    const { results, facets, currentPage, pageCount, hitCount, time } = this.state;
    return this.state.loading ? (
      <Loader className={Styles.loader} colored />
    ) : (
      <div className={Styles.window}>
        <SearchBar onKeyUp={::this.search} />
        {hitCount === 0 ? (
          <EmptyState />
        ) : (
          <>
            <SideBar
              addRefinement={::this.addRefinement}
              removeRefinement={::this.removeRefinement}
              refineRating={::this.toggleRatingRefinement}
              facets={facets}
            />
            <Results
              count={hitCount}
              hits={results}
              nextPage={::this.next}
              time={time}
              hasMore={currentPage < pageCount - 1}
            />
          </>
        )}
      </div>
    );
  }
}

export default Window;

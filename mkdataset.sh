#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/lib/sync');
const merge = require('lodash/merge');

/**
 * Merges two array of objects based on a given property
 * Modifies the first array
 *
 * @param array1
 * @param array2
 */
function mergeObjectArrays(array1, array2, property) {
  array1.forEach(element => {
    const id = element[property];
    const matches = array2.filter(x => x[property] == id);

    merge(element, ...matches);
  });
}

// Helper functions to access the root data directory
const getDataFilePath = name => path.join(__dirname, `./data/${name}`);
const readDataFile = name => fs.readFileSync(getDataFilePath(name), 'utf8');

// Read the JSON and CSV files we already have
const list = JSON.parse(readDataFile('restaurants_list.json'));
const info = parse(readDataFile('restaurants_info.csv'), {
  delimiter: ';',
  columns: true
});

// Merge the two arrays
mergeObjectArrays(list, info, 'objectID');

const dest = getDataFilePath('restaurants_all.json');
const output = JSON.stringify(
  list.map(x => {
    // Convert numeric fields to floats right off the bat,
    // so we don't have to parse them later
    x.stars_count = parseFloat(x.stars_count);
    x.reviews_count = parseInt(x.reviews_count);
    return x;
  })
);

// Write to file
fs.writeFileSync(dest, output);
console.log(`Successfully wrote JSON data to ${dest}`);

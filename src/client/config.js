import algoliasearch from 'algoliasearch';

const applicationID = '1EZ6LWEWGP';
const apiKey = '79c16d7eee65d05e46ccb1c7e573ccac';
const index = 'Restaurants';
const client = algoliasearch(applicationID, apiKey);

export { applicationID, apiKey, index, client };

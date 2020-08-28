/* eslint-disable @typescript-eslint/no-var-requires */
require('../../scripts/ts-node')
const { withIslandIs } = require('@island.is/webpack')

// These modules need to be transpiled for IE11 support. This is not ideal,
// we should aim to drop IE11 support, or only use dependencies that have
// ES5 code (optionally plus ES6 module syntax).
const transpileModules = [
  'templite', // used by rosetta.
  '@sindresorhus/slugify',
  '@sindresorhus/transliterate', // Used by slugify.
  'escape-string-regexp', // Used by slugify.
]
const withTM = require('next-transpile-modules')(transpileModules)

const { API_URL = 'http://localhost:4444' } = process.env
const graphqlPath = '/api/graphql'

module.exports = withIslandIs(
  withTM({
    cssModules: false,
    serverRuntimeConfig: {
      // Will only be available on the server side
      // Requests made by the server are internal request made directly to the api hostname
      graphqlEndpoint: `${API_URL}${graphqlPath}`,
    },
    publicRuntimeConfig: {
      // Will be available on both server and client
      graphqlEndpoint: graphqlPath,
    },
  }),
)

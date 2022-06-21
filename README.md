# Equips take home

## Task

Create a GraphQl wrapper for an existing API.

## Implementation

My approach was to create a simple GraphQL controller that would handle the existing API. The idea is to delegate the API call to a GraphQL resolver and schema. The data is routed to the route '/graphql', where the graphiql interface can be used to query the data with GraphQL.

The existing API also has support for query parameters, so to incorporate that functionality, the GraphQL resolver has been built to process GraphQL query parameters and take advantage of the underlying design of the existing API. It does this by passing the parameters from GraphQL to a utility function, which then converts them to a URL that is to be used to fetch the data.

## Other considerations

To keep the time spent on the project short, I've specifically selected random query attributes to demonstrate a working product. Also, given the GraphQL spec, filtered results will return null values. A way around this may have been to conditionally transform the schema based on certain query parameters.

## Tools used

- GraphQL
- TypeScript
- Jest
- Express
- Express-graphql
- Axios

## Getting started

In the root directory:

```
npm install
```

After installation:

```
npm run start
```

With the server running, head over to http://localhost:5001/graphql to test some queries.

## Tests

Some tests are included to cover basic functionality of the wrapper and any supporting utilities.

To run the tests:

```
npm run test
```

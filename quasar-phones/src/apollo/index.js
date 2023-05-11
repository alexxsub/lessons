import { createHttpLink, InMemoryCache } from '@apollo/client/core'
export /* async */ function getClientOptions(/* {app, router, ...} */ options) {
  return Object.assign(
    // General options.
    {
      link: createHttpLink({
        uri:
          process.env.GRAPHQL_URI ||
          // Change to your graphql endpoint.
          'http://localhost:9000/graphql',
      }),
      cache: new InMemoryCache(),
    },

  )
}

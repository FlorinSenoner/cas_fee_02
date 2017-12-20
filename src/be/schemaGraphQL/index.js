/** @format */

const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

// Define your types here.
const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
    postedBy: User
    votes: [Vote!]!
  }
  
  type User {
    id: ID!
    name: String!
    email: String
    votes: [Vote!]!
  }
  
  type SigninPayload {
    token: String
    user: User
  }
  
  type Vote {
    id: ID!
    user: User!
    link: Link!
  }
  
  input AuthProviderSignupData {
    email: AUTH_PROVIDER_EMAIL
  }
  
  input AUTH_PROVIDER_EMAIL {
    email: String!
    password: String!
  }
  
  type Subscription {
    Link(filter: LinkSubscriptionFilter): LinkSubscriptionPayload
  }
  
  input LinkSubscriptionFilter {
    mutation_in: [_ModelMutationType!]
  }
  
  type LinkSubscriptionPayload {
    mutation: _ModelMutationType!
    node: Link
  }
  
  enum _ModelMutationType {
    CREATED
    UPDATED
    DELETED
  }

  type Query {
    allLinks(filter: LinkFilter, skip: Int, limit: Int): [Link!]!
  }
  
  input LinkFilter {
    OR: [LinkFilter!]
    description: String
    url: String
  }
  
  type Mutation {
    createLink(url: String!, description: String!): Link
    createVote(linkId: ID!): Vote
    createUser(name: String!, authProvider: AuthProviderSignupData!): User
    signinUser(email: AUTH_PROVIDER_EMAIL): SigninPayload!
  }
`

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({ typeDefs, resolvers })

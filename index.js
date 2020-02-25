const { ApolloServer, gql } = require('apollo-server');
const contents = require('./src/content/json/content.json');

const typeDefs = gql`

type Content {
  content: String
  data: Data
  isEmpty: Boolean
  excerpt: String
}

type Data {
  type: String
  title: String
  author: String
  date: String
  categories: [String]
  tags: [String]
}

type Query {
  contents: [Content]
  content(type:String!): [Content]
}
`;

const resolvers = {
  Query: {
    // posts: () => posts,
    // pages: () => pages,
    // pageByTitle: (parent, args, context, info) => {
    //   return pages.filter(page => args.title === page.attributes.title)
    // },
    contents: () => contents,
    content: (parent, args, context, info) => {
      return contents.filter(contentItem => args.type === contentItem.data.type)
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
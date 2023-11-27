import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

import { projects, clients } from "../sampleData.js";

//client type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

//project type
const ProjectType = new GraphQLObjectType({
  name: "project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve(_, __) {
        return clients;
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return clients.find((client) => client.id === args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(_, __) {
        return projects;
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return projects.find((project) => project.id === args.id);
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});

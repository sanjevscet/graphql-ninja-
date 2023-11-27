import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

import { projects, clients } from "../sampleData.js";

import { ProjectModel } from "../models/Project.js";
import { ClientModel } from "../models/client.js";

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
    client: {
      type: ClientType,
      resolve(parent, _) {
        return ClientModel.findById(parent.clientId);
      },
    },
  }),
});

// Queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve(_, __) {
        return ClientModel.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return ClientModel.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(_, __) {
        return ProjectModel.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return ProjectModel.findById(args.id);
      },
    },
  },
});

// Mutations

const RootMutations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // create a new client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const { name, email, phone } = args;
        const client = new ClientModel({
          name,
          email,
          phone,
        });

        return client.save();
      },
    },
    // delete client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(_, args) {
        return await ClientModel.findByIdAndDelete(args.id);
      },
    },
    // add a project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const { name, description, status, clientId } = args;
        const project = new ProjectModel({
          name,
          description,
          status,
          clientId,
        });

        return project.save();
      },
    },
    // update a project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(_, args) {
        const { name, description, status, clientId, id } = args;
        return await ProjectModel.findByIdAndUpdate(
          id,
          {
            $set: {
              name,
              description,
              status,
              clientId,
            },
          },
          { new: true }
        );
      },
    },
  },
});

export const mongoSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutations,
});

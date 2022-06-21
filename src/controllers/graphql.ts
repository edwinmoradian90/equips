import institutions from '../services/institutions';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { TParams } from '../types/institutions';

export const schema = buildSchema(`
    type Query {
        institutions(
            filters: String, 
            search: String, 
            fields: String, 
            sort_by: String,
            sort_order: String
            limit: Int,
            offset: Int,
            format: String,
            download: String,
            filename: String
        ): [Institution]
    }

    type InstitutionData {
        ZIP: String
        ACTIVE: String
        ADDRESS: String
        CITY: String
        COUNTY: String
        NAME: String
        OFFICES: Int
    }

    type Institution {
        data: InstitutionData! 
        score: Int!
    }
`);

export const root = {
  institutions: async (params: TParams) => await institutions.getAll(params),
};

export const graphqlController = graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
});

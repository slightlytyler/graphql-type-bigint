import { graphql, GraphQLObjectType, GraphQLSchema } from 'graphql';

import GraphQLBigint from '../src';

const FIXTURE = 9007199254740990;

describe('GraphQLBigint', () => {
  let schema;

  beforeEach(() => {
    schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'Query',
        fields: {
          value: {
            type: GraphQLBigint,
            args: {
              arg: {
                type: GraphQLBigint,
              },
            },
            resolve: (obj, { arg }) => arg,
          },
        },
      }),
    });
  });

  describe('serialize', () => {
    it('should support serialization', () => {
      expect(GraphQLBigint.serialize(FIXTURE)).toEqual(FIXTURE);
    });
  });

  describe('parse', () => {
    it('should support parsing values', async () => {
      const res = await graphql(
        schema,
        'query ($arg: Bigint!) { value(arg: $arg) }',
        null,
        null,
        {
          arg: FIXTURE,
        },
      );
      expect(res.data.value).toEqual(FIXTURE);
    });
  });
});

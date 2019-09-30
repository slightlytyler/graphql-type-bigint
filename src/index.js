import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const { INT } = Kind;

const MAX_INT = Number.MAX_SAFE_INTEGER;
const MIN_INT = Number.MIN_SAFE_INTEGER;

const coerceBigint = value => {
  if (value === '') {
    throw new TypeError(
      'Bigint cannot represent non 53-bit signed integer value: (empty string)',
    );
  }
  const num = Number(value);
  if (num > MAX_INT || num < MIN_INT) {
    throw new TypeError(
      `Bigint cannot represent non 53-bit signed integer value: ${String(
        value,
      )}`,
    );
  }
  const int = Math.floor(num);
  if (int !== num) {
    throw new TypeError(
      `Bigint cannot represent non-integer value: ${String(value)}`,
    );
  }
  return int;
};

const GraphQLBigint = new GraphQLScalarType({
  name: 'Bigint',
  description:
    'The `Bigint` scalar type represents non-fractional signed whole numeric ' +
    'values. Bigint can represent values between -(2^53) + 1 and 2^53 - 1. ',
  serialize: coerceBigint,
  parseValue: coerceBigint,
  parseLiteral(ast) {
    if (ast.kind === INT) {
      const num = parseInt(ast.value, 10);
      if (num <= MAX_INT && num >= MIN_INT) {
        return num;
      }
    }
    return null;
  },
});

export default GraphQLBigint;

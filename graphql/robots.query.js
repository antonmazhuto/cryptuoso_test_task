import gql from 'graphql-tag';

const ROBOTS_QUERY = gql`
  query Robots($offset: Int, $limit: Int) {
    robots(offset: $offset, limit: $limit) {
      id
      code
      status
    }
  }
`;

export default ROBOTS_QUERY;

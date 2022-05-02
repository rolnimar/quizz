import gql from "graphql-tag";

const CATEGORIES_QUERY = gql`
  query GetCategories {
    categories  {
      data {
        attributes  {
          categoryName
        }
        id
      }
    }
  }
`;

export default CATEGORIES_QUERY;
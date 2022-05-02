import gql from "graphql-tag";

const ANIMALS_QUERY = gql`
  query GetAnimals($id: [ID]) {
    animals(filters: { category: { id: { in: $id } } }) {
      data {
        attributes {
          
          genericName,
          specificName,
          className,
          animalPicture{
          data{
            attributes{
              formats
              
            }
          }
        }
          
        },
        id
      }
    }
  }
`;


export default ANIMALS_QUERY;
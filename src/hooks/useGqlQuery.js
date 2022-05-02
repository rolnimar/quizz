import React from "react";
import { useQuery } from "@apollo/react-hooks";

const useGqlQuery = (query, id)=> {
  const { data, loading, error } = useQuery(query,{
    variables: {
      id: id
    }
  });
  console.log(query);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  return {data, loading, error};
}; 

export default useGqlQuery;
import React from "react";
import { useQuery } from "@apollo/react-hooks";

const Query = ({ children, query, slug, tag }) => {
  const { data, loading, error } = useQuery(query, { 
    variables: { slug: slug, queryTag: tag },
    errorPolicy: 'all'
  }
  );
  if (loading) return <div>Loading...</div>;
  return children({ data, error });
};

export default Query;
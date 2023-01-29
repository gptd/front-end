import React, { useState, useEffect } from "react";

export default function ResultPage() {
  const [results, setResults] = useState([]);

  // fetch query results

  return (
    <>
      <div
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        sx={{ mb: 6 }}
      >
        <h1>Results</h1>
        
      </div>
    </>
  );
}

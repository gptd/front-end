import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

function PercentageBar({ percentage }) {
  const width = {
    width: `${percentage}%`,
  };
  return (
    <div className="relative h-4 bg-gray-300 rounded-xl flex flex-row">
      <div className="absolute h-full bg-teal-500 rounded-xl" style={width} />
    </div>
  );
}

export default function ResultPage() {
  const [results, setResults] = useState([
    { id: 1, text: "I am the best.", rank: "90%" },
    { id: 2, text: "I am the worst.", rank: "10%" },
    { id: 3, text: "I am just okay.", rank: "50%" },
  ]);

  const [searchParams] = useSearchParams();

  // fetch query results
  useEffect(() => {
    const getResults = async () => {
      const queryText = searchParams.get("query");

      if (!queryText) return;

      const result = await fetch("https://api.gptd.me/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query_text: queryText }),
      });
      const data = await result.json();

      setResults(data);
    };

    getResults();
  }, []);

  return (
    <div className="w-screen h-screen h-[100dvh] bg-slate-600 flex flex-col pt-4 pb-12 px-6 gap-2 md:w-2/5 md:mx-auto">
      <header className="flex flex-row justify-between">
        <Link to="/" className="text-4xl font-bold">
          GPT'd?
        </Link>
        <Link to="/auth/logout" className="font-semibold">
          logout
        </Link>
      </header>
      <h1 className="text-2xl font-medium text-center">Results</h1>
      <div className="p-8">
        {results.map((sentence) => (
          <div key={sentence.id} className="my-2">
            <div className="text-lg font-medium">{sentence.text}</div>
            <div className="text-sm text-gray-600">Rank: {sentence.rank}</div>
            <PercentageBar percentage={parseInt(sentence.rank)} />
          </div>
        ))}
      </div>
    </div>
  );
}

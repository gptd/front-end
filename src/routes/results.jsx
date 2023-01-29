import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from "../assets/spinner.svg";

function PercentageBar({ percentage }) {
  const width = {
    width: `${percentage}%`,
  };
  return (
    <div className="relative h-4 bg-gray-300 rounded-xl flex flex-row">
      <div className="absolute h-full bg-red-600 rounded-xl" style={width} />
    </div>
  );
}

export default function ResultPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

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

      const predictions = data.map((prediction) => {
        return {
          text: prediction.text,
          human: prediction.prediction[0] * 100,
          gpt: prediction.prediction[1] * 100,
        };
      });

      // calculate the average prediction percentage
      const humanAverage =
        predictions.reduce((acc, curr) => {
          return acc + curr.human;
        }, 0) / predictions.length;

      const gptAverage =
        predictions.reduce((acc, curr) => {
          return acc + curr.gpt;
        }, 0) / predictions.length;

      const gptChunkCount = predictions.reduce((acc, curr) => {
        return curr.gpt > 50 ? acc + 1 : acc;
      }, 0);

      setResults({ gptAverage, humanAverage, predictions, gptChunkCount });
      setLoading(false);
    };

    getResults();
  }, []);

  return (
    <div className="w-screen min-h-screen min-h-[100dvh] bg-slate-600 flex flex-col pt-4 pb-12 px-6 gap-2 md:w-2/5 md:mx-auto">
      <header className="flex flex-row justify-between">
        <Link to="/" className="text-4xl font-bold">
          GPT'd?
        </Link>
        <Link to="/auth/logout" className="font-semibold">
          logout
        </Link>
      </header>
      <div className="flex-grow flex flex-col justify-center">
        {loading ? (
          <img
            src={Spinner}
            alt="Loading..."
            className="mx-auto fill-none"
            width={48}
            height={48}
          />
        ) : (
          <>
            <h2 className="font-semibold text-center text-4xl my-4">
              {results.gptAverage > 50
                ? "You have been GPT'd!"
                : "You have not been GPT'd!"}
            </h2>
            <div className="text-center font-semibold">
              There is a{" "}
              <span className="text-red-500 font-semibold">
                {results.gptAverage.toFixed(2)}%
              </span>{" "}
              chance that this text has been written by ChatGPT, and a{" "}
              <span className="text-green-500 font-semibold">
                {results.humanAverage.toFixed(2)}%
              </span>{" "}
              chance that it has been written by a human.{" "}
              {results.gptChunkCount} out of {results.predictions.length} chunks
              have been written by ChatGPT.
            </div>
            <div className="flex flex-col gap-3 mt-4 overflow-scroll-y">
              <h2 className="font-semibold">Chunks</h2>
              {results.predictions.map((prediction, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div>{prediction.text}</div>
                  <PercentageBar percentage={parseInt(prediction.gpt)} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

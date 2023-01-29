import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';

const res = [
  { id: 1, text: 'I am the best.', rank: '90%' },
  { id: 2, text: 'I am the worst.', rank: '10%' },
  { id: 3, text: 'I am just okay.', rank: '50%' },

]

function PercentageBar({percentage}) {
  const width = {
    width: `${percentage}%`
  }
  return (
    <div className="relative h-4 bg-gray-300">
      <div className="absolute h-full bg-teal-500" style={width} />
    </div>
  )
}

export default function ResultPage() {
  const [results, setResults] = useState([
    { id: 1, text: 'I am the best.', rank: '90%' },
    { id: 2, text: 'I am the worst.', rank: '10%' },
    { id: 3, text: 'I am just okay.', rank: '50%' },
  ]);

  // fetch query results

  return (
    <>
      
       <h1 className="text-2xl font-medium">Sentence Rankings</h1>
      <div className="rounded-lg p-8">
        {results.map((sentence) => (
          <div key={sentence.id} className="my-2">
            <div className="text-lg font-medium">{sentence.text}</div>
            <div className="text-sm text-gray-600">Rank: {sentence.rank}</div>
            <PercentageBar percentage={parseInt(sentence.rank)} />
          </div>
        ))}
      </div>
        
      
    </>
  );
}

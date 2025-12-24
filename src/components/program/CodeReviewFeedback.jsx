import React, { useState } from "react";

const aspects = [
  "Readability",
  "Performance",
  "Security",
  "Documentation",
  "Testing",
];

const FeedbackSystem = () => {
  const [upvotes, setUpvotes] = useState([0, 0, 0, 0, 0]);
  const [downvotes, setDownvotes] = useState([0, 0, 0, 0, 0]);

  const handleUpvote = (index) => {
    const updated = [...upvotes];
    updated[index] += 1;
    setUpvotes(updated);
  };

  const handleDownvote = (index) => {
    const updated = [...downvotes];
    updated[index] += 1;
    setDownvotes(updated);
  };

  return (
    <div className="my-0 mx-auto text-center w-mx-1200">
      <div className="flex wrap justify-content-center mt-30 gap-30">
        {aspects.map((aspect, index) => (
          <div key={aspect} className="pa-10 w-300 card">
            <h2>{aspect}</h2>

            <div className="flex my-30 mx-0 justify-content-around">
              <button
                className="py-10 px-15"
                data-testid={`upvote-btn-${index}`}
                onClick={() => handleUpvote(index)}
              >
                👍 Upvote
              </button>
              <button
                className="py-10 px-15 danger"
                data-testid={`downvote-btn-${index}`}
                onClick={() => handleDownvote(index)}
              >
                👎 Downvote
              </button>
            </div>

            <p className="my-10 mx-0" data-testid={`upvote-count-${index}`}>
              Upvotes: <strong>{upvotes[index]}</strong>
            </p>
            <p className="my-10 mx-0" data-testid={`downvote-count-${index}`}>
              Downvotes: <strong>{downvotes[index]}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackSystem;

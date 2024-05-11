import React from 'react';
import  sentimentToEmoji  from '../utils/sentimentToEmoji';

const ReviewCard = ({ review }) => {
  const emoji = sentimentToEmoji(review.sentiment.sentiment);

  return (
    <div
      className="bg-white p-4 border border-gray-300 rounded shadow-md mb-4 transition-transform transform hover:-translate-y-1 hover:scale-105"
      style={{ width: '100%' }}
    >
      <p>{emoji} {review.text}</p> {/* Emoji with review text */}
      <p>Sentiment: {review.sentiment.sentiment}</p>
      <p>Score Rank: {review.sentiment.score_rank}</p>
    </div>
  );
};
export default ReviewCard;

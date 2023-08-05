import React from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  // Fetch post details using the post ID from Redux store or API

  return (
    <div>
      <h1>Detail Page</h1>
      <h2>Title</h2>
      <p>Body</p>
      <p>UserID</p>
    </div>
  );
};

export default Detail;

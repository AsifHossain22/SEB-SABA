'use client';

const LikeButton = () => {
  return (
    <button
      onClick={() => {
        console.log('Like Button clicked!');
      }}
    >
      Like Button
    </button>
  );
};

export default LikeButton;

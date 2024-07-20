import "./LoadingSpinner.css"; // Ensure this path is correct

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <svg
        className="loading-spinner"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        width="100"
        height="100"
      >
        <rect x="0" y="0" width="500" height="500" fill="none" />
        <rect
          x="0"
          y="0"
          width="400"
          height="400"
          fill="none"
          stroke="#000"
          strokeWidth="10"
        />
        <rect x="400" y="400" width="100" height="100" fill="#FFA500" />
      </svg>
    </div>
  );
};

export default LoadingSpinner;

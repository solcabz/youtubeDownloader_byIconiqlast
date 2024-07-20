import "./LoadingSpinner.css"; // Ensure this path is correct

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <svg
        id="Layer_1"
        data-name="loading-spinner"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
      >
        <defs></defs>
        <polygon
          className="cls-1"
          points="49.84 49.84 49.84 449.98 366.62 449.98 366.62 383.29 116.53 383.29 116.53 116.53 383.29 116.53 383.29 366.62 449.98 366.62 449.98 49.84 49.84 49.84"
        />
        <rect
          className="cls-2"
          x="383.29"
          y="383.29"
          width="66.69"
          height="66.69"
        />
        <rect
          className="cls-2"
          x="449.98"
          y="449.98"
          width="50.02"
          height="50.02"
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;

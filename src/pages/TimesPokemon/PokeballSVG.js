import React from "react";

function PokeballSVG({ className }) {
  return (
    <svg
      id="Pokeball"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 981.87 1000"
      className={className}
    >
      <path d="M661.04,595.26c-33.58,59.21-97.18,99.17-170.11,99.17s-136.53-39.96-170.11-99.17H0c44.48,230.58,247.37,404.74,490.93,404.74s446.45-174.16,490.93-404.74h-320.82Z" />
      <path d="M490.93,303.57c73.75,0,137.96,40.86,171.23,101.17h319.7C937.39,174.16,734.5,0,490.93,0S44.48,174.16,0,404.74h319.7c33.27-60.31,97.48-101.17,171.23-101.17Z" />
      <circle cx="490.93" cy="500" r="95.26" />
    </svg>
  );
}

export default PokeballSVG;

import React from "react";
import colors from "./color_data.json";

function PokemonTypeBox({ type }) {
  return (
    <div
      className="w-14 text-center text-[80%] leading-[12px] rounded-sm mr-1 border border-opacity-[8%] border-black"
      style={{ background: `#${colors[type]}` }}
    >
      <span className="text-white font-medium text-[11px] tracking-wide leading-[12px]">
        {type}
      </span>
    </div>
  );
}

export default PokemonTypeBox;

import React from "react";

function EffortLevel({ effort, value }) {
  return (
    <div className="flex items-center content-center justify-center w-12 gap-0.5">
      <div className="relative w-[19px] h-[19px] mr-0.5">
        {/* Ring */}
        <div
          className="absolute t-0 left-0 w-full h-full rounded-full"
          style={{
            background: `conic-gradient(#d0e050 calc(360deg / 10 * ${value}), #00000077 0)`,
          }}
        ></div>
        {/* Circle */}
        <div className="w-[15px] h-[15px] rounded-full bg-[#333333] flex justify-center items- text-center absolute top-0.5 left-0.5 z-[2]">
          <span className="text-white text-[12px] font-normal leading-4">
            {value}
          </span>
        </div>
      </div>

      <div className="min-w-[18px] leading-3">
        <span className="text-[11px] leading-3 font-medium">{effort}</span>
      </div>
    </div>
  );
}

function PokemonEffortValues({ effort_levels }) {
  const stats = ["HP", "Atk", "Def", "SpA", "SpD", "Spe"];
  return (
    <div className="rounded-lg m-auto bg-transparent">
      <div className="text-center leading-3 text-xs">
        <span>Effort Levels:</span>
      </div>
      <div className="grid grid-cols-2 gap-y-1 rounded-lg bg-[#ffffff22] py-1">
        {stats.map((stat, index) => (
          <EffortLevel effort={stat} value={effort_levels[index]} />
        ))}
      </div>
    </div>
  );
}

export default PokemonEffortValues;

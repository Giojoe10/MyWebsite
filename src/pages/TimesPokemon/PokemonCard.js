import React from "react";
import colors from "./color_data.json";
import PokeballSVG from "./PokeballSVG";
import PokemonEffortValues from "./PokemonEffortValues";
import PokemonTypeBox from "./PokemonTypeBox";
import PokemonMove from "./PokemonMove";

function PokemonCard({ pokemon, showMoves }) {
  return (
    <table
      className="rounded-lg border-separate w-64 relative z-10"
      style={{
        background: `#${colors[pokemon.type1 + " light"]}`,
        border: `2px solid #${
          pokemon.type2
            ? colors[pokemon.type2 + " dark"]
            : colors[pokemon.type1 + " dark"]
        }`,
      }}
    >
      {pokemon.shiny && (
        <img
          src="\shiny_sparkle.png"
          alt=""
          className="absolute -translate-x-1 -translate-y-1 rounded-lg -z-10 w-full h-full object-cover mix-blend-lighten opacity-50"
        />
      )}
      <tbody>
        {/* Header */}
        <tr>
          {/* Sprite */}
          <td className="w-1/2">
            <center>
              <div className="rounded-lg m-auto">
                <div className="flex justify-center items-center group">
                  <PokeballSVG className="w-24 h-24 absolute rotate-45 fill-slate-200" />
                  <img
                    src={pokemon.image}
                    alt=""
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className={
                      "w-24 h-24 object-contain z-10 " +
                      (pokemon.hover_image ? "group-hover:hidden" : "")
                    }
                  />
                  {pokemon.hover_image && (
                    <img
                      src={pokemon.hover_image}
                      alt=""
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-24 h-24 object-contain z-10 hidden group-hover:block"
                    />
                  )}
                </div>
              </div>
            </center>
          </td>
          {/* Data */}
          <td rowSpan={2}>
            <div className="">
              {/* Types */}
              <div className="rounded-lg my-1 mx-auto bg-transparent">
                <div className="text-center text-[10px] leading-none">
                  Types:
                </div>
                <div className="flex justify-center mt-0.5">
                  {/* First Type */}
                  <PokemonTypeBox type={pokemon.type1} />
                  {/* Second Type (if exists) */}
                  {pokemon.type2 && <PokemonTypeBox type={pokemon.type2} />}
                </div>
              </div>
              {/* Tera Type */}
              {pokemon.tera && (
                <div className="rounded-lg my-1 mx-auto bg-transparent">
                  <div className="text-center text-[10px] leading-none">
                    Tera Type:
                  </div>
                  <div className="flex justify-center mt-0.5">
                    <PokemonTypeBox type={pokemon.tera} />
                  </div>
                </div>
              )}
              {/* Ability */}
              {pokemon.ability && (
                <div className="rounded-lg my-1 mx-auto bg-transparent">
                  <div className="text-center text-[10px] font-light">
                    Ability:
                  </div>
                  <div className="text-center leading-3">
                    <span className="text-black text-xs">
                      {pokemon.ability}
                    </span>
                  </div>
                </div>
              )}
              {/* Held Item */}
              {pokemon.held_item !== "LA" && (
                <div className="rounded-lg my-1 mx-auto bg-transparent">
                  <div className="text-center leading-4 text-[10px] font-light">
                    Held Item:
                  </div>
                  <div
                    className={
                      "text-center gap-1 text-xs " +
                      (pokemon.held_item
                        ? " flex items-center justify-center"
                        : "")
                    }
                  >
                    {pokemon.held_item && (
                      <img
                        src={pokemon.held_item_image}
                        alt=""
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-4 h-4"
                      />
                    )}
                    {pokemon.held_item ? pokemon.held_item : "None"}
                  </div>
                </div>
              )}
              {/* Effort Values */}
              {pokemon.effort_levels && (
                <PokemonEffortValues effort_levels={pokemon.effort_levels} />
              )}
            </div>
          </td>
        </tr>
        {/* Name */}
        <tr>
          <td className="rounded-full m-auto text-center bg-white leading-none">
            <span className="text-black text-[13px] leading-none">
              {pokemon.name}
            </span>
            <span
              className={
                "text-sm " +
                (pokemon.gender === "male"
                  ? "text-[#0070f8]"
                  : "text-[#E03838]")
              }
              style={{ fontFamily: "Segoe UI Symbol" }}
            >
              {pokemon.gender === "male" ? "♂" : "♀"}
            </span>
            <span className="text-xs"> Lv.</span>
            <span className="text-sm">{pokemon.level}</span>
          </td>
        </tr>
        {/* Moves */}
        {pokemon.moves && showMoves && (
          <tr>
            <td
              className="rounded-lg"
              colSpan={2}
              style={{ background: `#${colors[pokemon.type1 + " dark"]}55` }}
            >
              <table
                className="rouded-lg w-full m-auto border-separate"
                cellPadding={0}
              >
                <tbody>
                  <tr>
                    {pokemon.moves.slice(0, 2).map((move, i) => (
                      <PokemonMove
                        key={i}
                        move={{
                          name: move,
                          type: pokemon.move_types[i],
                          kind: pokemon.move_kinds[i],
                        }}
                      />
                    ))}
                  </tr>
                  <tr>
                    {pokemon.moves.slice(2, 4).map((move, i) => (
                      <PokemonMove
                        key={i}
                        move={{
                          name: move,
                          type: pokemon.move_types[i + 2],
                          kind: pokemon.move_kinds[i + 2],
                        }}
                      />
                    ))}
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default PokemonCard;

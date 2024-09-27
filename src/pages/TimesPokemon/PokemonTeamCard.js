import React, { useState } from "react";
import colors from "./color_data.json";
import PokemonCard from "./PokemonCard";

function PokemonTeamCard({ name, data, showMoves }) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={
        "mx-0 my-0 block box-border w-auto h-auto" +
        (expanded ? " col-span-2" : "")
      }
    >
      <table
        className={
          "float-left rounded-[20px] border-separate h-min" +
          (data.rainbow_border ? " rainbow-border" : "")
        }
        cellSpacing={1}
        cellPadding={2}
        style={{
          background: `#${colors[data.game_color]}`,
          border: data.rainbow_border
            ? ""
            : `2px solid #${colors[data.game_color + " dark"]}`,
        }}
      >
        <tbody>
          {/* Header */}
          <tr className="cursor-pointer" onClick={handleToggle}>
            <td>
              <center>
                {/* Trainer Card */}
                <table
                  className="m-auto bg-transparent border-separate"
                  cellSpacing={1}
                  cellPadding={2}
                >
                  <tbody>
                    <tr>
                      {/* Trainer Icon */}
                      <th
                        className="w-20 h-20 rounded-full overflow-hidden flex justify-center items-start"
                        style={{
                          background: `#${colors[data.game_color + " light"]}`,
                          border: `2px solid #${
                            colors[data.game_color + " dark"]
                          }`,
                        }}
                      >
                        <img
                          src={data.trainer_img}
                          alt=""
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-full h-auto border-full object-fill scale-110 "
                        />
                      </th>
                      {/* Trainer Info */}
                      <td>
                        <table
                          className="rounded-xl w-52 m-auto text-center border-collapse leading-3"
                          style={{
                            background: `#${
                              colors[data.game_color + " light"]
                            }`,
                          }}
                        >
                          <tbody>
                            {/* Trainer Class */}
                            <tr>
                              <td>
                                <span className="text-black font-medium text-xs leading-4">
                                  {data.trainer_class || "Trainer"}
                                </span>
                              </td>
                            </tr>
                            {/* Trainer Name */}
                            <tr>
                              <td>
                                <span className="text-black font-medium text-[18px] leading-5">
                                  {data.trainer_name}
                                </span>
                              </td>
                            </tr>
                            {/* Trainer Town */}
                            <tr>
                              <td>
                                <span className="text-black font-medium text-xs leading-3">
                                  {data.trainer_town}
                                </span>
                              </td>
                            </tr>
                            {/* Game Version */}
                            <tr>
                              <td>
                                <span className="text-black text-[11px] leading-3">
                                  {data.game_name}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    {/* Balls */}
                    <tr>
                      <td className="text-center" />
                      <td>
                        <table className="m-auto rounded-lg bg-transparent border-collapse">
                          <tbody>
                            <tr>
                              <td className="rounded-lg w-24 leading-3 flex justify-center">
                                {data.pokemon_list.map((_, i) => (
                                  <img
                                    src="https://archives.bulbagarden.net/media/upload/f/fa/Ballfull.png"
                                    alt=""
                                    className="w-4 h-4"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                  />
                                ))}
                                {[...Array(6 - data.pokemon_list.length)].map(
                                  (_, i) => (
                                    <img
                                      src="https://archives.bulbagarden.net/media/upload/7/7e/Ballempty.png"
                                      alt=""
                                      className="w-4 h-4"
                                      decoding="async"
                                      referrerPolicy="no-referrer"
                                    />
                                  )
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </center>
            </td>
          </tr>
          {/* All Pokémon */}
          <tr
            className={
              "px-0 py-4 overflow-hidden" + (expanded ? " block" : " hidden")
            }
          >
            <td colSpan={2}>
              <table
                className="rounded-lg m-auto w-full"
                style={{
                  background: `#${colors[data.game_color]}`,
                  border: `2px solid #${colors[data.game_color]}`,
                }}
              >
                <tbody>
                  <tr>
                    {data.pokemon_list.slice(0, 3).map((pokemon) => (
                      <td>
                        <PokemonCard pokemon={pokemon} showMoves={showMoves} />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {data.pokemon_list.slice(3, 6).map((pokemon) => (
                      <td>
                        <PokemonCard pokemon={pokemon} showMoves={showMoves} />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function PokemonTeamCardSkeleton() {
  return (
    <div className="m-0 block box-border size-auto animate-pulse">
      <table
        className="w-[305px] h-[115px] float-left rounded-[20px] border-separate bg-[#9ca3af44] border-2 border-[#9ca3af44]"
        cellSpacing={1}
        cellPadding={2}
      >
        <tbody>
          <tr>
            <td>
              <center>
                <table
                  className="m-auto bg-transparent border-separate"
                  cellSpacing={1}
                  cellPadding={2}
                >
                  <tbody>
                    <tr>
                      <th className="w-20 h-20 rounded-full flex bg-[#9ca3af44]"></th>
                      <td>
                        <div className="rounded-xl h-20 w-52 m-auto border-collapse bg-[#9ca3af44]"></div>
                      </td>
                    </tr>
                    <tr>
                      <td />
                      <td className="m-auto justify-center flex">
                        <div className="w-24 h-4 flex">
                          <div className="rounded-full bg-[#9ca3af44] w-4 h-4" />
                          <div className="rounded-full bg-[#9ca3af44] w-4 h-4" />
                          <div className="rounded-full bg-[#9ca3af44] w-4 h-4" />
                          <div className="rounded-full bg-[#9ca3af44] w-4 h-4" />
                          <div className="rounded-full bg-[#9ca3af44] w-4 h-4" />
                          <div className="rounded-full bg-[#9ca3af44] w-4 h-4" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </center>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export { PokemonTeamCard, PokemonTeamCardSkeleton };

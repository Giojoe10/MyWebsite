import React from "react";
import colors from "./color_data.json";

function PokemonMove({ move }) {
  return (
    <td
      className="rounded-lg w-1/2 bg-white"
      style={{ border: `2px solid #${colors[move.type + " dark"]}` }}
    >
      <table
        className="rounded-lg w-full m-auto border-collapse text-center"
        cellSpacing={1}
        cellPadding={2}
      >
        <tbody>
          {/* Name:  */}
          <tr>
            <td className="p-0" colSpan={2}>
              <span className="text-black text-xs leading-none">
                {move.name}
              </span>
            </td>
          </tr>
          {/* Type and Kind */}
          <tr>
            <td
              className="rounded-bl-md w-1/2 leading-3"
              style={{ background: `#${colors[move.type]}` }}
            >
              <span className="text-white text-[10px]">{move.type}</span>
            </td>
            <td
              className="rounded-br-md w-1/2 leading-3"
              style={{ background: `#${colors[move.kind]}` }}
            >
              <span className="text-white text-[10px]">{move.kind}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  );
}

export default PokemonMove;

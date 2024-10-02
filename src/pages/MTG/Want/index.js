import React, { useState, useEffect } from "react";
import PageTitle from "../../../components/PageTitle";

import axios from "axios";

function WantGenerator() {
  const [list, setList] = useState("");
  const [rows, setRows] = useState(3);
  const [want, setWant] = useState("");
  const [showQuantity, setShowQuantity] = useState(true);

  useEffect(() => {
    const loadCards = async () => {
      const cards = list.match(/(?:([0-9]+)x? )?(.+)/g);
      if (!cards) return;

      const cardsWithQuantity = [];

      const promises = cards.map(async (card) => {
        const [, quantity, name] = card.match(/(?:([0-9]+)x? )?(.+)/);
        const url =
          "https://api.scryfall.com/cards/named?fuzzy=" +
          name.trim().toLowerCase().replace(/ /g, "+");

        try {
          const response = await axios.get(url);
          const imgUrl = response.data.image_uris.normal;
          cardsWithQuantity.push({ quantity, name, imgUrl });
          console.log(quantity, name, imgUrl);
        } catch (e) {
          console.log(e);
        }
      });

      // Aguarda todas as promessas terminarem
      await Promise.all(promises);

      console.log(cardsWithQuantity);
      const response = await axios.post(
        "http://localhost:5000/mtg/wantGenerator",
        {
          list: cardsWithQuantity,
          rows: rows,
          showQuantity: showQuantity,
        }
      );
      console.log(response);
      setWant(response.data.image);
    };

    loadCards();
  }, [list, rows, showQuantity]);

  return (
    <div className="">
      <PageTitle
        title="Gerador de Wants"
        image="https://i.imgur.com/mwRqvMd.png"
      />
      <div
        className="grid grid-cols-2 p-10"
        style={{ gridTemplateColumns: "20% 80%" }}
      >
        <div className="flex flex-col gap-2 justify-start items-center">
          <div className="flex gap-4">
            <div>
              <label htmlFor="rows" className="mr-2 text-white font-bold">
                Colunas:
              </label>
              <input
                type="number"
                value={rows}
                min="1"
                max="5"
                onChange={(e) => setRows(e.target.value)}
                className="w-12 p-1"
              />
            </div>
            <div className="flex flex-col items-center">
              <label
                htmlFor="showQuantity"
                className="ml-2 text-white font-bold"
              >
                Mostrar Quantidade?
              </label>
              <input
                type="checkbox"
                onChange={(e) => setShowQuantity(e.target.checked)}
                checked={showQuantity}
              />
            </div>
          </div>
          <div className="flex w-full items-start justify-center">
            <textarea
              name="list"
              id="list"
              onChange={(e) => {
                setList(e.target.value);
              }}
              value={list}
              className="p-2 resize-none w-full h-[500px] text-xs"
            />
          </div>
          <div className="flex w-full justify-between px-16">
            <a href={want} download={"want.png"}>
              <button
                type="button"
                className="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-primary-700 rounded-lg hover:bg-primary-800"
              >
                <svg
                  className="w-4 h-4 text-white me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"
                  />
                </svg>
                Salvar
              </button>
            </a>

            <button
              type="button"
              className="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-red-700 rounded-lg hover:bg-red-800"
              onClick={() => {
                setList("");
              }}
            >
              <svg
                className="w-4 h-4 text-white me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                />
              </svg>
              Limpar
            </button>
          </div>
        </div>
        <div className="flex w-full justify-center">
          {want ? (
            <img src={want} alt="want" />
          ) : (
            <span className="text-white text-3xl font-bold animate-pulse">
              Insira cartas na lista!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default WantGenerator;

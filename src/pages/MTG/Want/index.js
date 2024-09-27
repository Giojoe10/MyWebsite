import React, { useState, useEffect, useRef } from "react";
import PageTitle from "../../../components/PageTitle";

import axios from "axios";

function WantGenerator() {
  const [list, setList] = useState("");
  const [rows, setRows] = useState(3);
  const canvasRef = useRef(null);

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!list) {
        canvas.width = 0;
        canvas.height = 0;
      } else {
        const cards = list.match(/(?:([0-9]+)x? )?(.+)/g);
        console.log(cards.length);
        canvas.width = cards.length >= rows ? rows * 250 : cards.length * 250;
        canvas.height = Math.ceil(cards.length / rows) * 350;
      }
    };

    const loadCards = async () => {
      const canvas = document.querySelector("canvas");
      const ctx = canvas.getContext("2d");

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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let x = 0;
      let y = 0;
      cardsWithQuantity.forEach((card) => {
        const img = new Image();
        console.log(card.imgUrl);
        img.referrerPolicy = "no-referrer";
        img.src = card.imgUrl;
        img.onload = () => {
          ctx.drawImage(img, x, y, 250, 350);
          if (card.quantity) {
            ctx.font = "bold 100px 'Fira Mono'";
            ctx.strokeStyle = "white";
            ctx.lineWidth = 5;
            ctx.strokeText(
              card.quantity,
              x + 125 - 30 * String(card.quantity).length,
              y + 175 + 15
            );
            ctx.fillText(
              card.quantity,
              x + 125 - 30 * String(card.quantity).length,
              y + 175 + 15
            );
          }
          x += 250;
          if (x >= canvas.width) {
            x = 0;
            y += 350;
          }
        };
      });
    };

    resizeCanvas();
    loadCards();
  }, [list, rows]);

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
            <button
              type="button"
              className="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-primary-700 rounded-lg hover:bg-primary-800"
              onClick={() => {
                // save canvas as png
                const canvas = document.querySelector("canvas");
                const dataURL = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.download = "wants.png";
                link.href = dataURL;
                link.click();
              }}
            >
              {/* class="w-3 h-3 text-white me-2" */}
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
          <canvas ref={canvasRef} className="bg-transparent" />
        </div>
      </div>
    </div>
  );
}

export default WantGenerator;

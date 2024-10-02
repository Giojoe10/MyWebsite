import React, { useState, useEffect } from "react";
import PageTitle from "../../../components/PageTitle";
import axios from "axios";
import TagInput from "../../../components/TagInput";

function Prices() {
  const [list, setList] = useState("");
  const [tableData, setTableData] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const loadCards = async () => {
      const cards = list.match(/(?:([0-9]+)x? )?(.+)/g);
      if (!cards) return;

      const cardsWithPrices = [];

      const promises = cards.map(async (card) => {
        const [, , name] = card.match(/(?:([0-9]+)x? )?(.+)/);
        const url =
          "http://localhost:5000/mtg/getCard/" + name.trim().toLowerCase();
        try {
          const response = await axios.get(url);
          cardsWithPrices.push(response.data);
        } catch (e) {
          console.log(e);
        }
      });

      // Aguarda todas as promessas terminarem
      await Promise.all(promises);
      const fullData = (
        await axios.post("http://localhost:5000/mtg/store", {
          list: cardsWithPrices,
          stores: stores,
        })
      ).data;
      setTableData(fullData);
    };

    loadCards();
  }, [list, stores]);

  return (
    <div className="">
      <PageTitle
        title="Busca de Preços"
        image="https://i.imgur.com/mwRqvMd.png"
      />
      <div
        className="grid grid-cols-2 p-10"
        style={{ gridTemplateColumns: "20% 80%" }}
      >
        <div className="flex flex-col gap-2 justify-start items-center">
          <TagInput tags={stores} setTags={setStores} />
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
        <div className="flex justify-center items-start ">
          <table className="text-gray-500 bg-white rounded-lg">
            <thead className="text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nome
                </th>
                <th scope="col" className="px-6 py-3">
                  Ligamagic
                </th>
                {stores &&
                  stores.map((store) => (
                    <th key={store} scope="col" className="px-6 py-3">
                      {store}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((card) => (
                <tr key={card.name}>
                  <td className="px-6 py-4">{card.name}</td>
                  <td className="px-6 py-4" style={{ fontFamily: "Fira Mono" }}>
                    {"R$" + card.menor.toFixed(2).replace(".", ",")}
                  </td>
                  {stores.length > 0 &&
                    card.stores &&
                    stores.map((store) =>
                      card.stores[store] ? (
                        <td
                          key={store}
                          className={
                            "group px-6 py-4 text-center " +
                            (card.stores &&
                              card.stores[store] === card.menor &&
                              " text-green-600")
                          }
                          style={{ fontFamily: "Fira Mono" }}
                        >
                          <span>{"R$" + card.stores[store].toFixed(2)}</span>
                          <br />
                          <span
                            className={`group-hover:hidden text-xs ${
                              card.stores[store] > card.menor
                                ? "text-red-600"
                                : ""
                            }`}
                          >
                            {card.stores[store] === card.menor
                              ? "Menor da Liga!"
                              : "▲ R$" +
                                (card.stores[store] - card.menor).toFixed(2)}
                          </span>
                          <span
                            className={`hidden group-hover:inline text-xs ${
                              card.stores[store] > card.menor
                                ? "text-red-600"
                                : ""
                            }`}
                          >
                            {card.stores[store] === card.menor
                              ? "Menor da Liga!"
                              : "▲ " +
                                (
                                  (card.stores[store] / card.menor) *
                                  100
                                ).toFixed(2) +
                                "%"}
                          </span>
                        </td>
                      ) : (
                        <td className="px-6 py-4 text-center">-</td>
                      )
                    )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Prices;

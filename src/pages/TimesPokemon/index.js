import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { PokemonTeamCard, PokemonTeamCardSkeleton } from "./PokemonTeamCard";

import { GetData } from "../../functions/PokemonExternalData";
import teams from "./teams.json";

function TimesPokemon() {
  const [data, setData] = useState(teams["teams"]);
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const [showMoves, setShowMoves] = useState(false);

  useEffect(() => {
    console.log(percentage);
  }, [percentage]);

  useEffect(() => {
    const getData = async () => {
      try {
        console.log("LOADER ON");
        setLoading(true);
        const AbrirBancoDeDados = () => {
          const request = indexedDB.open("meuBanco", 1);
          console.log("Add to db: ", data);

          request.onupgradeneeded = (event) => {
            console.log("Criando o banco de dados..");
            const db = event.target.result;

            if (!db.objectStoreNames.contains("teams")) {
              console.log("Criando o objeto teams...");
              const objectStore = db.createObjectStore("teams", {
                keyPath: "teamName",
              });

              objectStore.transaction.oncomplete = function () {
                console.log("Objeto teams criado com sucesso!");
                console.log("Atualizando dados...");
                GetData(data, setPercentage).then((data) => {
                  console.log("Adicionando dados...");
                  const transaction = db.transaction("teams", "readwrite");
                  const teamStore = transaction.objectStore("teams");
                  let order = 0;
                  for (const [game, team] of Object.entries(data)) {
                    console.log("Adicionando time: ", game);
                    console.log(team);
                    teamStore.add({ teamName: game, ...team, order });
                    order++;
                  }
                  const getAllRequest = teamStore.getAll();
                  const getAllKeysRequest = teamStore.getAllKeys();

                  getAllRequest.onsuccess = (event) => {
                    getAllKeysRequest.onsuccess = (event) => {
                      console.log("Dados Armazenados: ", getAllRequest.result);
                      const teams = getAllRequest.result;
                      const keys = getAllKeysRequest.result;
                      teams.sort((a, b) => a.order - b.order);
                      let result = {};
                      keys.forEach((key, index) => {
                        result[key] = teams[index];
                      });
                      setData(result);
                      if (teams.length > 0) {
                        setLoading(false);
                        setPercentage(100);
                      }
                      console.log(result);
                    };
                  };
                });
              };
            }
          };

          request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction("teams", "readonly");
            const teamStore = transaction.objectStore("teams");
            const getAllRequest = teamStore.getAll();
            const getAllKeysRequest = teamStore.getAllKeys();

            getAllRequest.onsuccess = (event) => {
              getAllKeysRequest.onsuccess = (event) => {
                console.log("Dados Armazenados: ", getAllRequest.result);
                const teams = getAllRequest.result;
                const keys = getAllKeysRequest.result;
                teams.sort((a, b) => a.order - b.order);
                let result = {};
                keys.forEach((key, index) => {
                  result[key] = teams[index];
                });
                setData(result);
                if (teams.length > 0) {
                  setLoading(false);
                }
                console.log(result);
              };
            };
          };

          request.onerror = (event) => {
            console.log("Erro ao abrir o banco de dados: ", event);
          };
        };

        AbrirBancoDeDados();
      } catch (error) {
        console.error("Erro ao carregar dados", error);
      } finally {
      }
    };
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <PageTitle
        title="MEUS TIMES"
        image="https://images5.alphacoders.com/595/595122.png"
        percent={percentage}
      />
      <div
        className="absolute left-0 bg-secondary-800 text-white flex-col flex  rounded-r-xl p-2 gap-1 top-96 text-center z-20 cursor-pointer"
        onClick={() => setShowMoves(!showMoves)}
      >
        <span>Mostrar Ataques?</span>
        <input type="checkbox" checked={showMoves} className="cursor-pointer" />
      </div>
      <div
        className="grid gap-5 justify-center place-items-start px-2 py-10 relative"
        style={{ gridTemplateColumns: "repeat(4, minmax(305px, auto))" }}
      >
        {loading
          ? [...Array(Object.keys(teams["teams"]).length)].map((_, index) => (
              <PokemonTeamCardSkeleton />
            ))
          : Object.keys(data).map((key) => (
              <PokemonTeamCard
                name={key}
                data={data[key]}
                showMoves={showMoves}
              />
            ))}
      </div>
    </div>
  );
}

export default TimesPokemon;

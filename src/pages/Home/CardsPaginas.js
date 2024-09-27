import React from "react";
import PageCard from "../../components/PageCard";

function CardsPaginas() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-wrap gap-6 py-10 px-72 justify-center">
        <PageCard
          name="Meus Times"
          description="Cartões para cada um dos times que utilizei nas minhas playthroughs de pokémon."
          image="https://images5.alphacoders.com/595/595122.png"
          page="/times"
        />
        <PageCard
          name="MTG"
          description="Ferramentas para a obtenção de preços e criação de imagens de cartas de Magic The Gathering."
          image="https://www.mtgpics.com/pics/art/c19/024.jpg"
          page="/mtg"
        />
      </div>
    </div>
  );
}

export default CardsPaginas;

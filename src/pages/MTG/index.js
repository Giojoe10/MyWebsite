import React from "react";
import PageTitle from "../../components/PageTitle";
import PageCard from "../../components/PageCard";

function MTG() {
  return (
    <div>
      <PageTitle
        title="Magic: The Gathering"
        image="https://i.imgur.com/mwRqvMd.png"
      />
      <div className="flex justify-center items-center">
        <div className="flex flex-wrap gap-6 py-10 px-72 justify-center">
          <PageCard
            name="Busca de Preços"
            description="Busca de preços de cartas ou listas de MTG na LigaMagic."
            image="https://www.mtgpics.com/pics/art/eld/131.jpg"
            page="/price"
          />
          <PageCard
            name="Gerador de Want"
            description="Gerador de imagem de lista de cartas, para compartilhamento de wants."
            image="https://www.mtgpics.com/pics/art/chk/052_2.jpg"
            page="/want"
          />
        </div>
      </div>
    </div>
  );
}

export default MTG;

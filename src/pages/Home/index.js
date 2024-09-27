import React from "react";
import PageTitle from "../../components/PageTitle";
import CardsPaginas from "./CardsPaginas";

function Home() {
  return (
    <div>
      <PageTitle title="HOME" image="https://i.imgur.com/0fqXTGp.jpeg" />
      <CardsPaginas />
    </div>
  );
}

export default Home;

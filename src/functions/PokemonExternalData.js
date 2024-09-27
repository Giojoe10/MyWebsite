import axios from "axios";
import { capwords, capitalize } from "./Common";

const GetPokemonTypes = async (pokemon) => {
  await new Promise((r) => setTimeout(r, 100));
  console.log(`Pokemon: ${JSON.stringify(pokemon)}`);
  let url;
  let response;
  try {
    url = `https://pokeapi.co/api/v2/pokemon/${pokemon["name"]
      .replaceAll(" ", "-")
      .toLowerCase()}`;
    response = await axios.get(url);
  } catch (error) {
    url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon["name"]
      .replaceAll(" ", "-")
      .toLowerCase()}`;
    response = await axios.get(url);
    response = await axios.get(response.data["varieties"][0]["pokemon"]["url"]);
  }
  let data = response.data;
  console.log(capitalize(data["types"][0]["type"]["name"]));
  const types = [
    capitalize(data["types"][0]["type"]["name"]),
    data["types"][1] ? capitalize(data["types"][1]["type"]["name"]) : null,
  ];
  console.log(`Types: ${types}`);
  return types;
};

const GetMoveInfo = async (move) => {
  await new Promise((r) => setTimeout(r, 100));
  console.log(`Move: ${move}`);
  const url = `https://pokeapi.co/api/v2/move/${move
    .replaceAll(" ", "-")
    .toLowerCase()}`;
  let response = await axios.get(url);
  const move_data = [
    capitalize(response.data["type"]["name"]),
    capitalize(response.data["damage_class"]["name"]),
  ];
  console.log(`Move data: ${move_data}`);
  return move_data;
};

const GetItemImage = async (item) => {
  await new Promise((r) => setTimeout(r, 100));
  if (!item) return null;
  console.log(`Item: ${item}`);
  let url = `https://archives.bulbagarden.net/wiki/File:Bag_${capwords(
    item
  ).replaceAll(" ", "_")}_Sprite.png`;
  let response;
  try {
    response = await axios.get(url);
  } catch (error) {
    url = `https://archives.bulbagarden.net/wiki/File:Bag_${capwords(
      item
    ).replaceAll(" ", "_")}_SV_Sprite.png`;
    response = await axios.get(url);
  }
  const parser = new DOMParser();
  let htmlDoc = parser.parseFromString(response.data, "text/html");
  let file = htmlDoc.getElementById("file");

  const image = file.querySelector("a").href;
  console.log(image ? "Imagem Encontrada!" : "Erro ao encontrar imagem!");
  return image;
};

const GetData = async (team_data, setPercentage) => {
  const percentageStep = 100 / Object.keys(team_data).length / 2;
  for (const team of Object.values(team_data)) {
    const percentageSubStep = percentageStep / team["pokemon_list"].length;
    let pokemon_types;
    for (const pokemon of team["pokemon_list"]) {
      if (!pokemon.type1) {
        pokemon_types = await GetPokemonTypes(pokemon);
        pokemon.type1 = pokemon_types[0];
        if (pokemon_types.length > 1) {
          pokemon.type2 = pokemon_types[1];
        }
      }

      if (pokemon.moves && !pokemon.move_kinds && !pokemon.move_types) {
        pokemon.move_kinds = [];
        pokemon.move_types = [];
        let move_info;
        for (const move of pokemon.moves) {
          move_info = await GetMoveInfo(move);
          pokemon.move_kinds.push(move_info[0]);
          pokemon.move_types.push(move_info[1]);
        }
      }

      if (
        pokemon.held_item &&
        pokemon.held_item !== "LA" &&
        !pokemon.held_item_image
      ) {
        if (pokemon.held_item_replacement) {
          pokemon.held_item_image = await GetItemImage(
            pokemon.held_item_replacement
          );
        } else {
          pokemon.held_item_image = await GetItemImage(pokemon.held_item);
        }
      }

      setPercentage((oldPercentage) => oldPercentage + percentageSubStep);
    }
    setPercentage((oldPercentage) => oldPercentage + percentageStep);
  }
  return team_data;
};

export { GetData };

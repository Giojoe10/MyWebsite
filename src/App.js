import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TimesPokemon from "./pages/TimesPokemon";
import MTG from "./pages/MTG";
import Header from "./components/Header";
import WantGenerator from "./pages/MTG/Want";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route /> */}
        <Route exact path="/times" element={<TimesPokemon />} />
        <Route exact path="/mtg/want" element={<WantGenerator />} />
        {/* <Route exact path="/mtg/price" element={<BuscaPreco />} /> */}
        <Route exact path="/mtg" element={<MTG />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

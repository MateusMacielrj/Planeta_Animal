
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./Componentes/Sidebar/Sidebar";
import Dashboard from "./Componentes/Dashboard/Dashboard";
import Novopedido from "./Componentes/NovoPedido/Novopedido";
import Comanda from "./Componentes/Comanda/Comanda";
import PedidoFinalizado from "./Componentes/PedidoFinalizado/PedidoFinalizado";
import Pedidos from "./Componentes/Pedidos/Pedidos";
import DetalhesPedido from "./Componentes/DetalhesPedido/DetalhesPedido";
import Extrato from "./Componentes/Extrato/Extrato";
import VisualizacaoExtrato from "./Componentes/VisualizacaoExtrato/VisualizacaoExtrato";
import EstadosSistema from "./Componentes/EstadosSistema/EstadosSistema";

import "./App.css";
import "./Componentes/Sidebar/Sidebar.css";
import "./Componentes/Dashboard/Dashboard.css";
import "./Componentes/NovoPedido/Novopedido.css";
import "./Componentes/Comanda/Comanda.css";
import "./Componentes/PedidoFinalizado/PedidoFinalizado.css";
import "./Componentes/Pedidos/Pedidos.css";
import "./Componentes/DetalhesPedido/DetalhesPedido.css";
import "./Componentes/Extrato/Extrato.css";
import "./Componentes/VisualizacaoExtrato/VisualizacaoExtrato.css";

function App() {
  const [pedidos, setPedidos] = useState([]);

  return (
    <div className="App">
      <Sidebar />

      <Routes>
        <Route path="/" element={<Dashboard pedidos={pedidos} />} />

        <Route
          path="/novo-pedido"
          element={<Novopedido setPedidos={setPedidos} />}
        />

        <Route path="/comanda" element={<Comanda />} />

        <Route path="/pedidofinalizado" element={<PedidoFinalizado />} />

        <Route path="/pedidos" element={<Pedidos pedidos={pedidos} />} />

        <Route path="/detalhespedido" element={<DetalhesPedido />} />

        <Route
          path="/extrato"
          element={<Extrato pedidos={pedidos} />}
        />

        <Route
          path="/visualizacao-extrato"
          element={<VisualizacaoExtrato pedidos={pedidos} />}
        />

        <Route path="/estados-sistema" element={<EstadosSistema />} />
      </Routes>
    </div>
  );
}

export default App;

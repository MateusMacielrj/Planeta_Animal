
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Pedidos({ pedidos }) {
  const navigate = useNavigate();

  // Estado da busca
  const [busca, setBusca] = useState("");

  // Estado dos filtros
  const [statusFiltro, setStatusFiltro] = useState("");
  const [dataFiltro, setDataFiltro] = useState("");

  // Converter data do pedido para o formato usado pelo input date
  function obterDataPedido(dataCriacao) {
    if (!dataCriacao) return "";

    const data = dataCriacao.split(",")[0].trim();
    const partes = data.split("/");

    if (partes.length !== 3) return "";

    const [dia, mes, ano] = partes;

    return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
  }

  // Filtrar pedidos
  const pedidosFiltrados = pedidos.filter((pedido, index) => {
    const numeroPedido = String(index + 1).padStart(6, "0");

    const termoBusca = busca.trim().toLowerCase();

    const correspondeBusca =
      pedido.cliente.nome.toLowerCase().includes(termoBusca) ||
      numeroPedido.includes(termoBusca) ||
      pedido.id.toLowerCase().includes(termoBusca);

    const statusPedido = pedido.status || "Pendente";

    const correspondeStatus =
      !statusFiltro || statusPedido.toLowerCase() === statusFiltro;

    const correspondeData =
      !dataFiltro || obterDataPedido(pedido.dataCriacao) === dataFiltro;

    return correspondeBusca && correspondeStatus && correspondeData;
  });

  return (
    <main className="pedidos" id="pedidos">
      {/* CABEÇALHO */}
      <header className="pedidos-header">
        <div>
          <h1>Pedidos</h1>
          <p>Consulte os pedidos realizados.</p>
        </div>

        <button
          type="button"
          className="botao-novo-pedido"
          id="botao-novo-pedido"
          onClick={() => navigate("/novo-pedido")}
        >
          + Novo Pedido
        </button>
      </header>

      {/* BUSCA E FILTROS */}
      <section className="filtros-pedidos" id="filtros-pedidos">
        <div className="campo-busca">
          <label htmlFor="buscar-pedido">
            Buscar pedido:
          </label>

          <input
            id="buscar-pedido"
            type="text"
            placeholder="Número do pedido ou nome do cliente"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
          />
        </div>

        <div className="campo-filtro">
          <label htmlFor="filtro-status">Status:</label>

          <select
            id="filtro-status"
            value={statusFiltro}
            onChange={(event) => setStatusFiltro(event.target.value)}
          >
            <option value="">Todos</option>
            <option value="finalizado">Finalizado</option>
            <option value="pendente">Pendente</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>

        <div className="campo-filtro">
          <label htmlFor="filtro-data">Data:</label>

          <input
            id="filtro-data"
            type="date"
            value={dataFiltro}
            onChange={(event) => setDataFiltro(event.target.value)}
          />
        </div>
      </section>

      {/* LISTA DE PEDIDOS */}
      <section className="lista-pedidos" id="lista-pedidos">
        <header className="lista-pedidos-header">
          <h2>Pedidos realizados</h2>
        </header>

        {pedidos.length === 0 ? (
          <p className="nenhum-pedido">
            Nenhum pedido cadastrado.
          </p>
        ) : pedidosFiltrados.length === 0 ? (
          <p className="nenhum-pedido">
            Nenhum pedido encontrado.
          </p>
        ) : (
          pedidosFiltrados.map((pedido) => {
            const indicePedido = pedidos.findIndex(
              (item) => item.id === pedido.id
            );

            const numeroPedido = String(indicePedido + 1).padStart(6, "0");

            const statusPedido = pedido.status || "Pendente";

            return (
              <article className="pedido-item" key={pedido.id}>
                <div className="pedido-numero">
                  <span>Pedido</span>
                  <strong>{numeroPedido}</strong>
                </div>

                <div className="pedido-cliente">
                  <span>Cliente</span>
                  <strong>{pedido.cliente.nome}</strong>
                </div>

                <div className="pedido-data">
                  <span>Data</span>
                  <strong>{pedido.dataCriacao}</strong>
                </div>

                <div className="pedido-total">
                  <span>Total</span>
                  <strong>
                    {pedido.total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                </div>

                <div className="pedido-status">
                  <span>Status</span>
                  <strong className="status-pendente">
                    {statusPedido}
                  </strong>
                </div>

                <div className="pedido-acoes">
                  <button
                    type="button"
                    className="botao-visualizar"
                    onClick={() =>
                      navigate("/detalhespedido", {
                        state: { pedido },
                      })
                    }
                  >
                    Visualizar
                  </button>
                </div>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}

export default Pedidos;

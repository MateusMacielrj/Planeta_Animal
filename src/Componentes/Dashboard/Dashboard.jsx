
import { useNavigate } from "react-router-dom";

function Dashboard({ pedidos = [] }) {
  const navigate = useNavigate();

  const totalPedidos = pedidos.length;

  const clientesAtendidos = new Set(
    pedidos
      .map((pedido) => pedido.cliente.telefone)
      .filter((telefone) => telefone)
  ).size;

  return (
    <main className="dashboard">
      <section className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Acompanhe os pedidos e entregas do dia.</p>
      </section>

      <section className="dashboard-resumo">
        <h2>Resumo</h2>

        <div className="dashboard-cards">
          <article className="dashboard-card">
            <span>Pedidos registrados</span>
            <strong>{totalPedidos}</strong>
          </article>

          <article className="dashboard-card">
            <span>Clientes atendidos</span>
            <strong>{clientesAtendidos}</strong>
          </article>
        </div>
      </section>

      <section className="dashboard-pedidos">
        <h2>Pedidos Recentes</h2>

        {pedidos.length === 0 ? (
          <div className="pedidos-vazio">
            <p>Nenhum pedido registrado ainda.</p>
          </div>
        ) : (
          <div className="pedidos-lista">
            {[...pedidos].reverse().map((pedido) => (
              <article className="pedido-card" key={pedido.id}>
                <h3>{pedido.cliente.nome}</h3>

                <p>
                  <strong>Telefone:</strong>{" "}
                  {pedido.cliente.telefone}
                </p>

                <p>
                  <strong>Endereço:</strong>{" "}
                  {pedido.cliente.endereco}
                </p>

                <p>
                  <strong>Data:</strong> {pedido.dataCriacao}
                </p>

                <p>
                  <strong>Produtos:</strong> {pedido.produtos.length}
                </p>

                <p>
                  <strong>Total:</strong>{" "}
                  {pedido.total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-acoes">
        <h2>Ações</h2>

        <div className="acoes-container">
          <button
            type="button"
            onClick={() => navigate("/novo-pedido")}
          >
            Novo Pedido
          </button>

          <button
            type="button"
            onClick={() => navigate("/pedidos")}
          >
            Visualizar Pedidos
          </button>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;


import { useLocation, useNavigate } from "react-router-dom";

function PedidoFinalizado() {
  const localizacao = useLocation();
  const navigate = useNavigate();

  const pedido = localizacao.state?.pedido;

  // Verificar se existe um pedido recebido
  if (!pedido) {
    return (
      <main className="pedido-finalizado" id="pedido-finalizado">
        <section className="confirmacao-card" id="confirmacao-pedido">
          <h1>Pedido não encontrado</h1>
          <p>Não foi possível carregar os dados do pedido.</p>

          <button
            type="button"
            className="botao-novo-pedido"
            onClick={() => navigate("/novo-pedido")}
          >
            Novo Pedido
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="pedido-finalizado" id="pedido-finalizado">
      <section className="confirmacao-card" id="confirmacao-pedido">

        <div className="confirmacao-icone" id="icone-confirmacao">
          ✓
        </div>

        <h1 id="titulo-confirmacao">
          Pedido Finalizado!
        </h1>

        <p className="mensagem-confirmacao" id="mensagem-confirmacao">
          O pedido foi registrado com sucesso.
        </p>

        <section className="resumo-pedido" id="resumo-pedido">

          <div className="resumo-item">
            <span>Número do Pedido:</span>
            <strong id="numero-pedido">
              {pedido.id.slice(0, 8)}
            </strong>
          </div>

          <div className="resumo-item">
            <span>Cliente:</span>
            <strong id="nome-cliente">
              {pedido.cliente.nome}
            </strong>
          </div>

          <div className="resumo-item">
            <span>Data:</span>
            <strong id="data-pedido">
              {pedido.dataCriacao}
            </strong>
          </div>

          <div className="resumo-item">
            <span>Total:</span>
            <strong id="valor-total">
              {pedido.total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
          </div>

        </section>

        <section className="acoes-pedido" id="acoes-pedido">

          <button
            type="button"
            className="botao-novo-pedido"
            id="botao-novo-pedido"
            onClick={() => navigate("/novo-pedido")}
          >
            Novo Pedido
          </button>

          <button
            type="button"
            className="botao-visualizar-pedido"
            id="botao-visualizar-pedido"
            onClick={() =>
              navigate("/detalhespedido", {
                state: { pedido },
              })
            }
          >
            Visualizar Pedido
          </button>

        </section>

      </section>
    </main>
  );
}

export default PedidoFinalizado;

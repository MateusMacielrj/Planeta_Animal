
import { useLocation, useNavigate } from "react-router-dom";

function Comanda() {
  const localizacao = useLocation();
  const navigate = useNavigate();
  const pedido = localizacao.state?.pedido;

  if (!pedido) {
    return (
      <main className="comanda">
        <h1>Comanda</h1>
        <p>Não foi possível carregar os dados do pedido.</p>
      </main>
    );
  }

  return (
    <main className="comanda">

      {/* CABEÇALHO */}
      <header className="comanda-header">
        <h1>Planeta Animal</h1>
        <p>CNPJ: 00.000.000/0001-00</p>
        <p>21 90000 0000</p>
      </header>

      {/* IDENTIFICAÇÃO DO PEDIDO */}
      <section className="pedido-info">
        <h2>Pedido Nº {pedido.id}</h2>
        <p>Data: {pedido.dataCriacao}</p>
      </section>

      {/* DADOS DO CLIENTE */}
      <section className="cliente-info">
        <h2>Dados do Cliente</h2>

        <div className="cliente-dados">
          <p>
            <strong>Cliente:</strong> {pedido.cliente.nome}
          </p>

          <p>
            <strong>Telefone:</strong> {pedido.cliente.telefone}
          </p>

          <p>
            <strong>Endereço:</strong> {pedido.cliente.endereco}
          </p>

          <p>
            <strong>Complemento:</strong>{" "}
            {pedido.cliente.complemento || "Não informado"}
          </p>
        </div>
      </section>

      {/* PRODUTOS */}
      <section className="produtos-info">
        <h2>Produtos</h2>

        <div className="produtos-header">
          <p>Código</p>
          <p>Produto</p>
          <p>QTD</p>
          <p>Unidade</p>
          <p>Valor</p>
          <p>Subtotal</p>
        </div>

        {pedido.produtos.map((produto) => (
          <div className="produto-item" key={produto.id}>
            <p>{produto.id.slice(0, 8)}</p>
            <p>{produto.nome}</p>
            <p>{produto.quantidade}</p>
            <p>{produto.unidade}</p>

            <p>
              {produto.valorUnitario.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>

            <p>
              {(produto.quantidade * produto.valorUnitario).toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency: "BRL",
                }
              )}
            </p>
          </div>
        ))}
      </section>

      {/* TOTAL */}
      <section className="pedido-total">
        <h2>
          Total:{" "}
          {pedido.total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </h2>

        <p>Pagamento: Não informado</p>
        <p>OBS: Não informada</p>
      </section>

      {/* FINALIZAR PEDIDO */}
      <section className="finalizar-pedido">
        <button
          onClick={() =>
            navigate("/pedidofinalizado", {
              state: { pedido },
            })
          }
        >
          Finalizar Pedido
        </button>
      </section>

      {/* RODAPÉ */}
      <footer className="comanda-footer">
        <h2>Obrigado pela preferência</h2>
        <p>Planeta Animal</p>
      </footer>

    </main>
  );
}

export default Comanda;

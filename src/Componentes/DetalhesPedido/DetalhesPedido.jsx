
import { useLocation } from "react-router-dom";

function DetalhesPedido() {
  const atualizacao = useLocation();
  const pedido = atualizacao.state?.pedido;

  if (!pedido) {
    return (
      <main className="detalhes-pedido">
        <h2>Pedido não encontrado</h2>
        <p>Não foi possível carregar os dados deste pedido.</p>
      </main>
    );
  }

  return (
    <main className="detalhes-pedido">
      <h1>Detalhes do Pedido</h1>

      {/* INFORMAÇÕES DO PEDIDO */}
      <section className="informacoes-pedido">
        <h2>Informações do Pedido</h2>

        <p>
          <strong>Número do Pedido:</strong> {pedido.id.slice(0, 8)}
        </p>

        <p>
          <strong>Data:</strong> {pedido.dataCriacao}
        </p>

        <p>
          <strong>Total:</strong>{" "}
          {pedido.total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </section>

      {/* DADOS DO CLIENTE */}
      <section className="dados-cliente">
        <h2>Dados do Cliente</h2>

        <p>
          <strong>Nome:</strong> {pedido.cliente.nome}
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
      </section>

      {/* PRODUTOS DO PEDIDO */}
      <section className="produtos-pedido">
        <h2>Produtos</h2>

        {pedido.produtos && pedido.produtos.length > 0 ? (
          pedido.produtos.map((produto) => (
            <article className="produto-detalhe" key={produto.id}>
              <h3>{produto.nome}</h3>

              <p>
                <strong>Quantidade:</strong> {produto.quantidade}{" "}
                {produto.unidade}
              </p>

              <p>
                <strong>Valor unitário:</strong>{" "}
                {produto.valorUnitario.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>

              <p>
                <strong>Subtotal:</strong>{" "}
                {(produto.quantidade * produto.valorUnitario).toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  }
                )}
              </p>
            </article>
          ))
        ) : (
          <p>Nenhum produto encontrado neste pedido.</p>
        )}
      </section>

      {/* TOTAL DO PEDIDO */}
      <section className="total-pedido">
        <h2>
          Total do Pedido:{" "}
          {pedido.total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </h2>
      </section>
    </main>
  );
}

export default DetalhesPedido;

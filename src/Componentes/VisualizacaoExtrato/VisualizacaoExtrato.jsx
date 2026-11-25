
import { useNavigate } from "react-router-dom";
import "./VisualizacaoExtrato.css";

function VisualizacaoExtrato({ pedidos = [] }) {
  const navigate = useNavigate();

  const totalEntradas = pedidos.reduce((total, pedido) => {
    return total + pedido.total;
  }, 0);

  const totalSaidas = 0;
  const saldoFinal = totalEntradas - totalSaidas;

  function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function voltar() {
    navigate(-1);
  }

  function imprimirExtrato() {
    window.print();
  }

  return (
    <main
      className="visualizacao-extrato"
      id="visualizacao-extrato"
    >

      {/* CABEÇALHO */}
      <header
        className="visualizacao-header"
        id="visualizacao-header"
      >
        <div className="empresa-extrato">
          <h1 id="nome-empresa">
            Planeta Animal
          </h1>

          <p id="cnpj-empresa">
            CNPJ: 00.000.000/0001-00
          </p>

          <p id="telefone-empresa">
            Telefone: (21) 90000-0000
          </p>
        </div>

        <div className="titulo-relatorio">
          <h2>
            Extrato Financeiro
          </h2>

          <p>
            Relatório de movimentações
          </p>
        </div>
      </header>

      {/* PERÍODO */}
      <section
        className="periodo-relatorio"
        id="periodo-relatorio"
      >
        <div className="periodo-item">
          <span>Período Inicial</span>

          <strong id="data-inicial-relatorio">
            {pedidos.length > 0
              ? pedidos[pedidos.length - 1].dataCriacao
              : "Nenhuma movimentação"}
          </strong>
        </div>

        <div className="periodo-item">
          <span>Período Final</span>

          <strong id="data-final-relatorio">
            {pedidos.length > 0
              ? pedidos[0].dataCriacao
              : "Nenhuma movimentação"}
          </strong>
        </div>
      </section>

      {/* RESUMO */}
      <section
        className="resumo-relatorio"
        id="resumo-relatorio"
      >
        <article
          className="resumo-relatorio-item entrada"
          id="relatorio-entradas"
        >
          <span>
            Total de Entradas
          </span>

          <strong id="total-entradas-relatorio">
            {formatarMoeda(totalEntradas)}
          </strong>
        </article>

        <article
          className="resumo-relatorio-item saida"
          id="relatorio-saidas"
        >
          <span>
            Total de Saídas
          </span>

          <strong id="total-saidas-relatorio">
            {formatarMoeda(totalSaidas)}
          </strong>
        </article>

        <article
          className="resumo-relatorio-item saldo"
          id="relatorio-saldo"
        >
          <span>
            Saldo do Período
          </span>

          <strong id="saldo-relatorio">
            {formatarMoeda(saldoFinal)}
          </strong>
        </article>
      </section>

      {/* MOVIMENTAÇÕES */}
      <section
        className="movimentacoes-relatorio"
        id="movimentacoes-relatorio"
      >
        <header className="relatorio-section-header">
          <h2>
            Movimentações
          </h2>
        </header>

        {/* CABEÇALHO DA TABELA */}
        <div
          className="relatorio-linha relatorio-cabecalho"
          id="cabecalho-relatorio"
        >
          <span>Data</span>
          <span>Descrição</span>
          <span>Tipo</span>
          <span>Pagamento</span>
          <span>Valor</span>
        </div>

        {/* MOVIMENTAÇÕES DOS PEDIDOS */}
        {pedidos.length > 0 ? (
          pedidos.map((pedido, index) => (
            <article
              className="relatorio-linha"
              key={pedido.id}
            >
              <span>
                {pedido.dataCriacao}
              </span>

              <strong>
                Venda Pedido #
                {String(index + 1).padStart(6, "0")}
              </strong>

              <span className="tipo-entrada">
                Entrada
              </span>

              <span>
                Não informado
              </span>

              <strong className="valor-entrada">
                + {formatarMoeda(pedido.total)}
              </strong>
            </article>
          ))
        ) : (
          <p>
            Nenhuma movimentação encontrada.
          </p>
        )}
      </section>

      {/* TOTAL FINAL */}
      <section
        className="total-final-relatorio"
        id="total-final-relatorio"
      >
        <span>
          Saldo Final
        </span>

        <strong id="saldo-final">
          {formatarMoeda(saldoFinal)}
        </strong>
      </section>

      {/* AÇÕES */}
      <section
        className="acoes-relatorio"
        id="acoes-relatorio"
      >
        <button
          type="button"
          className="botao-voltar-extrato"
          id="botao-voltar-extrato"
          onClick={voltar}
        >
          Voltar
        </button>

        <button
          type="button"
          className="botao-imprimir-extrato"
          id="botao-imprimir-extrato"
          onClick={imprimirExtrato}
        >
          Imprimir Extrato
        </button>
      </section>

      {/* RODAPÉ */}
      <footer
        className="rodape-relatorio"
        id="rodape-relatorio"
      >
        <p>
          Planeta Animal
        </p>

        <span>
          Relatório gerado pelo sistema
        </span>
      </footer>

    </main>
  );
}

export default VisualizacaoExtrato;

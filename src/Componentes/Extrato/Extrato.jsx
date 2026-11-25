
import "./Extrato.css";

function Extrato({ pedidos = [] }) {
  const totalEntradas = pedidos.reduce((total, pedido) => {
    return total + pedido.total;
  }, 0);

  const totalSaidas = 0;

  const saldoAtual = totalEntradas - totalSaidas;

  function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <main className="extrato" id="extrato">

      {/* CABEÇALHO */}
      <header className="extrato-header" id="extrato-header">
        <div>
          <h1>Extrato</h1>

          <p>
            Consulte as movimentações financeiras da loja.
          </p>
        </div>
      </header>

      {/* RESUMO FINANCEIRO */}
      <section className="resumo-extrato" id="resumo-extrato">

        {/* SALDO */}
        <article className="resumo-card saldo-atual" id="saldo-atual">
          <span>Saldo Atual</span>

          <strong id="valor-saldo">
            {formatarMoeda(saldoAtual)}
          </strong>
        </article>

        {/* ENTRADAS */}
        <article className="resumo-card total-entradas" id="total-entradas">
          <span>Total de Entradas</span>

          <strong id="valor-entradas">
            {formatarMoeda(totalEntradas)}
          </strong>
        </article>

        {/* SAÍDAS */}
        <article className="resumo-card total-saidas" id="total-saidas">
          <span>Total de Saídas</span>

          <strong id="valor-saidas">
            {formatarMoeda(totalSaidas)}
          </strong>
        </article>
      </section>

      {/* FILTROS */}
      <section className="filtros-extrato" id="filtros-extrato">

        {/* PERÍODO */}
        <div className="campo-extrato">
          <label htmlFor="periodo-extrato">
            Período:
          </label>

          <select id="periodo-extrato">
            <option value="">Selecione</option>
            <option value="hoje">Hoje</option>
            <option value="semana">Esta semana</option>
            <option value="mes">Este mês</option>
            <option value="personalizado">Personalizado</option>
          </select>
        </div>

        {/* DATA */}
        <div className="campo-extrato">
          <label htmlFor="data-inicial">
            Data Inicial:
          </label>

          <input
            id="data-inicial"
            type="date"
          />
        </div>

        {/* TIPO */}
        <div className="campo-extrato">
          <label htmlFor="tipo-movimentacao">
            Tipo:
          </label>

          <select id="tipo-movimentacao">
            <option value="">Todos</option>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>
        </div>

        {/* BOTÃO */}
        <button
          type="button"
          className="botao-filtrar"
      id="botao-filtrar-extrato"
        >
          Filtrar
        </button>
      </section>

      {/* LISTA DE MOVIMENTAÇÕES */}
      <section className="lista-extrato" id="lista-extrato">

        <header className="lista-extrato-header">
          <h2>Movimentações</h2>
        </header>

        {/* CABEÇALHO */}
        <div
          className="movimentacao-linha movimentacao-cabecalho"
          id="cabecalho-movimentacoes"
        >
          <span>Data</span>
          <span>Descrição</span>
          <span>Tipo</span>
          <span>Pagamento</span>
          <span>Valor</span>
        </div>

        {/* PEDIDOS */}
        {pedidos.length > 0 ? (
          pedidos.map((pedido, index) => (
            <article
              className="movimentacao-linha"
              key={pedido.id}
            >
              <span>
                {pedido.dataCriacao}
              </span>

              <strong>
                Venda Pedido #{String(index + 1).padStart(6, "0")}
              </strong>

              <span className="movimentacao-entrada">
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
            Nenhuma movimentação registrada.
          </p>
        )}
      </section>

      {/* SALDO DO PERÍODO */}
      <section className="saldo-periodo" id="saldo-periodo">
        <span>
          Saldo do período:
        </span>

        <strong id="valor-saldo-periodo">
          {formatarMoeda(saldoAtual)}
        </strong>
      </section>

    </main>
  );
}

export default Extrato;

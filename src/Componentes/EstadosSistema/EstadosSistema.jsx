
import { useState } from "react";
import "./EstadosSistema.css";

function EstadosSistema() {
  const [conectado, setConectado] = useState(navigator.onLine);
  const [ultimaVerificacao, setUltimaVerificacao] = useState(
    new Date()
  );

  function atualizarStatus() {
    setConectado(navigator.onLine);
    setUltimaVerificacao(new Date());
  }

  function formatarData(data) {
    return data.toLocaleString("pt-BR");
  }

  return (
    <main
      className="estados-sistema"
      id="estados-sistema"
    >

      {/* CABEÇALHO */}
      <header
        className="estados-header"
        id="estados-header"
      >
        <div>
          <h1>Estados do Sistema</h1>

          <p>
            Consulte o estado atual dos serviços e funcionalidades do sistema.
          </p>
        </div>

        <span
          className={`status-geral ${
            conectado ? "sistema-operacional" : ""
          }`}
          id="status-geral"
        >
          {conectado ? "Sistema operacional" : "Sem conexão"}
        </span>
      </header>

      {/* STATUS DOS SERVIÇOS */}
      <section
        className="servicos-status"
        id="servicos-status"
      >

        <h2>Status dos Serviços</h2>

        {/* FRONT-END */}
        <article
          className="servico-card servico-online"
          id="status-frontend"
        >
          <div className="servico-indicador">
            <span
              className="indicador indicador-verde"
              id="indicador-frontend"
            ></span>
          </div>

          <div className="servico-info">
            <h3>Front-end</h3>

            <p>
              Aplicação carregada e funcionando.
            </p>

            <span
              className="servico-status"
              id="texto-status-frontend"
            >
              Online
            </span>
          </div>
        </article>

        {/* BACK-END */}
        <article
          className="servico-card"
          id="status-backend"
        >
          <div className="servico-indicador">
            <span
              className="indicador"
              id="indicador-backend"
            ></span>
          </div>

          <div className="servico-info">
            <h3>Back-end</h3>

            <p>
              Serviço ainda não implementado.
            </p>

            <span
              className="servico-status"
              id="texto-status-backend"
            >
              Não configurado
            </span>
          </div>
        </article>

        {/* BANCO DE DADOS */}
        <article
          className="servico-card"
          id="status-banco"
        >
          <div className="servico-indicador">
            <span
              className="indicador"
              id="indicador-banco"
            ></span>
          </div>

          <div className="servico-info">
            <h3>Banco de Dados</h3>

            <p>
              Banco de dados ainda não conectado.
            </p>

            <span
              className="servico-status"
              id="texto-status-banco"
            >
              Não conectado
            </span>
          </div>
        </article>

        {/* CONEXÃO */}
        <article
          className={`servico-card ${
            conectado ? "servico-online" : ""
          }`}
          id="status-conexao"
        >
          <div className="servico-indicador">
            <span
              className={`indicador ${
                conectado ? "indicador-verde" : ""
              }`}
              id="indicador-conexao"
            ></span>
          </div>

          <div className="servico-info">
            <h3>Conexão</h3>

            <p>
              Verificação da conexão com a internet.
            </p>

            <span
              className="servico-status"
              id="texto-status-conexao"
            >
              {conectado ? "Conectado" : "Sem conexão"}
            </span>
          </div>
        </article>

      </section>

      {/* ÚLTIMA VERIFICAÇÃO */}
      <section
        className="ultima-verificacao"
        id="ultima-verificacao"
      >
        <div>
          <span>Última verificação</span>

          <strong id="data-verificacao">
            {formatarData(ultimaVerificacao)}
          </strong>
        </div>

        <button
          type="button"
          className="botao-atualizar-status"
          id="botao-atualizar-status"
          onClick={atualizarStatus}
        >
          Atualizar Status
        </button>
      </section>

      {/* INFORMAÇÕES DO SISTEMA */}
      <section
        className="informacoes-sistema"
        id="informacoes-sistema"
      >
        <h2>Informações do Sistema</h2>

        <div className="informacoes-grid">

          <div className="informacao-item">
            <span>Versão do sistema</span>

            <strong id="versao-sistema">
              1.0.0
            </strong>
          </div>

          <div className="informacao-item">
            <span>Ambiente</span>

            <strong id="ambiente-sistema">
              Desenvolvimento
            </strong>
          </div>

          <div className="informacao-item">
            <span>Status geral</span>

            <strong
              className="status-operacional"
              id="status-operacional"
            >
              {conectado ? "Operacional" : "Sem conexão"}
            </strong>
          </div>

        </div>
      </section>

    </main>
  );
}

export default EstadosSistema;

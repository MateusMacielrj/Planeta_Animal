
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NovoPedido({ setPedidos }) {
  const navigate = useNavigate();

  // Dados do cliente
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [complemento, setComplemento] = useState("");

  // Dados do produto
  const [nomeProduto, setNomeProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");

  // Produtos adicionados ao pedido atual
  const [produtos, setProdutos] = useState([]);

  // Adicionar produto
  function adicionarProduto(event) {
    event.preventDefault();

    const quantidadeNumerica = Number(quantidade);
    const valorNumerico = Number(valorUnitario);

    if (
      !nomeProduto.trim() ||
      !quantidade.trim() ||
      !unidade ||
      valorUnitario === "" ||
      !Number.isFinite(quantidadeNumerica) ||
      !Number.isFinite(valorNumerico) ||
      quantidadeNumerica <= 0 ||
      valorNumerico < 0
    ) {
      alert("Preencha corretamente todos os campos do produto.");
      return;
    }

    const novoProduto = {
      id: crypto.randomUUID(),
      nome: nomeProduto.trim(),
      quantidade: quantidadeNumerica,
      unidade,
      valorUnitario: valorNumerico,
    };

    setProdutos((produtosAtuais) => [
      ...produtosAtuais,
      novoProduto,
    ]);

    // Limpar campos do produto
    setNomeProduto("");
    setQuantidade("");
    setUnidade("");
    setValorUnitario("");
  }

  // Remover produto
  function removerProduto(id) {
    setProdutos((produtosAtuais) =>
      produtosAtuais.filter((produto) => produto.id !== id)
    );
  }

  // Calcular total
  const totalPedido = produtos.reduce((total, produto) => {
    return total + produto.quantidade * produto.valorUnitario;
  }, 0);

  // Criar pedido
  function criarPedido(event) {
    event.preventDefault();

    if (!nome.trim() || !telefone.trim() || !endereco.trim()) {
      alert("Preencha o nome, telefone e endereço do cliente.");
      return;
    }

    if (produtos.length === 0) {
      alert("Adicione pelo menos um produto ao pedido.");
      return;
    }

    const novoPedido = {
      id: crypto.randomUUID(),
      cliente: {
        nome: nome.trim(),
        telefone: telefone.trim(),
        endereco: endereco.trim(),
        complemento: complemento.trim(),
      },
      produtos: [...produtos],
      total: totalPedido,
      dataCriacao: new Date().toLocaleString("pt-BR"),
    };

    // Enviar o pedido ao estado compartilhado no App.jsx
    setPedidos((pedidosAtuais) => [
      ...pedidosAtuais,
      novoPedido,
    ]);

    // Limpar formulário após criar o pedido
    setNome("");
    setTelefone("");
    setEndereco("");
    setComplemento("");
    setNomeProduto("");
    setQuantidade("");
    setUnidade("");
    setValorUnitario("");
    setProdutos([]);

    alert("Pedido criado com sucesso!");

    // Encaminhar o pedido para a Comanda
    navigate("/comanda", {
      state: { pedido: novoPedido },
    });
  }

  return (
    <main className="novo-pedido">
      <h1>Novo Pedido</h1>

      <form onSubmit={criarPedido}>
        {/* DADOS DO CLIENTE */}
        <section className="card">
          <h2>Dados do Cliente</h2>

          <div className="form-cliente">
            <div className="campo">
              <label htmlFor="nome">Nome do cliente *</label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                placeholder="Digite o nome do cliente"
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="telefone">Telefone *</label>
              <input
                id="telefone"
                type="tel"
                value={telefone}
                onChange={(event) => setTelefone(event.target.value)}
                placeholder="Digite o telefone"
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="endereco">Endereço *</label>
              <input
                id="endereco"
                type="text"
                value={endereco}
                onChange={(event) => setEndereco(event.target.value)}
                placeholder="Rua, número e bairro"
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="complemento">Complemento</label>
              <input
                id="complemento"
                type="text"
                value={complemento}
                onChange={(event) => setComplemento(event.target.value)}
                placeholder="Casa, apartamento, referência..."
              />
            </div>
          </div>
        </section>

        {/* PRODUTOS */}
        <section className="card">
          <h2>Produtos</h2>

          <div className="form-produto">
            <div className="campo">
              <label htmlFor="nomeProduto">Nome do produto *</label>
              <input
                id="nomeProduto"
                type="text"
                value={nomeProduto}
                onChange={(event) => setNomeProduto(event.target.value)}
                placeholder="Nome do produto"
              />
            </div>

            <div className="campo">
              <label htmlFor="quantidade">Quantidade *</label>
              <input
                id="quantidade"
                type="number"
                min="0.01"
                step="any"
                value={quantidade}
                onChange={(event) => setQuantidade(event.target.value)}
                placeholder="Ex.: 2"
              />
            </div>

            <div className="campo">
              <label htmlFor="unidade">Unidade *</label>
              <select
                id="unidade"
                value={unidade}
                onChange={(event) => setUnidade(event.target.value)}
              >
                <option value="">Selecione</option>
                <option value="kg">Quilograma (kg)</option>
                <option value="g">Grama (g)</option>
                <option value="unidade">Unidade</option>
                <option value="saco">Saco</option>
                <option value="pacote">Pacote</option>
                <option value="litro">Litro</option>
              </select>
            </div>

            <div className="campo">
              <label htmlFor="valorUnitario">Valor unitário (R$) *</label>
              <input
                id="valorUnitario"
                type="number"
                min="0"
                step="0.01"
                value={valorUnitario}
                onChange={(event) => setValorUnitario(event.target.value)}
                placeholder="Ex.: 25.90"
              />
            </div>

            <button
              type="button"
              className="botao-adicionar"
              onClick={adicionarProduto}
            >
              Adicionar Produto
            </button>
          </div>

          {/* LISTA DE PRODUTOS */}
          {produtos.length > 0 && (
            <div className="lista-produtos">
              <h3>Produtos adicionados</h3>

              <ul>
                {produtos.map((produto) => (
                  <li key={produto.id}>
                    <strong>{produto.nome}</strong>

                    <p>
                      Quantidade: {produto.quantidade} {produto.unidade}
                    </p>

                    <p>
                      Valor unitário:{" "}
                      {produto.valorUnitario.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>

                    <p>
                      Subtotal:{" "}
                      {(
                        produto.quantidade * produto.valorUnitario
                      ).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>

                    <button
                      type="button"
                      onClick={() => removerProduto(produto.id)}
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>

              <h3>
                Total do pedido:{" "}
                {totalPedido.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h3>
            </div>
          )}
        </section>

        {/* FINALIZAÇÃO DO PEDIDO */}
        <div className="acoes-pedido">
          <button
            type="submit"
            className="botao-criar-pedido"
          >
            Criar Pedido
          </button>
        </div>
      </form>
    </main>
  );
}

export default NovoPedido;

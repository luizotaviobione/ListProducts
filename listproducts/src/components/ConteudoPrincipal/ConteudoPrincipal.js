import React, { Component } from "react";
import "./ConteudoPrincipal.css";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import Item from "./Item";
import swal from "sweetalert";

class ConteudoPrincipal extends Component {
  constructor() {
    super();
    this.id = 0;
  }
  state = {
    done: false,
    doneadd: false,
    arrayItens: [],
  };

  teste = () => {
    let auxiliar = this.state.done;
    console.log(auxiliar);
    this.setState({
      done: true,
    });
  };
  fecharFormulario = () => {
    this.setState({
      done: false,
    });
  };
  adicionarItem = () => {
    let item = {
      nome: document.getElementById("nome").value,
      valor: parseFloat(document.getElementById("valor").value),
      estoque: parseFloat(document.getElementById("estoque").value),
      url: document.getElementById("url").value,
      id: this.id,
    };

    if (item.nome === "" || item.valor === "" || item.estoque === "") {
      swal("Erro!", "Preencha os dados restantes", "error");
    } else {
      let itensArray = [...this.state.arrayItens];
      this.setState({
        arrayItens: [...itensArray, item],
        doneadd: true,
      });
      this.id = this.id + 1;
    }
  };

  venderItem = (id, e) => {
    const index = this.state.arrayItens.findIndex((p) => {
      return p.id === id;
    });
    if (e.target.value === "venda") {
      var x = document.querySelectorAll(".input-qtd");
    } else {
      x = document.querySelectorAll(".input-qtd-add");
    }

    let estoque = parseFloat(x[index].value);
    console.log(estoque);

    let array = [...this.state.arrayItens];
    array.forEach((item, indexArray) => {
      if (indexArray === index) {
        if (e.target.value === "venda") {
          if (item.estoque >= estoque) {
            item.estoque -= estoque;
            this.setState({
              arrayItens: [...array],
            });
          } else {
            swal(
              "Não é possivel realizar a venda!",
              "A quantidade de item em estoque é menor que a digitada",
              "error"
            );
          }
        } else if (e.target.value === "adicionar") {
          console.log("entrei aqui");
          item.estoque += estoque;
          this.setState({
            arrayItens: [...array],
          });
        }
      }
    });
  };
  deletarItem = (id, e) => {
    swal({
      title: "Você tem certeza?",
      text: "O item selecionado será removido da Lista de produtos",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const index = this.state.arrayItens.findIndex((p) => {
          return p.id === id;
        });
        let array = [...this.state.arrayItens];
        array.splice(index, 1);
        this.setState({
          arrayItens: [...array],
        });
        swal("O item foi removido da Lista de Produtos", {
          icon: "success",
        });
      } else {
        swal("O item não foi deletado");
      }
    });
  };

  render() {
    console.log(this.state.arrayItens);
    let form = null;
    let itensTeste = null;

    if (this.state.done === true) {
      form = (
        <div className="formulario">
          <div className="pointerClose">
            <CancelPresentationIcon onClick={this.fecharFormulario} />
          </div>
          <form>
            <div>
              <label for="nome">Nome: </label>
              <input required type="text" id="nome" />
            </div>
            <div>
              <label for="valor">Valor: </label>
              <input required type="number" id="valor" />
            </div>
            <div>
              <label for="estoque">Estoque: </label>
              <input required type="number" id="estoque" />
            </div>
            <div>
              <label for="url">URL Image: </label>
              <input type="URL" id="url" placeholder="Opcional (png ou svg)" />
            </div>
          </form>
          <button onClick={this.adicionarItem}>Adicionar</button>
        </div>
      );
    }
    /*checar depois quando inserir banco de dados*/
    if (this.state.doneadd) {
      itensTeste = (
        <div className="caixa-itens">
          {this.state.arrayItens.map((item) => {
            return (
              <Item
                nome={item.nome}
                valor={item.valor}
                estoque={item.estoque}
                url={item.url}
                funcao={this.venderItem}
                deletarItem={this.deletarItem}
                id={item.id}
              />
            );
          })}
        </div>
      );
    }

    return (
      <div className="conteudo-principal">
        <div className="titulo-Conteudo">
          <h2>
            Produtos <span className="format-title">Cadastrados</span>
          </h2>
        </div>
        <div className="container">
          <div>{itensTeste}</div>
          <div className="botao-adicionar-novo">
            <button onClick={this.teste}>Adicionar Novo item</button>
          </div>
          <div>{form}</div>
        </div>
      </div>
    );
  }
}
export default ConteudoPrincipal;

import React, { Component } from "react";
import "./ConteudoPrincipal.css";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import Item from "./Item";
import swal from "sweetalert";
import axios from "axios";

class ConteudoPrincipal extends Component {
  constructor() {
    super();
    this.id = 0;
    this.produtos = [];

    /*pegar produtos da api e adicionar na lista de Produtos*/
    axios.get("http://localhost:5000/v1/products").then((response) => {
      let array = response.data;
      this.setState({
        arrayItens: [...array],
      });
    });
  }
  state = {
    done: false,
    doneadd: false,
    arrayItens: [],
  };

  //ao apertar o botao de adicionar ele abre o formulário*/
  abrirFormulario = () => {
    let auxiliar = this.state.done;
    /*seta o estado de done para true e o formulario é aberto ao renderizar a pagina*/
    this.setState({
      done: true,
    });
  };
  /*ao apertar no x do formulário ele o fecha*/
  fecharFormulario = () => {
    this.setState({
      done: false,
    });
  };

  /*adicionar um item para a lista de produtos*/
  adicionarItem = () => {
    /*pego os valores dos inputs digitados pelo usuario e armazeno em um objeto chamado item*/
    let item = {
      nome: document.getElementById("nome").value,
      valor: parseFloat(document.getElementById("valor").value),
      estoque: parseFloat(document.getElementById("estoque").value),
      url: document.getElementById("url").value,
      id: this.id,
    };

    /*caso algum dos inputs estejam vazios eu mando um aviso para o usuário digitar novamente os dados*/
    if (item.nome === "" || isNaN(item.valor) || isNaN(item.estoque)) {
      swal("Erro!", "Preencha os dados restantes", "error");
    } else {
      /*caso todos estejam preenchidos eu adiciono no banco de dados e seto o estado de ArrayItens para receber nele o novo produtos*/
      axios.post("http://localhost:5000/v1/products", {
        nome: item.nome,
        valor: item.valor,
        estoque: item.estoque,
        url: item.url,
        id: item.id,
      });

      let itensArray = [...this.state.arrayItens];
      this.setState({
        arrayItens: [...itensArray, item],
        doneadd: true,
      });

      this.id = this.id + 1;
    }
  };

  venderOuAddEstoque = (id, e) => {
    //recebo como argumento o id do produto e procuro onde ele se encontra no array de items e retorno seu indice
    const index = this.state.arrayItens.findIndex((p) => {
      return p.id === id;
    });
    /*caso seja realizada uma venda */
    if (e.target.value === "venda") {
      var input = document.querySelectorAll(".input-qtd");
    } else {
      /*caso seja adicionado mais estoque */
      input = document.querySelectorAll(".input-qtd-add");
    }

    /*vejo quanto foi o valor que foi digitado pelo usuario e adiciono numa variavel chamada estoque*/
    let estoque = parseFloat(input[index].value);

    let array = [...this.state.arrayItens];
    /*percorro um laço para encontrar o elemento que eu quero mudar o estoque*/
    array.forEach((item, indexArray) => {
      if (indexArray === index) {
        /*caso seja uma venda eu diminuo o estoque*/
        if (e.target.value === "venda") {
          if (item.estoque >= estoque) {
            item.estoque -= estoque;
            this.setState({
              arrayItens: [...array],
            });
            /*
            //testando o put com o axios 
            axios
              .get(`http://localhost:5000/v1/products/${id}`)
              .then((response) => {
                let array = response.data;
                console.log(array);
              });*/
            /*
            axios
              .put(`http://localhost:5000/v1/products/${id}`, array)
              .then((response) => {
                console.log("teste");
              });
              */
          } else {
            /*caso o numero digitado pelo usuario seja maior que o estoque contido eu informo o erro*/
            swal(
              "Não é possivel realizar a venda!",
              "A quantidade de item em estoque é menor que a digitada",
              "error"
            );
          }
        } else if (e.target.value === "adicionar") {
          /*caso seja adicionado estoque eu adiciono em seu total*/
          console.log("entrei aqui");
          item.estoque += estoque;
          this.setState({
            arrayItens: [...array],
          });
        }
      }
    });
  };

  /*funcao para deletar item*/
  deletarItem = (id, e) => {
    /*alert para perguntar ao usuario se ele realmente quer deletar*/
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

  /*funcao para filtrar o estoque por quantidade*/
  filtrarEstoque = (e) => {
    //console.log(e.target.value);
    console.log("entrei aq");
    let sort = e.target.value;
    let array = [...this.state.arrayItens];
    console.log(array);
    let arrayAtualizado = array.slice().sort(function (a, b) {
      if (sort === "Menor QTD") {
        if (a.estoque < b.estoque) {
          console.log(a.estoque, b.estoque);
          return -1;
        }
        if (a.estoque > b.estoque) {
          console.log(a.estoque, b.estoque);
          return 1;
        }
      }
      if (sort === "Maior QTD") {
        if (a.estoque > b.estoque) {
          return -1;
        }
        if (a.estoque < b.estoque) {
          return 1;
        }
      }

      return 1;
    });

    this.setState({
      arrayItens: [...arrayAtualizado],
    });
  };

  /*funcao para filtrar valor*/
  filtrarValor = (e) => {
    //console.log(e.target.value);
    let sort = e.target.value;
    let array = [...this.state.arrayItens];
    console.log(array);
    let arrayAtualizado = array.slice().sort(function (a, b) {
      if (sort === "Menor Valor") {
        if (a.valor < b.valor) {
          return -1;
        }
        if (a.valor > b.valor) {
          //console.log(a.estoque, b.estoque);
          return 1;
        }
      }
      if (sort === "Maior Valor") {
        if (a.valor > b.valor) {
          return -1;
        }
        if (a.valor < b.valor) {
          return 1;
        }
      }
      return 1;
    });

    this.setState({
      arrayItens: [...arrayAtualizado],
    });
  };

  render() {
    let form = null;
    let itemTela = null;

    if (this.state.done === true) {
      form = (
        <div className="formulario">
          <div className="pointerClose">
            <CancelPresentationIcon onClick={this.fecharFormulario} />
          </div>
          <form>
            <div>
              <label htmlFor="nome">Nome: </label>
              <input required type="text" id="nome" />
            </div>
            <div>
              <label htmlFor="valor">Valor: </label>
              <input required type="number" id="valor" />
            </div>
            <div>
              <label htmlFor="estoque">Estoque: </label>
              <input required type="number" id="estoque" />
            </div>
            <div>
              <label htmlFor="url">URL Image: </label>
              <input type="URL" id="url" placeholder="Opcional (png ou svg)" />
            </div>
          </form>
          <button onClick={this.adicionarItem}>Adicionar</button>
        </div>
      );
    }
    /*checar depois quando inserir banco de dados*/

    itemTela = (
      <div className="caixa-itens">
        {this.state.arrayItens.map((item) => {
          return (
            <Item
              nome={item.nome}
              valor={item.valor}
              estoque={item.estoque}
              url={item.url}
              funcao={this.venderOuAddEstoque}
              deletarItem={this.deletarItem}
              id={item.id}
              key={item.id}
            />
          );
        })}
      </div>
    );

    return (
      <div className="conteudo-principal">
        <div className="titulo-Conteudo">
          <h2>
            Produtos <span className="format-title">Cadastrados</span>
          </h2>
        </div>
        <div className="container filtros">
          <div className="mr-3">
            filtrar Estoque
            <select onChange={this.filtrarEstoque}>
              <option value="Maior QTD">Maior QTD</option>
              <option value="Menor QTD">Menor QTD</option>
            </select>
          </div>
          <div>
            Filtrar valor
            <select onChange={this.filtrarValor}>
              <option value="Maior Valor">Maior Valor </option>
              <option value="Menor Valor">Menor Valor</option>
            </select>
          </div>
        </div>
        <div className="container">
          <div>{itemTela}</div>
          <div className="botao-adicionar-novo">
            <button onClick={this.abrirFormulario}>Adicionar Novo item</button>
          </div>
          <div>{form}</div>
        </div>
      </div>
    );
  }
}
export default ConteudoPrincipal;

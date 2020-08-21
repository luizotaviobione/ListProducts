import React from "react";
import "./ConteudoPrincipal.css";

function Item(props) {
  var image = props.url;
  /*
  if (props.url === "") {
    image = "https://image.flaticon.com/icons/svg/679/679821.svg";
  }
  */
  const addDefaultSrc = (e) => {
    e.target.src = "https://image.flaticon.com/icons/svg/679/679821.svg";
  };

  return (
    <div className="teste">
      <img
        alt="item"
        onError={addDefaultSrc}
        src={image}
        width="200px"
        height="200px"
      ></img>
      <h4>{props.nome}</h4>
      <h4>{props.valor} R$</h4>
      <h4>Estoque: {props.estoque} itens</h4>
      <div className="form-item">
        <input type="number" className="input-qtd" id={props.id}></input>
        <button value="venda" onClick={props.funcao.bind(this, props.id)}>
          Realizar Venda
        </button>
      </div>
      <div className="form-item">
        <input type="number" className="input-qtd-add" id={props.id}></input>
        <button value="adicionar" onClick={props.funcao.bind(this, props.id)}>
          Adicionar Estoques
        </button>
      </div>
      <div className="form-item">
        <button onClick={props.deletarItem.bind(this, props.id)}>
          Excluir item
        </button>
      </div>

      {/*<div>
        <button onClick={props.funcao}>Adicionar Estoque</button>
      </div>
      <div>
        <button onClick={props.funcao}>Excluir item</button>
      </div>*/}
    </div>
  );
}

export default Item;

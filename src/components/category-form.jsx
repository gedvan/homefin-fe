import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import PropTypes from "prop-types";

/**
 * Formulário de cadastro ou edição de uma categoria que aparece na forma de um modal.
 */
class CategoryForm extends Component {

  static propTypes = {
    /**
     * Mostrar ou não o modal.
     */
    show: PropTypes.bool,

    /**
     * Modo do formulário: adicionar nova (new) ou editar existente (edit).
     */
    mode: PropTypes.oneOf(['new', 'edit']),

    /**
     * Tipo da categoria: entrada (I) ou saída (O).
     */
    type: PropTypes.oneOf(['I', 'O']),

    /**
     * Função chamada quando o model é fechado (via close button).
     *
     * @param {SyntheticEvent} event
     */
    onHide: PropTypes.func,

    /**
     * Função chamada quando o botão de Salvar é acionado.
     *
     * @param {SyntheticEvent} event
     */
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    show: false,
    mode: 'new',
    type: 'I'
  }

  /**
   * Lista de possíveis tipos de categorias.
   *
   * @type {{I: string, O: string}}
   */
  static types = {
    'I': 'Entrada',
    'O': 'Saída'
  }

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: '',
      type: 'I'
    };
    this.handleHide   = this.handleHide.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Manipulador do evento de fechar a janela.
   *
   * @param {SyntheticEvent} event
   */
  handleHide(event) {
    // Limpa o estado do componente e notifica o pai sobre o evento.
    this.setState({
      id: 0,
      name: '',
      type: ''
    });
    if (typeof this.props.onHide === 'function') {
      this.props.onHide(event);
    }
  }

  /**
   * Função executada quando o componente sofre alguma alteração.
   *
   * @param prevProps
   * @param prevState
   * @param snapshot
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    // Quando a propriedade type é modificada pelo componente pai, reflete a alteração para o estado "type"
    if (prevProps.type !== this.props.type) {
      this.setState({type: this.props.type})
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (typeof this.props.onSubmit === 'function') {
      const values = {
        name: this.state.name,
        type: this.state.type,
      };
      if (this.props.mode === 'edit') {
        values.id = this.state.id;
      }
      this.props.onSubmit(values);
    }
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSubmit} id="category-form">
            <div className="form-group">
              <label htmlFor="category-name">Nome</label>
              <input type="text" id="category-name" name="name" className="form-control" value={this.state.name}
                     onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="category-type">Tipo</label>
              <select id="category-type" name="type" className="form-control" value={this.state.type}
                      onChange={this.handleChange}>
                <option value="I">Entrada</option>
                <option value="O">Saída</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
            <button type="submit" form="category-form" className="btn btn-primary">
              {this.props.mode === 'new' ? 'Cadastrar' : 'Salvar'}
            </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CategoryForm;

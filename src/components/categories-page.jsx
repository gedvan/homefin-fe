import React, {Component} from "react";
import {Button, Col, Row} from "react-bootstrap";
import CategoriesTree from "./categories-tree";
import CategoryForm from "./category-form";

class CategoriesPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      incomeCategories: [],
      outcomeCategories: [],
      modalShow: false,
      modalMode: 'new',
      modalType: 'I',
      modalCategory: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleModalHide = this.handleModalHide.bind(this);
    this.handleModalSubmit  = this.handleModalSubmit.bind(this);
  }

  componentDidMount() {
    const url = 'http://localhost:8888/categories';
    window.fetch(url)
      .then(response => response.json())
      .then(categories => {
        this.setState({
          incomeCategories: categories.filter(category => category.type === 'I'),
          outcomeCategories: categories.filter(category => category.type === 'O')
        });
      })
      .catch(err => console.log(err));
  }

  handleClick(event) {
    if (event.target?.getAttribute('data-action') === 'new-category') {
      this.setState({
        modalShow: true,
        modalMode: 'new',
        modalType: event.target.getAttribute('data-category-type'),
      });
    }
  }

  handleModalHide(event) {
    this.setState({modalShow: false});
  }

  handleModalSubmit(values) {
    const url = 'http://localhost:8888/categories/save';
    window.fetch(url, {
      method: "POST",
      body: JSON.stringify(values),
      headers: new Headers({
        "Content-Type": "application/json;charset=utf-8"
      })
    })
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="categories-page">
        <h1 className="main-title">Categorias</h1>
        <Row>
          <Col>
            <section className="entradas">
              <header className="d-flex mb-3 align-items-center">
                <h3 className="local-title">Entradas</h3>
                <Button variant="primary" size="sm" className="ml-auto" data-action="new-category" data-category-type="I"
                        onClick={this.handleClick}>+ Nova categoria</Button>
              </header>
              <CategoriesTree type="I" categories={this.state.incomeCategories} />
            </section>
          </Col>
          <Col>
            <section className="saidas">
              <header className="d-flex mb-3 align-items-center">
                <h3 className="local-title">Saídas</h3>
                <Button variant="primary" size="sm" className="ml-auto" data-action="new-category" data-category-type="O"
                        onClick={this.handleClick}>+ Nova categoria</Button>
              </header>
              <CategoriesTree type="O" categories={this.state.outcomeCategories} />
            </section>
          </Col>
        </Row>
        <CategoryForm show={this.state.modalShow} onHide={this.handleModalHide}
                      mode={this.state.modalMode} type={this.state.modalType}
                      onSubmit={this.handleModalSubmit}></CategoryForm>
      </div>
    )
  }
}

export default CategoriesPage;

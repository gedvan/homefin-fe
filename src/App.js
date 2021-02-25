import React from 'react';
import './App.scss';
import {Container, Nav, Navbar} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import CategoriesPage from "./components/categories-page";

function App() {
  return (
    <div id="app-wrapper">
      <Router>
        <header id="app-header">
          <Navbar variant="dark" bg="dark" expand="lg">
            <Container>
              <Link to="/" className="navbar-brand">HomeFin</Link>
              <Navbar.Toggle aria-controls="navbar-nav" />
              <Navbar.Collapse id="navbar-nav">
                <Nav className="mr-auto">
                  <Link to="/transactions" className="nav-link">Movimentações</Link>
                  <Link to="/categories" className="nav-link">Categorias</Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main id="app-main" role="main" className="mt-4">
          <Container>
            <Switch>
              <Route exact path="/">
                Início
              </Route>
              <Route path="/transactions">
                <h1>Movimentações</h1>
              </Route>
              <Route path="/categories">
                <CategoriesPage />
              </Route>
            </Switch>
          </Container>
        </main>
      </Router>
    </div>
  );
}

export default App;

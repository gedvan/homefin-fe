import React, { Component } from "react";
import {Button} from "react-bootstrap";

class CategoriesTree extends Component {
  render() {
    return (
      <div className="categories-tree">
        <ul className="categories">
          {this.props.categories.map(category =>
            <li key={category.id}>
              <div className="category d-flex align-items-center">
                {category.name}
                <Button variant="link" size="sm" className="ml-auto">+ Nova subcategoria</Button>
              </div>
              {category.sub.length > 0 &&
                <ul className="subcategories">
                  {category.sub.map(sub =>
                    <li key={sub.id}>
                      <div className="subcategory">{sub.name}</div>
                    </li>
                  )}
                </ul>
              }
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default CategoriesTree;

import React, { Component } from 'react';

class List extends Component {

  constructor(){
     super();
     this.state = { products: [] }
  }

  componentWillMount(){
      fetch("http://localhost:3003/products", {
         method:'GET',
         header:{'content-type':'application/json'}
      }).then((res => res.json()))
        .catch(error => console.log('Hay un error al traer los datos'))
        .then((get_products) => {
          this.setState({ products: get_products });
          console.log(get_products);
        })
  }


    render() {

  const list_ = this.state.products.map((product, i) => {
      return(
       <li className="list-group-item" key={i} >
          <span className="badge badge-danger mr-2">#{this.state.products[i].id}</span>
          {this.state.products[i].name}
          <span className="badge badge-danger ml-2">${this.state.products[i].price}</span>
          <span className="badge badge-danger ml-2">{this.state.products[i].existence}</span>
        </li>
     );
  })


      return(
          <div className="col-6 ml-4 mr-5">
            <ul className="list-group">
             {list_}
            </ul>
          </div>
     );
   }
}

export default List;

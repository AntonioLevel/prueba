import React, { Component } from 'react';

class Form extends Component {


    constructor(props){
       super(props);
       this.state = {
         products: []
    }

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

    MakeSale(event){
      event.preventDefault();
      console.log(parseInt(this.refs.id_input.value));
      console.log(this.state.products[this.refs.id_input.value - 1])

     let id_ = parseInt(this.refs.id_input.value ) - 1;

     let existence = this.state.products[id_].existence;

     if (existence >= this.refs.quantity_input.value){

         let data = {

           id: parseInt(this.refs.id_input.value),
           name: this.state.products[id_].name,
           price: this.state.products[id_].price,
           existence: existence - this.refs.quantity_input.value,

         }

         fetch("http://127.0.0.1:3003/products/" + this.refs.id_input.value , {
           method: 'PUT',
           headers: {'content-type': 'application/json'},
           body: JSON.stringify(data)
         })
         .then(response => {
           response.text()
         })
         .catch(err => console.log(err))


      let venta = {
        id: 1,
        product: data.name,
        price: data.price,
        existence: parseInt(this.refs.quantity_input.value),

      }
         fetch("http://127.0.0.1:3003/ventas", {
           method: 'POST',
           headers: {'content-type': 'application/json'},
           body: JSON.stringify(venta)
         })
         .then(response => {
           response.text()
         })
         .catch(err => console.log(err))

       } else { alert('Solo existen ' + existence + ' productos')}


         }



  render(){

    const option_ = this.state.products.map((product, i) => {
      return(
          <option key={i} value={this.state.products[i].id}>{this.state.products[i].name}</option>
      )
    })
    return(
      <div className="col-5 border">
        <div className="row justify-content-md-center mt-4">
          <div className="form-inline ">
            <div className="form-group mb-4">
              <label className="col-12 mb-2 text-center">PRODUCTO</label>
              <select className="col-12 form-control plain-text" ref="id_input" placeholder="ID">
               {option_}
              </select>
            </div>
          </div>
        </div>
        <div className="row justify-content-md-center">
        <div className="form-inline">
          <div className="form-group mb-4">
            <label className="col-12 mb-2 text-center">CANTIDAD</label>
            <input className="col-12 form-control plain-text" ref="quantity_input" placeholder="Cantidad"></input  >
          </div>
        </div>
        </div>
        <button type="button" className="btn btn-danger btn-block" onClick={(event) => {this.MakeSale(event)}}>Vender</button>
      </div>
    )
  }
}

export default Form;

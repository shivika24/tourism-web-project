import React,{ Component } from 'react';
import {Link} from 'react-router-dom';
let type
class Addp extends Component
{
  constructor()
  {
    super();
    this.function1=this.function1.bind(this);
    this.function2=this.function2.bind(this);
    this.rradio=this.rradio.bind(this);
    this.state={
      arr1:[],
      statedata1:[]
    }
  }
  rradio(a)
  {
      type=a;
  }
  function1(e)
  {
    e.preventDefault();
    const fa=document.getElementById("pname").value;
    const fb=document.getElementById("pdesc").value
    const fc=document.getElementById("pimage").value;
    const fd=document.getElementById("ppri").value;
    const fe=type;
    const elem1=
    {
      name:fa,
      description:fb,
      image:fc,
      price:fd,
      category:fe
    }     
    this.state.arr1.push(elem1);
    alert(`Product Name ${elem1.name} succesfully added`);
    this.setState({arr1:this.state.arr1});
    document.getElementById("pname").value='';
    document.getElementById("pdesc").value='';
    document.getElementById("pimage").value='';
    document.getElementById("ppri").value='';
    document.getElementById("rr").checked=false;
  }
  async componentDidMount() {
    const iid=localStorage.getItem('keys');
    const url = `http://localhost:8081/state/${iid}`;
    const response = await fetch(url);
    const jsondata = await response.json();
    var stringdata = JSON.stringify(jsondata);
    this.setState({ statedata1: jsondata});
  }
  function2(e)
  {
    let t = {
        products:this.state.arr1        
      };
      console.log(this.props.sid)
      fetch(`http://localhost:8081/state/addproducts/${this.state.statedata1[0]._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(t)
      })
        .then(res => res.json())
        .then(res => {
          alert(`NEW PRODUCT:${JSON.stringify(res)} ADDED SUCCESFULLY!!`);
        });
  }
    render()
    {
        return <div className="container-fluid col-md-6" id="d113">
        <p className="formhead2">FAMOUS PRODUCTS</p>
        <div className="form-group"> 
        <label id="ilabel"><b>Product Name</b></label>
        <input type="text" className="form-control" id="pname" placeholder="Product Name"/>
        </div> 
        <div className="form-group">
        <label id="ilabel"><b>Product Description</b></label>
        <textarea className="form-control" id="pdesc" placeholder="Product Description"/>
        </div>
        <div className="form-group">
        <label id="ilabel"><b>Product Image</b></label>
        <input type="text" className="form-control" id="pimage" placeholder="images"/>
        </div>
        <div className="form-group">
        <label id="ilabel"><b>Product Category</b></label>
        <input type="radio" onClick={()=>{this.rradio("Home-Decor")}} id="rr"/>Home-Decor
        <input type="radio" onClick={()=>{this.rradio("Grocery")}} id="rr"/>Grocery
        <input type="radio" onClick={()=>{this.rradio("Clothing & Accessories")}} id="rr"/>Clothing & Accessories
        <input type="radio" onClick={()=>{this.rradio("Jewellery")}} id="rr"/>Jewellery
        </div>
        <div className="form-group">
        <label id="ilabel"><b>Product Price</b></label>
        <input type="text" className="form-control" id="ppri" placeholder="price"/>
        </div>
        <button  className="hvr-shutter-out-horizontal" id="submitbut2" onClick={(e) => this.function1(e)}>ADD</button>
        <button className="hvr-shutter-out-horizontal" id="submitbut2" onClick={(e) => this.function2(e)}>SUBMIT</button>
        </div>
        
    }
}
export default Addp;

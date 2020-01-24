import React,{ Component } from 'react';
import {Link} from 'react-router-dom';

class Addt extends Component
{
  constructor()
  {
    super();
    this.fun1=this.fun1.bind(this);
    this.state={
      arr:[],
      statedata:[]
    }
  }
  fun1(e)
  {
    e.preventDefault();
    const ta=document.getElementById("tname").value;
    const tb=document.getElementById("tabout").value
    const tc=document.getElementById("timages").value;
    const td=document.getElementById("tlocation").value;
    const te=document.getElementById("tlat").value;
    const tf=document.getElementById("tlong").value;
    const elem=
    {
      name:ta,
      info:tb,
      images:tc,
      location:td,
      lat:te,
      long:tf
    }     
    this.state.arr.push(elem);
    alert(`Tourist Place ${elem.name} succesfully added`);
    this.setState({arr:this.state.arr});
    document.getElementById("tname").value='';
    document.getElementById("tabout").value='';
    document.getElementById("timages").value='';
    document.getElementById("tlocation").value=''; 
    document.getElementById("tlat").value='';
    document.getElementById("tlong").value='';   
  }
  async componentDidMount() {
    const iid=localStorage.getItem('keys');
    const url = `http://localhost:8081/state/${iid}`;
    const response = await fetch(url);
    const jsondata = await response.json();
    var stringdata = JSON.stringify(jsondata);
    this.setState({ statedata: jsondata});
  }
  fun2(e)
  {
     //console.log(this.state.statedata[0]._id)
    let t = {
        tourist:this.state.arr        
      };
    //  console.log(this.props.sid) 
      console.log(t.tourist);
      fetch(`http://localhost:8081/state/addtouristplace/${this.state.statedata[0]._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(t)
      })
        .then(res => res.json())
        .then(res => {
          alert(`NEW TOURIST PLACE:${JSON.stringify(res)} ADDED SUCCESFULLY!!`);
          console.log("done");
        });
  }
    render()
    {
        return <div className="container-fluid col-md-6" id="d112">
        <p className="formhead1">TOURIST PLACES</p>
        <div className="form-group"> 
          <label id="ilabel1"><b>Tourist Place Name</b></label>
          <input type="text" className="form-control" id="tname" placeholder="Tourist Place Name"/>
        </div> 
        <div className="form-group">
        <label id="ilabel1"><b>About</b></label> 
        <textarea className="form-control" id="tabout" placeholder="About"/>
        </div>
        <div className="form-group">
        <label id="ilabel1"><b>Images</b></label>
        <input type="text" className="form-control" id="timages" placeholder="images"/>
        </div>
        <div className="form-group">
        <label id="ilabel1"><b>Location</b></label>
        <input type="text" className="form-control" id="tlocation" placeholder="Location"/>
        </div>
        <div className="form-group">
        <label id="ilabel1"><b>Latitude</b></label>
        <input type="text" className="form-control" id="tlat" placeholder="Location"/>
        </div>
        <div className="form-group">
        <label id="ilabel1"><b>Longitude</b></label>
        <input type="text" className="form-control" id="tlong" placeholder="Location"/>
        </div>
        <button  className="hvr-shutter-out-horizontal" onClick={(e) => this.fun1(e)} id="submitbut1" >ADD</button>
        <button className="hvr-shutter-out-horizontal" id="submitbut1" onClick={(e) => this.fun2(e)}>SUBMIT</button>
        </div>
        
    }
}
export default Addt;
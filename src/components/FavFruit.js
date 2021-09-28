import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import FavFruitCard from './FavFruitCard';
import Row from 'react-bootstrap/Row';
import FavFruotModal from './FavFruotModal';
class FavFruit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addArr:[],
      showflag:false,
      name:'',
      image:'',
      price:'',
      _id:'',
      email:'',
    }
    
  }
  

componentDidMount=()=>{
  const {user} = this.props.auth0
  const email = user.email 

  axios
  .get(`http://localhost:3400/favdata/?email=${email}`)
  .then((result)=>{
    this.setState({
      addArr:result.data
    })
  })
  .catch((err)=>{
    console.log(err);
  })
}
componentDidUpdate=()=>{
  const {user} = this.props.auth0
  const email = user.email 

  axios
  .get(`http://localhost:3400/favdata/?email=${email}`)
  .then((result)=>{
    this.setState({
      addArr:result.data
    })
  })
  .catch((err)=>{
    console.log(err);
  })
}
 updateData=(event)=>{
   event.preventDefulte();
   const {user} = this.props.auth0
   const email = user.email 
   const obj ={
     email:email,
     name:event.target.name.value,
     image:event.target.image.value,
     price:event.target.price.value,
    

   }
   axios
   .put(`http://localhost:3400/updatedata/${this.state.id}`,obj)
   .then((result)=>{
    this.setState({
      addArr:result.data,
      showflag:true,
    })
  })
  .catch((err)=>{
    console.log(err);
  })
 
 }
 showModal=(item)=>{
   this.setState({
     showflag:true,
     id:item.id,
     email:item.email,
     name:item.name,
      image:item.image,
      price:item.price

   })
}
handleclose=()=>{
  this.setState({
    showflag:false,
  })
}
 deleteData=(item)=>{
  const {user} = this.props.auth0
  const email = user.email 
  const obj = {
    email:email,
    name:item.name,
      image:item.image,
      price:item.price
     
  }
axios
.delete(`http://localhost:3400/deletedata/${item._id}?email=${email}`,obj)
.then((result)=>{
this.setState({
  addArray:result.data
})

})
.catch((err)=>{
console.log(err);
})
}


  render() {
    return(
      <>
        <h1>My Favorite Fruits</h1>
        <Row xs={1} md={3} className="g-4">

        {this.state.addArr.map((item)=>{
          return <FavFruitCard item={item} deleteData={this.deleteData} showModal={this.showModal}/>
        })}
          
        </Row>

        <FavFruotModal show={this.state.showflag} 
        handleclose={this.handleclose}
        name={this.state.name}
        image={this.state.image}
        price={this.state.price}
        updateData={this.updateData}
        />
      </>
    )
  }
}

export default withAuth0(FavFruit);

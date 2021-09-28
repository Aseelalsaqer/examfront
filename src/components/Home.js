import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import HomeCard from "./HomeCard";
import Row from 'react-bootstrap/Row';
class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataArray:[],
      addArray:[],
    };
  
  }

  componentDidMount = () => {
   
    axios
      .get(`http://localhost:3400/fruitdata`)
      .then((result) => {
        this.setState({
          dataArray: result.data,
          
        });
      
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addFruit=(item)=>{
    const {user} = this.props.auth0
    const email = user.email 
    const obj = {
      email:email,
      name:item.name,
        image:item.image,
        price:item.price
    }
axios
.post(`http://localhost:3400/addfav`,obj)
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
    return (
      <>
        <h1>API Fruits</h1>

        <Row xs={1} md={3} className="g-4">
        {this.state.dataArray.map((item) => {
          return <HomeCard item={item} addFruit={this.addFruit} />;
        
        })}
        </Row>
      </>
    );
  }
}

export default withAuth0(Home);

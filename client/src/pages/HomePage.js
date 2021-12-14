import React from 'react';

import logo from '../images/logo.png';
import MenuBar from '../components/MenuBar';
import food_background from '../images/food_background.png';
import { getAllMatches, getAllPlayers, getAllChopped } from '../fetcher'

import {
  Container,
  Row,
  Col,
  Stack,
  Button,
  Image,
  Card,
} from 'react-bootstrap';

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      matchesResults: [],
      matchesPageNumber: 1,
      matchesPageSize: 10,
      playersResults: [],
      pagination: null  
    }
  }

  componentDidMount() {
    getAllChopped().then(res => {
      console.log(res.results)
    })
  }

  render() {

    var textStyle = {
      position: 'absolute', 
      top: '50%', 
      left: '50%'
    };

    return (
      <div>
        <MenuBar />
        <div style={{ 
          backgroundImage: `url(${food_background})`,
          backgroundRepeat:"no-repeat",
          backgroundSize:"cover", 
          height:900,width:1600 }}>
        </div>

       
        {/* <h1 style={textStyle}>Text over image</h1> */}
        <Container style={{ position:'absolute', top: '30%', left: '10%'}}>
          <div className="d-flex justify-content-center">
          <img
                  alt=""
                  src={logo}
                  width="100"
                  height="100"
              />
          </div>
          <h3 className="d-flex justify-content-center">Creative Cuisine </h3>
          <Card style={{marginTop: '30px'}}>
            <Card.Text style={{margin: '30px'}}>
              <p className="text-center">
                Creative Cuisine is a tool to inspire creativity in your cooking! 
              </p>
              <p className="text-left">
                <ul>
                Our features include: 
                  <li style={{marginLeft: '30px'}}>
                    an extensive database of recipes for you to try new dishes with a customizable search tool to make it easy to find the recipes that are right for you
                  </li>
                  <li style={{marginLeft: '30px'}}>
                    access to the top recipe contributers so that you can find your favorite users and find which recipes they've written and reviewed
                  </li>
                  <li style={{marginLeft: '30px'}}>
                    a custom meal maker tool that helps you plan what meals to make based on your nutrition and ingredient preferences
                  </li>
                  <li style={{marginLeft: '30px'}}>
                    a search function to find your favorite chopped episodes and how they can inspire you to make your own unique creations
                  </li>
                </ul>
              </p>
            </Card.Text>
          </Card>
        </Container>
        
      </div>
    )
  }

}

export default HomePage


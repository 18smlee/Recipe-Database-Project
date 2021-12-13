/* Page to search and display recipe contributors (users) and filter by ratings/etc
Clicking on user should have modal pop up with more detail 
 */
import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import {
  Table,
  Pagination,
  Select,
  Slider,
  Row,
  Col
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getAllUsers, getUserFromReviewSearch } from '../fetcher';
import UserCard from '../components/UserCard.js';


class UsersPage extends React.Component {

    constructor(props) {
      super(props)
  
      this.state = {
        usersResults: [],
        usersPageNumber: 1,
        usersPageSize: 10,
        numRecipes: 0,
        numReviews: 0,
        avgRatingReceived: 0,
        avgRatingGiven: 0
      }

      this.handleNumRecipesChange = this.handleNumRecipesChange.bind(this)
      this.handleNumReviewsChange = this.handleNumReviewsChange.bind(this)
      this.handleRatingReceivedChange = this.handleRatingReceivedChange.bind(this)
      this.handleRatingGivenChange = this.handleRatingGivenChange.bind(this)
      this.updateSearchResults = this.updateSearchResults.bind(this)
      this.nextPage = this.nextPage.bind(this)
    }

    handleNumRecipesChange(value) {
      console.log(value)
      this.setState({numRecipes: value})
    }

    handleNumReviewsChange(value) {
      console.log(value);
      this.setState({numReviews: value})
    }

    handleRatingReceivedChange(value) {
      console.log(value)
      this.setState({avgRatingReceived: value})
    }

    handleRatingGivenChange(value) {
      console.log(value)
      this.setState({avgRatingGiven: value})
    }

    updateSearchResults() {
      console.log("update search")
      //TASK 23: call getPlayerSearch and update playerResults in state. See componentDidMount() for a hint
      getUserFromReviewSearch(this.state.numRecipes, this.state.numReviews, this.state.avgRatingReceived, this.state.avgRatingGiven, 1, null).then(res => {
          console.log(res.results)
          this.setState({ usersResults: res.results })
      })
    }

    nextPage() {
      var newPage = this.state.usersPageNumber + 1
      console.log(newPage)
      
      getAllUsers(this.state.usersPageNumber, this.state.usersPageSize).then(res => {
        console.log(res.results)
        this.setState({usersResults: res.results, usersPageNumber: newPage})
      })
    }
  
    // leagueOnChange(value) {
    //   // TASK 2: this value should be used as a parameter to call getAllMatches in fetcher.js with the parameters page and pageSize set to null
    //   // then, matchesResults in state should be set to the results returned - see a similar function call in componentDidMount()
    //   getAllMatches(null, null, value).then(res => {
    //     this.setState({ matchesResults: res.results })
    //   })
    // }
  
    componentDidMount() {
      getAllUsers(this.state.usersPageNumber, this.state.usersPageSize).then(res => {
        console.log(res.results)
        this.setState({ usersResults: res.results })
      })
    }
  
  
    render() {
  
      return (
        <div>
          <MenuBar />
            <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                <Row>
                    <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                        <label>Recipes Contributed</label>
                        <Slider min={0} max={100} onChange={this.handleNumRecipesChange} />
                    </FormGroup></Col>
                    <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                        <label>Reviews Contributed</label>
                        <Slider min={0} max={100} onChange={this.handleNumReviewsChange} />
                    </FormGroup></Col>
                </Row>
                <br></br>
                <Row>
                <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                        <label>Ratings Given</label>
                        <Slider min={0} max={5} onChange={this.handleRatingGivenChange} />
                    </FormGroup></Col>
                    <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                        <label>Ratings Received</label>
                        <Slider min={0} max={5} onChange={this.handleRatingReceivedChange} />
                    </FormGroup></Col>
                </Row>
                <br></br>
                <Row>
                   <Col><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                  </FormGroup></Col>
                </Row>
                
              </Form>
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h3>Users</h3>
            {
              this.state.usersResults.map((user) => (
                <UserCard
                  key={user.id}
                  id={'user_' + user.id}
                  name={"Blah Blah"}
                  photo={"prof.png"}
                  avgRatingReceived={user.avg_rating_received}
                  handler = {() => {
                    window.location = `/users?id=${user.id}`
                  }}
                  />
              ))
            }
          </div>
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <Button onClick={this.nextPage}> More Results </Button>
          </div>

        </div>
      )
    }
  
  }
  
  export default UsersPage
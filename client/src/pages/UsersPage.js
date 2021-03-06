/* Page to search and display recipe contributors (users) and filter by ratings/etc
Clicking on user should have modal pop up with more detail 
 */
import React from 'react';
import { Form, FormInput, FormGroup, Card, CardBody, CardTitle, Progress } from "shards-react";
import {
  Table,
  Pagination,
  Select,
  Slider,
  Row,
  Col
} from 'antd'
import {Button} from 'react-bootstrap'


import MenuBar from '../components/MenuBar';
import { getAllUsers, getUserFromReviewSearch } from '../fetcher';
import UserCard from '../components/UserCard';


class UsersPage extends React.Component {

    constructor(props) {
      super(props)
  
      this.state = {
        usersResults: [],
        usersPageNumber: 0,
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
      getUserFromReviewSearch(this.state.numRecipes, this.state.numReviews, this.state.avgRatingReceived, this.state.avgRatingGiven, 0, this.state.usersPageSize).then(res => {
          console.log(res.results)
          this.setState({ usersResults: res.results, usersPageNumber: 0 })
      })
    }

    nextPage() {
      var newPage = this.state.usersPageNumber + 1
      console.log(newPage)
      
      getUserFromReviewSearch(this.state.numRecipes, this.state.numReviews, this.state.avgRatingReceived, this.state.avgRatingGiven, this.state.usersPageNumber, this.state.usersPageSize).then(res => {
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
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h3 class="text-center">Find Users</h3>
            <hr></hr>
            <p class="text-muted text-center">Find your favorite recipe contributers by filtering on number of recipes written, ratings given to the user, average quality of reviews they've written, or the average score of the ratings they have recieved on their recipes.</p>
          </div>
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
                <Row justify="center">
                   <Col><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                  </FormGroup></Col>
                </Row>
                
              </Form>
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h5>Results:</h5>
            {
              this.state.usersResults.map((user) => (
                <UserCard
                  key={user.id}
                  id={'user_' + user.id}
                  photo={"https://raw.githubusercontent.com/18smlee/Recipe-Database-Project/main/client/src/images/person_icon.png"}
                  avgRatingReceived={user.avg_rating_received}
                  avgRatingGiven={user.avg_rating_given}
                  numRecipes={user.num_recipes}
                  numReviews={user.num_reviews}
                  handler = {() => {
                    window.location = `/users/${user.id}`
                  }}
                  />
              ))
            }
          </div>
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <Button style={{marginBottom: "50px"}} variant='outline-secondary' onClick={this.nextPage}> More Results </Button>
          </div>

        </div>
      )
    }
  
  }
  
  export default UsersPage
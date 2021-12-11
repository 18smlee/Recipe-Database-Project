/* Page to search and display recipe contributors (users) and filter by ratings/etc
Clicking on user should have modal pop up with more detail 
 */
import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getAllUsers } from '../fetcher';

class UsersPage extends React.Component {

    constructor(props) {
      super(props)
  
      this.state = {
        usersResults: [],
        usersPageNumber: 1,
        usersPageSize: 10,
        pagination: null  
      }
      this.goToUser = this.goToUser.bind(this)
    }
  
  
    goToUser(userId) {
      window.location = `/users?id=${userId}`
    }
  
    // leagueOnChange(value) {
    //   // TASK 2: this value should be used as a parameter to call getAllMatches in fetcher.js with the parameters page and pageSize set to null
    //   // then, matchesResults in state should be set to the results returned - see a similar function call in componentDidMount()
    //   getAllMatches(null, null, value).then(res => {
    //     this.setState({ matchesResults: res.results })
    //   })
    // }
  
    componentDidMount() {
      getAllUsers().then(res => {
        console.log(res.results)
        this.setState({ usersResults: res.results })
      })
    }
  
  
    render() {
  
      return (
        <div>
          <MenuBar />
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h3>Users</h3>
          </div>
        </div>
      )
    }
  
  }
  
  export default UsersPage
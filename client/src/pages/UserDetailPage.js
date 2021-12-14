/* Page to show details about user (id, contributions, ratings) 
 */
import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import { getUser } from '../fetcher';
import MenuBar from '../components/MenuBar';


class UserDetailPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.userId,
            //selectedRecipeId: window.location.search ? window.location.search.substring(1).split('=')[1] : 229594,
            selectedUserDetails: null,

        }
    }

    componentDidMount() {
        getUser(this.state.id).then(res => {
            console.log(this.state.id)
            console.log(res.results)
            this.setState({ SelectedUserDetails: res.results[0]})
        })
    }

    render() {
        return (

            <div>
                <MenuBar />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h3>User Details</h3>
                </div>
            </div>
        )
    }
}

export default UserDetailPage
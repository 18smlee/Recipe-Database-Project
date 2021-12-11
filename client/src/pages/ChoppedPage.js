/* Page to search for Chopped episodes by episode & judge name or ingredients
Clicking on episode will show information about episode AND similar recipes to chopped episode
*/
import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getAllChopped } from '../fetcher';

class ChoppedPage extends React.Component {

    constructor(props) {
      super(props)
  
      this.state = {
        choppedResults: [],
        choppedPageNumber: 1,
        choppedPageSize: 10,
        pagination: null  
      }
      this.goToChoppedEpisode = this.goToChoppedEpisode.bind(this)
    }
  
  
    goToChoppedEpisode(choppedEpisodeId) {
      window.location = `/chopped?id=${choppedEpisodeId}`
    }
    
    componentDidMount() {
      getAllChopped().then(res => {
        console.log(res.results)
        this.setState({ choppedResults: res.results })
      })
    }
  
  
    render() {
  
      return (
        <div>
          <MenuBar />
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h3>Chopped Episodes</h3>
          </div>
        </div>
      )
    }
  
  }
  
  export default ChoppedPage
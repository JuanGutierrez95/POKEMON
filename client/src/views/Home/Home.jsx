import React from 'react'
import Card from '../../components/Card/Card'
import Paginate from '../../components/Paginate/Paginate'
import SearchBar from '../../components/SearchBar/SearchBar'

const Home = () => {
  return (
    <div>
        <h1>Home</h1>

        <SearchBar />
        <Paginate />
        <Card />
    </div>
  )
}

export default Home
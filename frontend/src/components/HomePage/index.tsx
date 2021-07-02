import React, { CSSProperties } from 'react'
import Subtitles from './Subtitles'
import Title from './Title'
import { Link } from 'react-router-dom'

const homeStyles: CSSProperties = {
  textAlign: 'center'
}

const HomePage: React.FC = () => {
  return (
    <div style={homeStyles}>
      <Title text={'Chromapoll!'} />
      <p><Link to='/all'>List of all polls</Link></p>
      <Subtitles items={['Make polls with color', 'Share them with friends!']} />
    </div>
  )
}

export default HomePage

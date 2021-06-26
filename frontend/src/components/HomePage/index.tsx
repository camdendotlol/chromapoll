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
      <Link to='/example'>See example poll</Link>
      <Subtitles items={['Make polls with color', 'Share them with friends!']} />
    </div>
  )
}

export default HomePage

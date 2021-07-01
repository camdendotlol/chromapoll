import React from 'react'
import { useTrail, animated } from 'react-spring'

const trailStyles = {
  // The text goes invisibly off the side of the screen, so let's make sure the scrollbar doesn't show.
  overflow: 'hidden'
}

const Trail: React.FC<{ open: boolean }> = ({ open, children }) => {
  const items = React.Children.toArray(children)

  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 1800, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 5,
    height: open ? 60 : 0,
    from: { opacity: 0, x: 20, height: 0 }
  })

  return (
    <div style={trailStyles}>
      {trail.map(({ height, ...style }, index) => (
        <animated.div key={index} style={style}>
          <animated.div style={{ height }}>{items[index]}</animated.div>
        </animated.div>
      ))}
    </div>
  )
}

export default Trail
import React from 'react'
import { Button } from 'semantic-ui-react'

const ButtonComp = ({ color, method, name, classStyle }) => {
  return (
    <Button color={color} onClick={method} content={name} className={classStyle} />
  )
}

export default ButtonComp

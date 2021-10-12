import React from 'react'
import styled from 'styled-components'
import { isBright } from '../lib'

interface Props {
  items: {
    properties: string[],
    color?: string,
    callback?: () => void
  }[]
}

const TableContainer = styled.div`
  border-radius: 10px;
  padding: 0;
  margin: 0;
  overflow: hidden;
`
  
const Table = styled.table`
  border-spacing: 0px;
  border-radius: 10px;
  font-weight: 600;
  width: 100%;

  th, td {
    padding: 10px;
  }

  tr {
    border: 0;
    transition: 0.2s;
  }
`

const ColorfulRow = styled.tr`
  background-color: ${props => props.color};

  :hover {
    filter: ${props => props.autoCorrect};
    cursor: ${props => props.about};
  }
`

const Label = styled.td`
  color: ${props => props.color};
`

const CuteTable: React.FC<Props> = ({ items }) => {
  const getLabelColor = (itemColor: string | undefined) => {
    if (!itemColor) {
      return 'white'
    }

    if (isBright(itemColor)) {
      return 'black'
    } else {
      return 'white'
    }
  }

  return (
    <TableContainer>
      <Table>
        <tbody>
          {items.map((item, index) => (
            <ColorfulRow
              key={index}
              color={item.color ? item.color : 'inital'}
              // only imply interactivity if a callback is provided
              autoCorrect={item.callback ? 'brightness(75%)' : 'none' }
              about={item.callback ? 'pointer' : 'unset'}
            >
              {item.properties.map((property, index) =>
                <Label
                  color={getLabelColor(item.color)}
                  key={index}
                  onClick={item.callback ? item.callback : undefined }
                >
                  {property}
                </Label>)}
            </ColorfulRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  )
}

export default CuteTable
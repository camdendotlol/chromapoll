import React from 'react'
import styled from 'styled-components'

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

  th, td {
    padding: 10px;
  }

  tr {
    border: 0;
    transition: 0.2s;
  }

  tbody tr:hover {
    filter: brightness(75%);
    cursor: pointer;
  }
`

const ColorfulRow = styled.tr`
  background: ${props => props.color};
`

const CuteTable: React.FC<Props> = ({ items }) => {
  return (
    <TableContainer>
      <Table>
        <tbody>
          {items.map((item, index) => (
            <ColorfulRow
              key={index}
              color={item.color ? item.color : 'inital'}
            >
              {item.properties.map((property, index) =>
                <td
                  key={index}
                  onClick={item.callback ? item.callback : undefined }
                >
                  {property}
                </td>)}
            </ColorfulRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  )
}

export default CuteTable
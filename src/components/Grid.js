function Grid({imageURL, heightGrid, widthGrid, yGrid, xGrid, table, handleGridClick }) {
  return (
    <div>
      <img
        className={"img"}
        src={imageURL}
        alt="There doesn't seem to be anything here :/"
      />
      <table
      className={"grid"}
      style={
        {
          height: ( heightGrid * 20  ).toString() + 'px',
          width: ( widthGrid * 20 ).toString() + 'px',
          top: ( yGrid.toString() * 4 ) + 'px',
          left: ( xGrid.toString()* 4 ) + 'px',
        }
      }
    >
      {
        table.map(row => {
          return (
            <tr key={row.rNum}>
              {
                row.cells.map(cell => {
                  return <td key={`${row.rNum}:${cell.cNum}`} style={{ opacity: '10%', backgroundColor: cell.sel ? 'green' : 'red'}} onClick={() => handleGridClick(row.rNum, cell.cNum)} />
                })
              }
            </tr>
          )

        })
      }

    </table>
  </div>
  )
}

export default Grid;

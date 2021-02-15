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
        <tbody>
          {
            table.map((row, index) => {

              return (
                <tr key={index + 'r'}>
                  {
                    row.map((cell, cindex) => {
                      return <td key={`${index}:${cindex}`} style={{ opacity: '10%', backgroundColor: cell ? 'green' : 'red'}} onClick={() => handleGridClick(index, cindex)} />
                    })
                  }
                </tr>
              )

            })
          }
        </tbody>
    </table>
  </div>
  )
}

export default Grid;

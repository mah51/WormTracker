function Grid({
  imageURL,
  heightGrid,
  widthGrid,
  yGrid,
  xGrid,
  table,
  handleGridClick,
  gridOpacity
              }) {
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
          height: ( heightGrid - yGrid ).toString() + 'px',
          width: ( widthGrid - xGrid ).toString() + 'px',
          top: ( yGrid.toString() ) + 'px',
          left: ( xGrid.toString() ) + 'px',
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
                      return <td key={`${index}:${cindex}`} style={{ opacity: gridOpacity, backgroundColor: cell ? 'green' : 'red'}} onClick={() => handleGridClick(index, cindex)} />
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

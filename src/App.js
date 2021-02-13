import './App.css'
import {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


function App() {

  const [imageURL, setImageURL] = useState('https://cdn.discordapp.com/attachments/698573610012639302/809945399740727307/dsBuffer.bmp.png')
  const [table, setTable] = useState([]);
  const [count, setCount] = useState(0);
  const [xGrid, setXGrid] = useState(0);
  const [yGrid, setYGrid] = useState(0);
  const [heightGrid, setHeightGrid] = useState(50);
  const [widthGrid, setWidthGrid] = useState(50);
  const [imageSize, setImageSize] = useState(false)

  useEffect(() => {
    if (imageURL && table.length === 0) {
      const tables = [];
      for ( let i = 0; i < 11; i++) {
        const rowArray = [];
        for (let j = 0; j < 11; j++) {
          rowArray.push({selected: false, cellNumber: j})
        }
        tables.push({rowNumber: i, cells: rowArray})
      }
      setTable(tables)
    }
  },[table])

  function handleGridXChange(event, value) {
    setXGrid(value)
  }

  function handleGridYChange(event, value) {
    setYGrid(value)
  }

  function handleGridHeightChange(event, value) {
    setHeightGrid(value)
  }

  function handleGridWidthChange(event, value) {
    setWidthGrid(value)
  }

  function handleGridClick(rowNumber, cellNumber) {
    table[rowNumber].cells[cellNumber].selected = !table[rowNumber].cells[cellNumber].selected;
    setTable([...table]);
    const increment = table[rowNumber].cells[cellNumber].selected ? 1 : -1;
    setCount(count + increment  );
  }

  function onImgLoad({target: img}) {
    console.log(img.offsetHeight)
    setImageSize([img.offsetWidth, img.offsetHeight])
  }

  return (
    <>
      <div className="container">
        <img
          className={"img"}
          src={imageURL}
          onLoad={onImgLoad}
          alt="There doesn't seem to be an image here :/"
        />
        <table
          className={"table"}
          style={
            {
              height: (heightGrid * 2).toString() + 'vh',
              width: (widthGrid * 2).toString() + 'vh',
              top: (yGrid.toString() * 4) + 'px',
              left: (xGrid.toString()* 4) + 'px'
            }
          }
        >
          {
            table.map(row => {
              return (
                <tr key={row.rowNumber}>
                  {
                    row.cells.map(cell => {
                      return <td key={`${row.rowNumber}:${cell.cellNumber}`} style={{ opacity: '10%', backgroundColor: cell.selected ? 'green' : 'red'}} onClick={() => handleGridClick(row.rowNumber, cell.cellNumber)} />
                    })
                  }
                </tr>
              )

            })
          }

        </table>

      </div>
      <div className="formcontainer">
        <form >
          <p>Number of grids: {count}</p>
          <p>Image link:</p>
          <input type="text" placeholder={imageURL} onChange={(e) => setImageURL(e.target.value) }/>
          <button onClick={(e) => {
            setTable([]);
            setCount(0);
            setXGrid(0);
            setYGrid(0);
            setWidthGrid(50);
            setWidthGrid(50);
            e.preventDefault();
          }}>Reset Grid</button>
          <div className="gridCoordContainer">
            <p>x</p>
            <Slider value={xGrid} onChange={handleGridXChange} aria-labelledby="continuous-slider" />
            <p>y</p>
            <Slider value={yGrid} onChange={handleGridYChange} aria-labelledby="continuous-slider" />

          </div>
          <div className="gridLengthHeight">
            <p>height</p>
            <Slider value={heightGrid} onChange={handleGridHeightChange} min={10} max={90}  aria-labelledby="continuous-slider" />
            <p>width</p>
            <Slider value={widthGrid} onChange={handleGridWidthChange} min={10} max={90}  aria-labelledby="continuous-slider" />
          </div>
        </form>
      </div>
    </>

  )
}

export default App;


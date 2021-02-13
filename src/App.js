import './App.css'
import {useEffect, useState} from 'react';
import Slider from '@material-ui/core/Slider';


function App() {

  const [imageURL, setImageURL] = useState('https://cdn.discordapp.com/attachments/698573610012639302/809945399740727307/dsBuffer.bmp.png')
  const [table, setTable] = useState([]);
  const [count, setCount] = useState(0);
  const [xGrid, setXGrid] = useState(0);
  const [yGrid, setYGrid] = useState(0);
  const [heightGrid, setHeightGrid] = useState(50);
  const [widthGrid, setWidthGrid] = useState(50);
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    if (imageURL && table.length === 0) {
      const tables = [];
      for ( let i = 0; i < 11; i++) {
        const rowArray = [];
        for (let j = 0; j < 11; j++) {
          rowArray.push({sel: false, cNum: j})
        }
        tables.push({rNum: i, cells: rowArray})
      }
      setTable(tables)
    }
  },[table, imageURL])

  function handleGridXChange(event, value) {
    setXGrid(value)
  }

  function handleGridYChange(event, value) {
    setYGrid(value)
  }

  function handleGridHeightChange(event, value) {
    setHeightGrid(value)
    if (checkbox) {
      setWidthGrid(value)
    }
  }

  function handleGridWidthChange(event, value) {
    setWidthGrid(value)
    if (checkbox) {
      setHeightGrid(value)
    }
  }

  function handleGridClick(rowNumber, cellNumber) {
    table[rowNumber].cells[cellNumber].sel = !table[rowNumber].cells[cellNumber].sel;
    setTable([...table]);
    const increment =  table[rowNumber].cells[cellNumber].sel ? 1 : -1;
    setCount(count + increment  );
  }

  function handleDownload(e) {
    e.preventDefault();
    const fileName = prompt('What would you like the file to be called? (Leave blank for default name)') || 'worm_grid_position'
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(
      {
        "grid": {
          "x": xGrid,
          "y": yGrid,
          "height": heightGrid,
          "width": widthGrid
        },
        "rows" : table

      }
    )], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${fileName}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  function handlePaste(e) {
    e.preventDefault();
    const data = prompt('Please paste previously copied data');

    try{
      const parsedData = JSON.parse(data)
      setXGrid(parsedData.grid.x)
      setYGrid(parsedData.grid.y)
      setHeightGrid(parsedData.grid.height)
      setWidthGrid(parsedData.grid.width)
      setTable(parsedData.rows)
    } catch(e) {
      alert('The data you provided could not be parsed.')
    }
  }

  function handleUpload(e) {
    e.preventDefault();
    const reader = new FileReader()
    reader.onload = async (e) => {
      const data = e.target.result
      try {
        const parsedData = JSON.parse(data)
        setXGrid(parsedData.grid.x)
        setYGrid(parsedData.grid.y)
        setHeightGrid(parsedData.grid.height)
        setWidthGrid(parsedData.grid.width)
        setTable(parsedData.rows)
      } catch(e) {
        console.log(e)
        alert('Could not parse provided data.')
      }
    };
    if (e.target.files[0]) {
      reader.readAsText(e.target.files[0])
    }

  }

  return (
    <>
      <div className="container">
        <img
          className={"img"}
          src={imageURL}
          alt="There doesn't seem to be anything here :/"
        />
        <table
          className={"table"}
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
      <div className="formcontainer">
        <form >
          <p>Number of squares: {count}</p>
          <p>Image link:</p>
          <input type="text" placeholder={imageURL} onChange={(e) => setImageURL(e.target.value) }/>
          <button onClick={(e) => {
            setTable([]);
            setCount(0);
            setXGrid(0);
            setYGrid(0);
            setWidthGrid(50);
            setHeightGrid(50);
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
            <Slider value={heightGrid} onChange={handleGridHeightChange} min={10} max={90} step={0.1}  aria-labelledby="continuous-slider" />
            <p>width</p>
            <Slider value={widthGrid} onChange={handleGridWidthChange} min={10} max={90} step={0.1} aria-labelledby="continuous-slider" />
          </div>
          <div className="checkboxContainer">
            Link height and width:
            <input type="checkbox" onChange={() => {
              setWidthGrid(heightGrid)
              setCheckbox(!checkbox)
            }} value={checkbox}/>
          </div>
          <div style={{marginTop: '20px'}} className="exportContainer">
            <div className="export">
              <button
                onClick={(e) =>  {
                  e.preventDefault();
                  navigator.clipboard.writeText(
                    JSON.stringify(
                      {
                        "grid": {
                          "x": xGrid,
                          "y": yGrid,
                          "height": heightGrid,
                          "width": widthGrid
                        },
                        "rows" : table

                      }
                    )
                  )
                    .then(() => {
                      alert('Copied settings to clipboard')
                    })
                    .catch(console.error)
                }}

              >Copy grid position</button>
              <button
                onClick={(e) =>  handleDownload(e)}

              >Download grid position</button>
            </div>

            <div className="import">
              <button onClick={(e) => handlePaste(e) } >Paste grid data</button>
              <input type={"file"} onChange={(e) => handleUpload(e)} />
            </div>

          </div>
          <div className="footer">
            <p>Made by Michael Hall <a href={'https://github.com/mah51'}>(@mah51)</a>. For instructions and the code for this website click <a href={'https://github.com/mah51/WormTracker'}>here</a></p>
          </div>
        </form>
      </div>
    </>

  )
}

export default App;


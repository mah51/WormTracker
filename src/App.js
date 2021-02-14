import './App.css'
import {useEffect, useState} from 'react';
import Sliders from './components/Sliders'
import Grid from './components/Grid';
import ExImport from "./components/ExImport";

function App() {

  const [imageURL, setImageURL] = useState('https://cdn.discordapp.com/attachments/698573610012639302/809945399740727307/dsBuffer.bmp.png')
  const [table, setTable] = useState([]);
  const [count, setCount] = useState(0);
  const [xGrid, setXGrid] = useState(0);
  const [yGrid, setYGrid] = useState(0);
  const [heightGrid, setHeightGrid] = useState(54);
  const [widthGrid, setWidthGrid] = useState(54);
  const [checkbox, setCheckbox] = useState(false);
  const [menu, setMenu] = useState(true);

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
        "rows" : table,
        "count": count

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
    if (!data) return;
    try{
      const parsedData = JSON.parse(data)
      setXGrid(parsedData.grid.x)
      setYGrid(parsedData.grid.y)
      setHeightGrid(parsedData.grid.height)
      setWidthGrid(parsedData.grid.width)
      setTable(parsedData.rows)
      setCount(parsedData.count)
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
        setCount(count)
      } catch(e) {
        console.log(e)
        alert('Could not parse provided file.')
      }
    };
    if (e.target.files[0]) {
      reader.readAsText(e.target.files[0])
    }

  }

  return (
    <>
      <div className="menuCheckContainer">
        <p className={'menuCheckLabel'}>Hide menu:</p>

        <input
          className={'menuCheck'}
          type="checkbox"
          onChange={() => {
            setMenu(!menu)
          }} value={menu}/>
      </div>
      <div className="contain">
        <div className="imageContainer">
          <Grid
            imageURL={imageURL}
            handleGridClick={handleGridClick}
            heightGrid={heightGrid}
            widthGrid={widthGrid}
            yGrid={yGrid}
            xGrid={xGrid}
            table={table}

          />
        </div>
        {
          menu ? (
            <div className="formContainer" >
              <Sliders
                setTable={setTable}
                setCount={setCount}
                setXGrid={setXGrid}
                setYGrid={setYGrid}
                setWidthGrid={setWidthGrid}
                setHeightGrid={setHeightGrid}
                count={count}
                imageURL={imageURL}
                setImageURL={setImageURL}
                xGrid={xGrid}
                handleGridXChange={handleGridXChange}
                yGrid={yGrid}
                handleGridYChange={handleGridYChange}
                heightGrid={heightGrid}
                handleGridHeightChange={handleGridHeightChange}
                widthGrid={widthGrid}
                handleGridWidthChange={handleGridWidthChange}
                checkbox={checkbox}
                setCheckbox={setCheckbox}
                menu={menu}
                setMenu={setMenu}
              />
              <ExImport

                xGrid={xGrid}
                yGrid={yGrid}
                heightGrid={heightGrid}
                widthGrid={widthGrid}
                table={table}
                handleDownload={handleDownload}
                handlePaste={handlePaste}
                handleUpload={handleUpload}
                count={count}
              />
              <div className="footer">
                <p>Made by Michael Hall <a href={'https://github.com/mah51'}>(@mah51)</a>. </p>
                <p>For instructions on how to use this tool, reporting issues, and viewing the code:  <a href={'https://github.com/mah51/WormTracker'}>WormTracker Repo</a></p>
              </div>
            </div>
          ) : ''
        }


      </div>
    </>

  )
}

export default App;


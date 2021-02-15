import './App.css'
import {useEffect, useState} from 'react';
import Sliders from './components/Sliders'
import Grid from './components/Grid';
import ExImport from "./components/ExImport";
import ReactGA from 'react-ga';

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
  const [gridOpacity, setGridOpacity] = useState(0.1);

  useEffect(() => {
    if (imageURL && table.length === 0) {
      const data = []
      for (let i = 0; i < 11; i ++) {
        const rowArray = [];
        for (let j = 0; j < 11; j++) {
          rowArray.push(false);
        }
        data.push(rowArray)
      }

      setTable(data)
    }
  },[table, imageURL, gridOpacity])

  function getCount(array) {
    /* Flattens 2D array -> filters all true elements and gets the length */
    return array.flat().filter(cell => cell === true).length
  }

  function getImport(data) {
    try {
      const parsedData = JSON.parse(data)
      setXGrid(parsedData.grid.x)
      setYGrid(parsedData.grid.y)
      setHeightGrid(parsedData.grid.height)
      setWidthGrid(parsedData.grid.width)
      setTable(parsedData.table)
      setCount(getCount(parsedData.table))
    } catch(e) {
      alert(`Couldn't parse the provided data :(`)
    }

  }



  async function handleGridClick(rowNumber, cellNumber) {
    table[rowNumber][cellNumber] = !table[rowNumber][cellNumber];
    /* I have to set table data into a new array using the spread operator to ensure the dom updates */
    setTable([...table] );
    setCount( getCount(table) );
    ReactGA.event({
      category: "Grid click",
      action: "User clicked a grid!",
    });

  }
  function handleCopy(e) {
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
          "table" : table

        }
      )
    )
      .then(() => {
        alert('Copied settings to clipboard')
      })
      .catch(console.error)
  }

  function handleDownload(e) {
    // Source code:
    // https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react
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
        "table" : table

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
    getImport(data);
  }

  function handleUpload(e) {
    e.preventDefault();
    const reader = new FileReader()
    reader.onload = async (e) => {
      const data = e.target.result
      getImport(data);
    };
    if (e.target.files[0]) {
      reader.readAsText(e.target.files[0])
    }

  }

  const gridProps = {
    imageURL,
    handleGridClick,
    heightGrid,
    widthGrid,
    yGrid,
    xGrid,
    table,
    gridOpacity
  }

  const sliderProps = {
    setTable,
    setCount,
    setXGrid,
    setYGrid,
    count,
    imageURL,
    setImageURL,
    xGrid,
    yGrid,
    heightGrid,
    setHeightGrid,
    widthGrid,
    setWidthGrid,
    gridOpacity,
    setGridOpacity,
    checkbox,
    setCheckbox,
    menu,
    setMenu,
  }

  const exImportProps = {
    xGrid,
    yGrid,
    heightGrid,
    widthGrid,
    table,
    handleDownload,
    handlePaste,
    handleUpload,
    handleCopy,
    count,
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
          <Grid {...gridProps} />
        </div>
        {
          menu ? (
            <div className="formContainer" >
              <Sliders {...sliderProps} />
              <ExImport {...exImportProps} />
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


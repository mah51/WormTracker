import './App.css'
import {useEffect, useState} from 'react';
import Sliders from './components/Sliders'
import Grid from './components/Grid';
import ExImport from "./components/ExImport";
import ReactGA from 'react-ga';

import publicIp from "public-ip";


export const getClientIp = async () => await publicIp.v4({
  fallbackUrls: [ "https://ifconfig.co/ip" ]
});
console.log('connecting from ' + getClientIp())
ReactGA.initialize(process.env.REACT_APP_TRACKINGID)
getClientIp()
  .then(userIP => {
    console.log(userIP)
    ReactGA.set({
      userIP,
    })
  })
  .catch(e => {
    ReactGA.exception({description:'IP find failed', fatal: false})
  })

ReactGA.pageview(window.location.pathname)

function App() {

  const [imageURL, setImageURL] = useState('https://cdn.discordapp.com/attachments/698573610012639302/809945399740727307/dsBuffer.bmp.png')
  const [table, setTable] = useState([]);
  const [count, setCount] = useState(0);
  const [xGrid, setXGrid] = useState(0);
  const [yGrid, setYGrid] = useState(0);
  const [heightGrid, setHeightGrid] = useState(950);
  const [widthGrid, setWidthGrid] = useState(1110);
  const [checkbox, setCheckbox] = useState(false);
  const [menu, setMenu] = useState(true);
  const [gridOpacity, setGridOpacity] = useState(0.1);
  const [inAutoGrid, setInAutoGrid] = useState(false);
  const [autoGridText, setAutoGridText] = useState(null);

  function activateAutoGrid(e) {
    setInAutoGrid(0);
    setAutoGridText('Setting top bound');
  }

  function handleClick(e) {
    console.log(e)
    switch (inAutoGrid) {
      case 0:
        setYGrid(e.pageY)
        setInAutoGrid(1)
        setAutoGridText('Setting left bound');
        break;
      case 1:
        setXGrid(e.pageX);
        setInAutoGrid(2);
        setAutoGridText('Setting bottom bound');
        break;
      case 2:
        setInAutoGrid(3);
        setHeightGrid(e.pageY);
        setAutoGridText('Setting right bound');
        break;
      case 3:
        setWidthGrid(e.pageX);
        setInAutoGrid(false);
        setAutoGridText(null);
        break;
    }
  }

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
  },[table, imageURL, gridOpacity, autoGridText])

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
    if (inAutoGrid === false) {
      table[rowNumber][cellNumber] = !table[rowNumber][cellNumber];
      /* I have to set table data into a new array using the spread operator to ensure the dom updates */
      setTable([...table] );
      setCount( getCount(table) );
      ReactGA.event({
        category: "Grid",
        action: "Grid square clicked",
      });
    } else {
      console.log('In autogrid, ignoring grid click!')
    }
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
        ReactGA.event({
          category: "Grid",
          action: "Grid copied",
        });
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
    ReactGA.event({
      category: "Grid",
      action: "Grid downloaded",
    });
  }

  function handlePaste(e) {
    e.preventDefault();
    const data = prompt('Please paste previously copied data');
    if (!data) return;
    getImport(data);
    ReactGA.event({
      category: "Grid",
      action: "Grid pasted",
    });
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
    ReactGA.event({
      category: "Grid",
      action: "Grid uploaded",
    });

  }

  const gridProps = {
    imageURL,
    handleGridClick,
    heightGrid,
    widthGrid,
    yGrid,
    xGrid,
    table,
    gridOpacity,
    checkbox
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
    inAutoGrid,
    activateAutoGrid,
    autoGridText
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
            if (!menu) {
              ReactGA.event({
                category: "Menu",
                action: "Hide Menu checked",
              });
            }
            setMenu(!menu)
          }} value={menu}/>
      </div>
      <div className="contain" onClick={(e) => handleClick(e)}>
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


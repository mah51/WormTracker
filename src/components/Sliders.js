import Slider from '@material-ui/core/Slider';
import Button from 'react-bootstrap/Button';
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles';
import ReactGA from "react-ga";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#eee',
      main: '#17a2b8',
      dark: '#007388',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffb9d9',
      main: '#f287a8',
      dark: '#bd5779',
      contrastText: '#fff',
    },
  },
});

function Sliders({
                   setTable,
                   setCount,
                   setXGrid,
                   setYGrid,
                   setWidthGrid,
                   setHeightGrid,
                   count,
                   imageURL,
                   setImageURL,
                   xGrid,
                   yGrid,
                   heightGrid,
                   widthGrid,
                   checkbox,
                   setCheckbox,
                   gridOpacity,
                   setGridOpacity,
                   activateAutoGrid,
                   inAutoGrid,
                   autoGridText,
}) {
  return (
    <form >
      <h1 className={'title'}>WormTracker v1.0</h1>
      <h2 className={'count'}>Number of squares: {count}</h2>

      <h3 className={'imageTitle'}>Image link:</h3>
      <input className={'imageLink'} type="text" placeholder={imageURL} onChange={(e) => {
        ReactGA.event({
          category: "Image",
          action: "New image link",
        });
        setImageURL(e.target.value)
      } }/>


      <p className={'slider-label'} style={{marginBottom: '1vh'}}>Change the grid:</p>
      <Button
        className={'autoGrid'}
        variant={'info'}
        style={{marginBottom: '1vh'}}
        onClick={(e) => {
          if (inAutoGrid === false) {
            activateAutoGrid();
          } else {
            alert('AutoGrid is already active...')
          }
        }}>{autoGridText || 'Auto Grid'}</Button>
        <ThemeProvider theme={theme}>
          <p className={'slider-label'}>Top</p>
          <Slider value={yGrid} color={'secondary'} step={1} max={250} onChange={(event, value) => setYGrid(value)} aria-labelledby="continuous-slider" />
          <p className={'slider-label'}>Bottom</p>
          <Slider
            value={heightGrid}
            color={'secondary'}
            onChange={(event, value) => {
              setHeightGrid(value)
              if (checkbox) {
                setWidthGrid(value)
              }
            }}
            min={700}
            max={1200}
            step={1}
            aria-labelledby="continuous-slider" />
          <p className={'slider-label'}>Left</p>
          <Slider value={xGrid} color={'secondary'} step={1} max={250} onChange={(event, value) => setXGrid(value)} aria-labelledby="continuous-slider" />

          <p className={'slider-label'}>Right</p>
          <Slider
            value={widthGrid} color={'secondary'}
            onChange={(event, value) => {
            setWidthGrid(value)
            if (checkbox) {
              setHeightGrid(value)
            }
            }}
            min={860}
            max={1360}
            step={1}
            aria-labelledby="continuous-slider" />
          <p className={'slider-label'}>Opacity</p>
          <Slider value={gridOpacity} color={'secondary'} step={0.01}  min={0} max={0.9} onChange={(event, value) => setGridOpacity(value)} aria-labelledby="continuous-slider" />
        </ThemeProvider>


      <div className="checkboxContainer">
        <p className={'gridLabel'}>Square grid:</p>

        <input
          className={'checkbox'}
          type="checkbox"
          onChange={() => {
          if (!checkbox) {
            ReactGA.event({
              category: "Grid",
              action: "Square grid enabled",
            });
          }
          if (widthGrid > heightGrid) {
            setHeightGrid(widthGrid)
          } else {
            setWidthGrid(heightGrid)
          }

          setCheckbox(!checkbox)
        }} value={checkbox}/>
        <span className="checkmark"/>
      </div>
        <div className="resetContainer">
          <Button
            className={'resetGrid'}
            variant={'info'}
            onClick={(e) => {
              setCount(0);
              setTable([]);
              e.preventDefault();
            }}>Reset Count</Button>
          <Button
            className={'resetGrid'}
            variant={'info'}
            onClick={(e) => {
              setTable([]);
              setCount(0);
              setGridOpacity(0.1);
              setXGrid(0);
              setYGrid(0);
              setWidthGrid(54);
              setHeightGrid(54);
              e.preventDefault();
            }}>Reset Grid</Button>
        </div>


    </form>
  )
}


export default Sliders;

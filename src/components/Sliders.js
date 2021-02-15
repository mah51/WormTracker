import Slider from '@material-ui/core/Slider';
import Button from 'react-bootstrap/Button';
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles';
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
}) {
  return (
    <form >
      <h1 className={'title'}>WormTracker v1.0</h1>
      <h2 className={'count'}>Number of squares: {count}</h2>

      <h3 className={'imageTitle'}>Image link:</h3>
      <input className={'imageLink'} type="text" placeholder={imageURL} onChange={(e) => setImageURL(e.target.value) }/>

      <p className={'slider-label'}>Change the grid:</p>
        <ThemeProvider theme={theme}>
          <p className={'slider-label'}>Opacity</p>
          <Slider value={gridOpacity} color={'secondary'} step={0.01}  min={0} max={1} onChange={(event, value) => setGridOpacity(value)} aria-labelledby="continuous-slider" />
          <p className={'slider-label'}>X</p>
          <Slider value={xGrid} color={'secondary'} step={0.1} onChange={(event, value) => setXGrid(value)} aria-labelledby="continuous-slider" />
          <p className={'slider-label'}>Y</p>
          <Slider value={yGrid} color={'secondary'} step={0.1}  onChange={(event, value) => setYGrid(value)} aria-labelledby="continuous-slider" />
          <p className={'slider-label'}>Height</p>
          <Slider
            value={heightGrid}
            color={'secondary'}
            onChange={(event, value) => {
              setHeightGrid(value)
              if (checkbox) {
                setWidthGrid(value)
              }
            }}
            min={10}
            max={90}
            step={0.1}
            aria-labelledby="continuous-slider" />
          <p className={'slider-label'}>Width</p>
          <Slider
            value={widthGrid} color={'secondary'}
            onChange={(event, value) => {
            setWidthGrid(value)
            if (checkbox) {
              setHeightGrid(value)
            }
            }}
            min={10}
            max={90}
            step={0.1}
            aria-labelledby="continuous-slider" />
        </ThemeProvider>


      <div className="checkboxContainer">
        <p className={'gridLabel'}>Square grid:</p>

        <input
          className={'checkbox'}
          type="checkbox"
          onChange={() => {
          setWidthGrid(heightGrid)
          setCheckbox(!checkbox)
        }} value={checkbox}/>
        <span className="checkmark"/>
      </div>
        <div className="resetContainer">
          <Button
            className={'resetGrid'}
            variant={'info'}
            onClick={(e) => {
              setTable([]);
              setCount(0);
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

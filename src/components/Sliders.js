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

function Sliders({setTable, setCount, setXGrid, setYGrid, setWidthGrid, setHeightGrid, count, imageURL, setImageURL, xGrid, handleGridXChange, yGrid, handleGridYChange, heightGrid, handleGridHeightChange, widthGrid, handleGridWidthChange, checkbox, setCheckbox}) {
  return (
    <form >
      <h1 className={'title'}>WormTracker v1.0</h1>
      <h2 className={'count'}>Number of squares: {count}</h2>

      <h3 className={'imageTitle'}>Image link:</h3>
      <input className={'imageLink'} type="text" placeholder={imageURL} onChange={(e) => setImageURL(e.target.value) }/>

      <p className={'slider-label'}>Move the grid:</p>
        <ThemeProvider theme={theme}>
        <p className={'slider-label'}>X</p>
        <Slider value={xGrid} color={'secondary'} step={0.1} onChange={handleGridXChange} aria-labelledby="continuous-slider" />
        <p className={'slider-label'}>Y</p>
        <Slider value={yGrid} color={'secondary'} step={0.1}  onChange={handleGridYChange} aria-labelledby="continuous-slider" />
        <p className={'slider-label'}>Height</p>
        <Slider value={heightGrid} color={'secondary'} onChange={handleGridHeightChange} min={10} max={90} step={0.1}  aria-labelledby="continuous-slider" />
        <p className={'slider-label'}>Width</p>
        <Slider value={widthGrid} color={'secondary'} onChange={handleGridWidthChange} min={10} max={90} step={0.1} aria-labelledby="continuous-slider" />
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
              setWidthGrid(50);
              setHeightGrid(50);
              e.preventDefault();
            }}>Reset Grid</Button>
        </div>


    </form>
  )
}


export default Sliders;

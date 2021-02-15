import Button from "react-bootstrap/Button";

function ExImport({xGrid, yGrid, heightGrid, widthGrid, table, handleDownload, handlePaste, handleUpload, count, handleCopy}) {
  return (
    <div style={{marginTop: '20px'}} className="exportContainer">
      <p className={'importLabel'}>Import / Export Grid selection and position:</p>
      <div className="copyButtons">
        <Button
          className={'copyButton'}
          variant={'info'}
          onClick={(e) => handleCopy(e)}
        >Copy grid position</Button>
        <Button
          className="pasteButton"
          variant="info"
          onClick={(e) => handlePaste(e) }
        >
          Paste grid data
        </Button>
      </div>

      <div className="fileButtons">
        <Button
          variant={'info'}
          className="downloadButton"
          onClick={(e) =>  handleDownload(e)}

        >Download grid data</Button>
        <input style={{display: 'none'}} type={"file"} id={'files'} accept={'.txt'} onChange={(e) => handleUpload(e)} />
        <label className={'btn btn-info uploadButton'} htmlFor="files">Upload grid data</label>
      </div>

    </div>
  )
}

export default ExImport;

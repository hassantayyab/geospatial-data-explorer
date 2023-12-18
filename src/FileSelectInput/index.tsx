import './style.css'
import { FileSelectInputProps } from './file-select-input.props'

const FileSelectInput = ({
  selectedFile,
  removeFile,
  handleFileChange,
}: FileSelectInputProps) => {
  return (
    <label className="file-input-container" htmlFor="fileInput">
      <img
        className="upload-img"
        alt="upload file"
        src={process.env.PUBLIC_URL + '/upload.png'}
      />
      <div className="info">
        {selectedFile ? (
          <p>File selected: {selectedFile.name}</p>
        ) : (
          <>
            <span>Select a file for AOI</span>
            <small>Only JSON files acceptable</small>
          </>
        )}
      </div>
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        accept=".json"
      />
      {selectedFile && (
        <img
          onClick={(event) => {
            event.preventDefault()
            removeFile()
          }}
          className="remove-img"
          alt="upload file"
          src={process.env.PUBLIC_URL + '/remove.png'}
        />
      )}
    </label>
  )
}

export default FileSelectInput

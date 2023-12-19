import './style.css'
import DatePicker from 'react-datepicker'
import { SearchProps } from './search-props'
import FileSelectInput from '../FileSelectInput'

function Search({
  startDate,
  endDate,
  mapIntersects,
  fileIntersects,
  selectedFile,
  removeFile,
  handleSubmit,
  handleDateChange,
  handleFileChange,
}: SearchProps) {
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <FileSelectInput
        selectedFile={selectedFile}
        removeFile={removeFile}
        handleFileChange={handleFileChange}
      />

      <div className="date-range-container">
        <label className="date-range-label" htmlFor="date-range">
          Enter Date range
        </label>
        <DatePicker
          id="date-range"
          className="date-range-input"
          selected={startDate}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
        />
      </div>

      <button
        className="search-btn"
        type="submit"
        disabled={!fileIntersects && !mapIntersects}
      >
        Search
      </button>
    </form>
  )
}

export default Search

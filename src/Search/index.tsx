import './style.css'
import { AOIEnum } from '../aoi'
import DatePicker from 'react-datepicker'
import { SearchProps } from './search-props'
import FileSelectInput from '../FileSelectInput'

function Search({
  aoi,
  startDate,
  endDate,
  mapIntersects,
  fileIntersects,
  selectedFile,
  removeFile,
  handleSubmit,
  handleAoiChange,
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

      {/* Area of interest coordinates */}
      {/* <label>Enter AOI coordinates</label>
      <input
        type="text"
        value={aoi?.[AOIEnum.a]}
        className="coordinate-input"
        onChange={(e) => handleAoiChange(e, AOIEnum.a)}
        disabled={!!fileIntersects}
      />
      <input
        type="text"
        value={aoi?.[AOIEnum.b]}
        className="coordinate-input"
        onChange={(e) => handleAoiChange(e, AOIEnum.b)}
        disabled={!!fileIntersects}
      />
      <input
        type="text"
        value={aoi?.[AOIEnum.c]}
        className="coordinate-input"
        onChange={(e) => handleAoiChange(e, AOIEnum.c)}
        disabled={!!fileIntersects}
      />
      <input
        type="text"
        value={aoi?.[AOIEnum.d]}
        className="coordinate-input"
        onChange={(e) => handleAoiChange(e, AOIEnum.d)}
        disabled={!!fileIntersects}
      /> */}

      {/* Date range */}
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

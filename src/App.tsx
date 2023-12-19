import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import './App.css'
import Result from './Result'
import Search from './Search'
import { Intersects } from './intersects'
import MapContainer from './Map'

function App() {
  const fileInputRef = useRef<File | undefined>(undefined)

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [dateRange, setDateRange] = useState<string | undefined>(undefined)
  const [fileIntersects, setFileIntersects] = useState<Intersects | undefined>(
    undefined
  )
  const [mapIntersects, setMapIntersects] = useState<Intersects | undefined>(
    undefined
  )
  const [isSubmitted, setSubmitted] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const handleDateChange = (dates: [Date, Date]) => {
    setSubmitted(false)

    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSubmitted(false)

    const files = event.target.files

    if (files && files.length > 0) {
      fileInputRef.current = files[0]

      const reader = new FileReader()
      reader.onload = () => {
        try {
          const content = JSON.parse(reader.result as string)
          setFileIntersects(content.features[0].geometry)
        } catch (error) {
          console.error('Error parsing geo JSON file:', error)
          setFileIntersects(undefined)
        }
      }
      reader.readAsText(fileInputRef.current)
    }
  }

  const removeFile = () => {
    setSubmitted(false)
    fileInputRef.current = undefined
    setFileIntersects(undefined)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!startDate || !endDate) {
      return
    }

    setDateRange(`${startDate.toISOString()}/${endDate?.toISOString()}`)
    setCurrentPage(1)
    setSubmitted(true)
  }

  const renderInfoText = () => {
    if (!fileInputRef.current && !mapIntersects) {
      return 'Select GeoJSON file or draw a polygon on the map:'
    }

    if (mapIntersects) {
      return (
        <>
          <s>Select GeoJSON file</s> or draw a polygon on the map:
        </>
      )
    }

    return (
      <>
        Select GeoJSON file or <s>draw a polygon on the map:</s>
      </>
    )
  }

  return (
    <div className="container">
      <div className="search-col">
        <h6>{renderInfoText()}</h6>

        <MapContainer setMapIntersects={setMapIntersects} />

        <Search
          startDate={startDate}
          endDate={endDate}
          fileIntersects={fileIntersects}
          mapIntersects={mapIntersects}
          selectedFile={fileInputRef.current}
          handleDateChange={handleDateChange}
          removeFile={removeFile}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
        />
      </div>

      <Result
        dateRange={dateRange}
        intersects={mapIntersects || fileIntersects}
        isSubmitted={isSubmitted}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default App

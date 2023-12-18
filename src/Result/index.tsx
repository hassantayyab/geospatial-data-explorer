import axios from 'axios'
import { useEffect, useState } from 'react'
import { Feature } from './feature'
import { date } from './date'
import { ResultProps } from './result.props'
import './style.css'

const COLLECTIONS = 'landsat-c2l1,landsat-c2l2-st'
const PAGE_SIZE = 10

function Result({
  aoi,
  dateRange,
  intersects,
  currentPage,
  setCurrentPage,
  isSubmitted,
}: ResultProps) {
  const [features, setFeatures] = useState<Feature[]>([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    const stacApiUrl = 'https://landsatlook.usgs.gov/stac-server/search'

    async function loadResults() {
      setLoading(true)

      try {
        const data = await axios
          .get(stacApiUrl, {
            params: {
              collections: COLLECTIONS,
              limit: PAGE_SIZE,
              page: currentPage,
              ...(aoi && !intersects && { bbox: Object.values(aoi).join(',') }),
              ...(dateRange && { datetime: dateRange }),
              ...(intersects && {
                intersects: JSON.stringify(intersects),
              }),
            },
          })
          .then((response) => response.data)

        setError(undefined)
        setTotalItems(data.numberMatched)
        setFeatures(data?.features || [])
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message)
        }
      } finally {
        setLoading(false)
      }
    }

    if (isSubmitted) {
      console.log('isSubmitted', isSubmitted)

      loadResults()
    }
  }, [aoi, dateRange, intersects, isSubmitted, currentPage])

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  return (
    <div className="results-container">
      {isLoading && !error ? (
        <div>loading data...</div>
      ) : features.length > 0 ? (
        features.map((feature, i) => (
          <div key={i} className="card">
            <h4 className="card-title">{feature.collection}</h4>
            <p>{feature.description}</p>
            <p>{date(feature.properties.datetime)}</p>
          </div>
        ))
      ) : (
        isSubmitted && <p>No results found</p>
      )}

      {features.length > 0 && (
        <div className="buttons-container">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous Page
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage * PAGE_SIZE >= totalItems}
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  )
}

export default Result

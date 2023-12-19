import { useRef, useState } from 'react'
import {
  DrawingManager,
  GoogleMap,
  Polygon,
  useJsApiLoader,
} from '@react-google-maps/api'
import './style.css'
import { MapProps } from './map.props'
import {
  DEFAULT_LAT_LNG,
  MAP_OPTIONS,
  POLYGON_OPTIONS,
  ZOOM,
} from './constants'
import { PolygonRef } from './types'
import {
  latLngsToCoordinates,
  getLatLng,
  isOverlayPolygonEvent,
} from './helpers'

function MapComponent({ setSubmitted, setMapIntersects }: MapProps) {
  const polygonRef = useRef<PolygonRef | undefined>(undefined)
  const drawingManagerRef = useRef<
    google.maps.drawing.DrawingManager | undefined
  >(undefined)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:
      process.env.REACT_APP_GOOGLE_API_KEY ||
      'please add the google api key directly here',
    libraries: ['drawing'],
  })

  const [polygon, setPolygon] = useState<
    Array<google.maps.LatLngLiteral> | undefined
  >(undefined)

  const [center, setCenter] = useState<google.maps.LatLngLiteral | undefined>(
    DEFAULT_LAT_LNG
  )

  const drawingManagerOptions = {
    polygonOptions: POLYGON_OPTIONS,
    drawingControl: true,
    drawingControlOptions: {
      position: window.google?.maps.ControlPosition.TOP_CENTER,
      drawingModes: [window.google?.maps.drawing.OverlayType.POLYGON],
    },
  }

  const loadDrawingManager = (
    drawingManager: google.maps.drawing.DrawingManager
  ) => {
    drawingManagerRef.current = drawingManager
  }

  const loadPolygon = (polygon: google.maps.Polygon) => {
    polygonRef.current = { current: polygon }
  }

  const handleOverlayComplete = (
    overlayEvent: google.maps.drawing.OverlayCompleteEvent
  ) => {
    drawingManagerRef.current?.setDrawingMode(null)
    if (isOverlayPolygonEvent(overlayEvent)) {
      const newPolygon = overlayEvent.overlay
        .getPath()
        .getArray()
        .map(getLatLng)

      // start and end point should be same for valid geojson
      const startPoint = newPolygon[0]
      newPolygon.push(startPoint)
      overlayEvent.overlay?.setMap(null)

      setPolygon(newPolygon)
      setMapIntersects({
        type: 'Polygon',
        coordinates: latLngsToCoordinates(newPolygon),
      })
    }
  }

  const editPolygon = () => {
    if (polygonRef.current?.current) {
      const latLngCoords = polygonRef.current.current
        .getPath()
        .getArray()
        .map(getLatLng)

      setPolygon(latLngCoords)
      setMapIntersects({
        type: 'Polygon',
        coordinates: latLngsToCoordinates(latLngCoords),
      })
    }
  }

  const deleteSelectedPolygon = () => {
    setSubmitted(false)
    setPolygon(undefined)
    setMapIntersects(undefined)
  }

  return isLoaded ? (
    <div className="map-container">
      {drawingManagerRef.current && (
        <button
          type="button"
          className="delete-button"
          onClick={deleteSelectedPolygon}
        >
          <img alt="delete" src={process.env.PUBLIC_URL + '/delete.png'} />
        </button>
      )}
      <GoogleMap
        zoom={ZOOM}
        center={center}
        options={MAP_OPTIONS}
        mapContainerClassName="google-map"
        onTilesLoaded={() => setCenter(undefined)}
      >
        <DrawingManager
          onLoad={loadDrawingManager}
          onOverlayComplete={handleOverlayComplete}
          options={drawingManagerOptions}
        />
        {polygon && (
          <Polygon
            onLoad={(event) => loadPolygon(event)}
            onMouseUp={() => editPolygon()}
            onDragEnd={() => editPolygon()}
            options={POLYGON_OPTIONS}
            paths={polygon}
            draggable
            editable
          />
        )}
      </GoogleMap>
    </div>
  ) : (
    <p>Loading map...</p>
  )
}

export default MapComponent

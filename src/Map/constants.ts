export const ZOOM = 16

export const MAP_OPTIONS: google.maps.MapOptions = {
  mapTypeId: 'satellite',
  tilt: 45,
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
  gestureHandling: 'none'
}

export const DEFAULT_LAT_LNG: google.maps.LatLngLiteral = {
  lat: 48.16965,
  lng: 11.6091,
}

export const POLYGON_OPTIONS: google.maps.PolygonOptions = {
  fillOpacity: 0.5,
  fillColor: '#0664a8',
  strokeColor: '#0664a8',
  strokeWeight: 2,
  draggable: true,
  editable: true,
}

export const DRAWING_MANAGER_OPTIONS: google.maps.drawing.DrawingManagerOptions = {
  polygonOptions: POLYGON_OPTIONS,
  drawingControl: true,
  drawingControlOptions: {
    position: window.google?.maps?.ControlPosition?.BOTTOM_LEFT,
    drawingModes: [window.google?.maps.drawing.OverlayType.POLYGON],
  },
}

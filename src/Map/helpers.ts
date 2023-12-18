import { Coordinates } from "../intersects"

export function isOverlayPolygonEvent(overlayEvent: any): overlayEvent is google.maps.drawing.OverlayCompletePolygonEvent {
  return overlayEvent.type === google.maps.drawing.OverlayType.POLYGON
}

export function getLatLng(latLng: google.maps.LatLng) {
  return {
    lat: latLng.lat(),
    lng: latLng.lng(),
  }
}

export function latLngsToCoordinates(latLngValues: Array<google.maps.LatLngLiteral>): Coordinates {
  return [latLngValues.map((coords) => Object.values(coords))]
}

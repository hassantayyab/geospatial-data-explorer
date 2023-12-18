export type Coordinates = Array<Array<number[]>>;

export interface Intersects {
  type: 'Polygon';
  coordinates: Coordinates;
}
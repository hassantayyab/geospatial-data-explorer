export interface Feature {
  id: string;
  assets: Object;
  bbox: number[];
  collection: string;
  description: string;
  geometry: Object;
  links: Object[];
  properties: any;
  stac_extensions: string[];
  stac_version: string;
  type: 'Feature'
}
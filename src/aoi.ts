export enum AOIEnum {
  a, b, c, d
}

export type AOI = {
  [key in AOIEnum]?: string;
}
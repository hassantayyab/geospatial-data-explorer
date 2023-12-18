import { Dispatch, SetStateAction } from "react";
import { Intersects } from "../intersects";

export interface MapProps {
  setMapIntersects: Dispatch<SetStateAction<Intersects | undefined>>;
}

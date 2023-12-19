import { Dispatch, SetStateAction } from "react";
import { Intersects } from "../intersects";

export interface MapProps {
  setSubmitted: Dispatch<SetStateAction<boolean>>;
  setMapIntersects: Dispatch<SetStateAction<Intersects | undefined>>;
}

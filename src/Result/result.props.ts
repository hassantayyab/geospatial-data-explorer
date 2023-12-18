import { Dispatch, SetStateAction } from "react";
import { AOI } from "../aoi";
import { Intersects } from "../intersects";

export interface ResultProps {
  aoi?: AOI;
  dateRange?: string;
  intersects?: Intersects;
  isSubmitted: boolean;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

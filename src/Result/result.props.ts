import { Dispatch, SetStateAction } from "react";
import { Intersects } from "../intersects";

export interface ResultProps {
  dateRange?: string;
  intersects?: Intersects;
  isSubmitted: boolean;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

import { ChangeEvent, FormEvent } from "react";
import { AOI, AOIEnum } from "../aoi";
import { Intersects } from "../intersects";

export interface SearchProps {
  aoi?: AOI;
  startDate: Date;
  endDate?: Date;
  selectedFile?: File;
  fileIntersects?: Intersects;
  mapIntersects?: Intersects;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  handleAoiChange: (event: ChangeEvent<HTMLInputElement>, key: AOIEnum) => void
  handleDateChange: (dates: [Date, Date]) => void
  removeFile: () => void
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
}

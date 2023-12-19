import { ChangeEvent, FormEvent } from "react";
import { Intersects } from "../intersects";

export interface SearchProps {
  startDate: Date;
  endDate?: Date;
  selectedFile?: File;
  fileIntersects?: Intersects;
  mapIntersects?: Intersects;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  handleDateChange: (dates: [Date, Date]) => void
  removeFile: () => void
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
}

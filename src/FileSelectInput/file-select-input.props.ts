import { ChangeEvent } from "react"

export interface FileSelectInputProps {
  selectedFile?: File;
  removeFile: () => void;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
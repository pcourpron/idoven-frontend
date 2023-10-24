import { FC } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "..";

export const UploadFile: FC<{
  onDrop: (acceptedFiles: File[]) => void;
  text?: string;
}> = ({
  onDrop,
  text = "Drag 'n' drop some files here, or click to select files",
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} data-testid="upload-file" />
      {isDragActive ? <p>Drop the files here ...</p> : <Button>{text}</Button>}
    </div>
  );
};

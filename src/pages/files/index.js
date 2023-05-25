import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function FileDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    // Xử lý tệp tin sau khi được thả vào khu vực
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${
        isDragActive ? "active" : ""
      } bg-gray-200 border-dashed border-2 border-gray-400 rounded-lg p-4 w-[40%] flex justify-center items-center`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-gray-600">Kéo và thả tệp tin vào đây</p>
      ) : (
        <p className="text-gray-600">Thả tệp tin vào đây hoặc nhấp để chọn</p>
      )}
    </div>
  );
}

export default FileDropzone;

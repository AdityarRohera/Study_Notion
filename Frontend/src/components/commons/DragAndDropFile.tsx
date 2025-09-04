// import React from 'react'
import { useRef } from "react";
// import { deleteImage , deleteVideo } from "../../Services/operations/cloudinaryUpload";

function DragAndDropFile({text ,file , setFile , removeFile} : any) {

     const wrapperRef = useRef<HTMLDivElement>(null);
     const inputRef = useRef<HTMLInputElement>(null);

    //  console.log("Uploaded file is -> " , file);

    const onFileChange = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        const newFile = files[0];
        setFile(newFile);
        // console.log("Uploaded file:", newFile);
    };

     const onDragEnter = () => wrapperRef.current ? wrapperRef.current.classList.add('dragover') : null;

    const onDragLeave = () => wrapperRef.current ? wrapperRef.current.classList.remove('dragover') : null;

     const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        wrapperRef.current?.classList.remove("dragover");
        onFileChange(e.dataTransfer.files);
     };

  return (
      <div className="mb-6">

          <label className="block text-sm font-semibold mb-2">
            {text} <span className="text-red-500">*</span>
          </label>

          <div
                ref={wrapperRef}
                className="border-dashed border-2 border-gray-500 rounded-lg flex flex-col items-center justify-center py-10 cursor-pointer"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={(e) => e.preventDefault()} // important
                onClick={() => inputRef.current?.click()} // trigger file input when clicking div
                onDrop={onDrop}
           >
            
            <div className="text-4xl mb-4">⬆️</div>
            <p className="text-gray-400">
              Drag and drop a video, or{" "}
              <span className="text-yellow-300 cursor-pointer">Browse</span>
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Max 6MB each (12MB for videos)
            </p>
            <div className="flex gap-4 text-gray-500 text-xs mt-2">
              <span>• Aspect ratio 16:9</span>
              <span>• Recommended size 1024×576</span>
            </div>
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={(e) => onFileChange(e.target.files)}
                accept="video/*"
             />
          </div>

           {
  file ? (
    <div className="w-full">
      <div className="bg-gray-800 text-white rounded-lg shadow-md px-5 py-3 w-full">
        <h2 className="text-lg font-semibold mb-3 text-center">Uploaded File</h2>

        <div className="flex items-center justify-between bg-gray-700 px-4 py-2 rounded-md">
          {/* File Icon */}
          <div className="flex items-center gap-3">
            <img
              src={
                file.type.startsWith("image/")
                  ? URL.createObjectURL(file)
                  : "https://img.icons8.com/fluency/48/file.png"
              }
              alt="file-preview"
              className="w-10 h-10 rounded object-cover"
            />
            <div>
              <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
              <p className="text-xs text-gray-300">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>

          {/* Remove Button */}
          <button
            type="button"
            onClick={removeFile}
            className="flex items-center gap-1 px-3 py-1 text-xs bg-red-500 hover:bg-red-600 rounded-md transition"
          >
            🗑 Remove
          </button>
        </div>
      </div>
    </div>
  ) : null
}



        </div>
  )
}

export default DragAndDropFile;

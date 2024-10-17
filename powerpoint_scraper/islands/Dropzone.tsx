import { useState } from "preact/hooks";
import Progress from "../components/Progress.tsx";
import {
  CloudUploadIcon,
  FileIcon,
  XIcon,
  CheckIcon,
  ClipboardIcon,
} from "../components/Icons.tsx";

interface Slide {
  slide: string;
  text: string;
}

interface DropZoneProps {
  onSlidesReceived: (slides: Slide[]) => void;
}
export default function DropZone() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [slides, setSlides] = useState<Slide[] | null>(null);

  const handleFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      setSelectedFile(file);
      setProgress(0); // Reset progress to 0 when a new file is selected
      uploadFile(file);
    }
  };

  const uploadFile = (file: File) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file);

    xhr.open("POST", "/api/upload", true);

    // Update progress using the 'progress' event
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        setSlides(response.slides);
        setError(null);
        setCopied(false);
      } else {
        try {
          const response = JSON.parse(xhr.responseText);
          setError(response.error);
        } catch (e) {
          setError("An unexpected error occurred during upload.");
          console.error("Error during upload", xhr.responseText);
        }
      }
    };

    xhr.onerror = () => {
      setError("Network error during upload"); // Set network error message
      console.error("Network error during upload");
    };

    xhr.send(formData);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setProgress(0);
    setError(null); // Clear error when removing file
  };

  // Function to copy all slides to the clipboard
  const copyToClipboard = () => {
    setCopied(true);
    if (slides) {
      const allSlideText = slides
        .map((slide, index) => {
          return ` Slide ${index + 1}:\n${slide.text} \n`;
        })
        .join("\n\n");

      navigator.clipboard.writeText(allSlideText).catch((err) => {
        console.error("Failed to copy slides to clipboard:", err);
      });
    }
  };

  return (
    <div className="grid w-full max-w-md items-center gap-4">
      <div className="group relative flex h-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-[#111] text-white p-6 text-center transition-colors hover:border-gray-400">
        <CloudUploadIcon className="h-10 w-10 text-gray-700 group-hover:text-gray-400" />
        <h3 className="mt-4 text-sm font-semibold text-gray-300">
          Upload a file
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Drop your file here or click to select a file
        </p>
        <input
          type="file"
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={handleFileChange}
        />
      </div>

      {selectedFile && (
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileIcon className="h-5 w-5 text-gray-100" />
              <p className="text-sm font-medium text-gray-400">
                {selectedFile.name}
              </p>
            </div>
            <button onClick={removeFile}>
              <XIcon className="h-4 w-4 text-red-600" />
            </button>
          </div>
          <Progress value={progress} />
        </div>
      )}

      {error && (
        <div className="mt-2 flex items-center text-sm text-red-600">
          <XIcon className="mr-1 h-4 w-4 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {slides && (
        <div className="mt-4">
          <div className="flex items-center justify-between mt-4">
            <h4 className="text-lg font-semibold text-gray-200">
              Uploaded Slides:
            </h4>
            <button
              onClick={copyToClipboard}
              className={`flex items-center px-4 py-2 rounded-md transition-colors duration-300 ${
                copied ? "bg-green-600" : "bg-gray-600"
              } text-white hover:bg-gray-700`}
            >
              {copied ? (
                <CheckIcon className="h-3 w-2 mr-2" />
              ) : (
                <ClipboardIcon className="h-3 w-2 mr-2" />
              )}
            </button>
          </div>
          <ul className="mt-2 space-y-2">
            {slides.map((slide, index) => (
              <li key={index} className="bg-gray-800 p-4 rounded-md">
                <h5 className="text-md font-bold text-white">
                  Slide {index + 1}:
                </h5>
                <p className="text-sm text-gray-300">
                  {/* Convert newlines to <br /> for proper display */}
                  {slide.text.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Icon components

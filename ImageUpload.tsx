import React, { useRef } from 'react';
import { UploadCloudIcon } from './Icons';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  previewUrl: string | null;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, previewUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-6">
      <label htmlFor="imageUploadInput" className="block text-lg font-medium text-gray-300 mb-2">
        Step 1: Upload a Photo of Your Skin
      </label>
      <div
        onClick={handleAreaClick}
        onKeyPress={(e) => e.key === 'Enter' && handleAreaClick()}
        tabIndex={0}
        role="button"
        aria-label="Image upload area"
        className="mt-2 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:border-purple-500 transition-colors duration-150 ease-in-out bg-white/5 hover:bg-white/10"
      >
        <div className="space-y-1 text-center">
          {previewUrl ? (
            <img src={previewUrl} alt="Selected skin preview" className="mx-auto h-40 sm:h-48 w-auto rounded-md object-contain shadow-md" />
          ) : (
            <UploadCloudIcon className="mx-auto h-12 w-12 text-gray-500" />
          )}
          <div className="flex text-sm text-gray-400">
            <span className="relative rounded-md font-medium text-purple-400 hover:text-purple-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 focus-within:ring-purple-500">
              <span>{previewUrl ? "Change Image" : "Choose a file"}</span>
              <input
                id="imageUploadInput"
                name="imageUpload"
                type="file"
                accept="image/*"
                className="sr-only"
                ref={fileInputRef}
                onChange={handleFileChange}
                aria-describedby="file-type-description"
              />
            </span>
            {!previewUrl && <p className="pl-1">or drag and drop</p>}
          </div>
          {!previewUrl && <p id="file-type-description" className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>}
        </div>
      </div>
      {previewUrl && (
        <p className="text-xs text-gray-400 text-center mt-2">Image selected. Click above to choose a different one.</p>
      )}
    </div>
  );
};
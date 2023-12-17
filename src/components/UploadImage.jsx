// UploadImage.jsx
import React, { useState } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import ImageWithRectangles from './ImageWithRectangles';
import { UploadIcon } from '../assets';

const UploadImage = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImages((oldImages) => [
          ...oldImages,
          { src: reader.result, id: Date.now() },
        ]);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleImageDelete = (id) => {
    setSelectedImages((oldImages) =>
      oldImages.filter((image) => image.id !== id)
    );
  };

  return (
    <div>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
              <button type="button">
                <img
                  src={UploadIcon}
                  alt="Upload Icon"
                  width={70}
                  height={70}
                />
              </button>
            </div>
          </section>
        )}
      </Dropzone>
      <div>
        {selectedImages.map((image) => (
          <ImageWithRectangles
            key={image.id}
            src={image.src}
            id={image.id}
            handleImageDelete={handleImageDelete}
            width={500}
            height={500}
          />
        ))}
      </div>
    </div>
  );
};

export default UploadImage;

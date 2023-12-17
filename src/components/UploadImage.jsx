// UploadImage.jsx
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { UploadIcon } from '../assets';
import ImageWithRectangles from './ImageWithRectangles';

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
              <p>Drag & Drop some files here, or click to select files</p>
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
      <br />
      <div>
        {selectedImages.map((image) => (
          <div key={image.id} style={{ marginBottom: '15px' }}>
            <ImageWithRectangles
              src={image.src}
              id={image.id}
              handleImageDelete={handleImageDelete}
              width={500}
              height={500}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadImage;

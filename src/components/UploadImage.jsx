// UploadImage.jsx
import React, { useState } from 'react';
import ImageWithRectangles from './ImageWithRectangles';

const UploadImage = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = (event) => {
    Array.from(event.target.files).forEach((file) => {
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
      <input type="file" onChange={handleImageUpload} multiple />
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
  );
};

export default UploadImage;

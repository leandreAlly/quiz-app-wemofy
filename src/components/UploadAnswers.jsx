import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DropZone from './DropZone';

const DraggableImage = ({ image, index, moveImage }) => {
  const [, drag] = useDrag({
    type: 'IMAGE',
    item: { index },
  });

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        cursor: 'move',
        zIndex: 1,
      }}
    >
      <img
        src={image}
        alt={`Uploaded ${index}`}
        style={{ width: '100px', height: 'auto' }}
      />
    </div>
  );
};

const UploadAnswers = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const readers = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((values) => {
      setImages(values);
    });
  };

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setImages(updatedImages);
  };

  const handleDropOnParentImage = (index) => {
    console.log(`Child image dropped onto the parent at index ${index}`);
  };

  return (
    <>
      <div
        style={{
          position: 'relative',
          width: '800px',
          height: '600px',
          border: '1px solid #ccc',
        }}
      >
        <h2>Upload Answers</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          multiple
        />
        <br />
        {images.length > 0 && (
          <DropZone onDrop={() => handleDropOnParentImage(0)}>
            {images.map((image, index) => (
              <DraggableImage
                key={index}
                image={image}
                index={index}
                moveImage={moveImage}
              />
            ))}
          </DropZone>
        )}
      </div>
    </>
  );
};

export default UploadAnswers;

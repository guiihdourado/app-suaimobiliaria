import React, { useCallback, useEffect, useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { RiDeleteBinLine, RiUpload2Line } from 'react-icons/ri';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

interface ImageInputProps {
  name: string;
  dropzoneOptions?: DropzoneOptions;
  register: any;
  setValue: any;
  value: any[];
  errorMessage?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({ name, register, setValue, value, dropzoneOptions, errorMessage }) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    let acceptedFilesArray = acceptedFiles;
    if (value && value.length > 0) {
      acceptedFilesArray = [...value, ...acceptedFiles];
    }

    setValue(name, acceptedFilesArray);

    const imageUrls = acceptedFilesArray.map((file) => URL.createObjectURL(file));
    setPreviewImages(imageUrls);
  }, [name, value, setValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    ...dropzoneOptions,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
    },
    maxFiles: 50,
    maxSize: 6000000,
    minSize: 500,
  });

  useEffect(() => {
    if (value && value.length > 0) {
      const imageUrls = value.map((file) => URL.createObjectURL(file));
      setPreviewImages(imageUrls);
    }
  }, [value]);

  const handleRemoveImage = useCallback((index: number) => {
    const updatedValue = value.filter((_, i) => i !== index);
    setValue(name, updatedValue);

    const updatedImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(updatedImages);
  }, [value, previewImages, setValue, name]);

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;
  
      const updatedImages = Array.from(previewImages);
      const [removed] = updatedImages.splice(result.source.index, 1);
      updatedImages.splice(result.destination.index, 0, removed);
  
      const updatedValue = Array.from(value);
      const [removedValue] = updatedValue.splice(result.source.index, 1);
      updatedValue.splice(result.destination.index, 0, removedValue);
  
      const reorderedImages = updatedImages.map((_, index) => updatedValue[index]);
  
      setValue(name, reorderedImages);
      setPreviewImages(updatedImages);
    },
    [previewImages, setValue, value, name]
  );

  return (
    <div className="flex flex-col gap-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-4 cursor-pointer hover:border-gray-200 hover:border-solid ${
          isDragActive ? 'bg-gray-200' : 'bg-white'
        }`}
      >
        <input {...getInputProps()} {...register(`${name}`)} />
        <div className="flex flex-col gap-4">
          <div className="w-fit p-2 mx-auto rounded-full bg-sky-700">
            <RiUpload2Line size={24} className="mx-auto fill-white" />
          </div>
          <p className="text-center text-gray-500">Arraste e solte uma imagem aqui ou clique para selecionar</p>
        </div>
      </div>
      {!!errorMessage && <p className="text-red-500 text-sm font-bold">{errorMessage}</p>}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-4 gap-4 mx-auto">
              {previewImages.map((imageUrl: string, index: number) => (
                <Draggable key={imageUrl} draggableId={`image-${imageUrl}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="relative group"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <img
                        src={imageUrl}
                        alt={`Preview ${index}`}
                        className="w-[12.5rem] h-[12.5rem] rounded-xl object-cover"
                      />
                      {hoveredIndex === index ? (
                        <div
                          className="absolute top-1 right-1 cursor-pointer p-1 bg-[#F5F5F5] rounded-full hover:bg-sky-700 hover:text-white transition"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <RiDeleteBinLine size={20} />
                        </div>
                      ) : null}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export { ImageInput };
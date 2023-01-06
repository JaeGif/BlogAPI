import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['jpg', 'png', 'jpeg', 'mp4'];

function DragDrop({ handleChange }) {
  return (
    <FileUploader handleChange={handleChange} name='file' types={fileTypes} />
  );
}

export default DragDrop;

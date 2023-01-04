import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['jpg', 'png', 'jpeg', 'gif'];

function DragDrop({ handleChange }) {
  return (
    <FileUploader handleChange={handleChange} name='file' types={fileTypes} />
  );
}

export default DragDrop;

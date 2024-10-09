// components/FileInput.js
import { useState } from 'react';
import styles from './page.module.css'

const FileInput = ({ onFileSelect }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <input
        type="file"
        id="fileInput"
        name="profileImage"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hide the default file input
      />
      <label htmlFor="fileInput" className={styles.customFileUpload}>
        Escolher Imagem
      </label>
    </div>
  );
};

export default FileInput;

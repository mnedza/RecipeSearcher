import React, { useRef, useState, useEffect } from "react";
import styles from "./ImageUpload.module.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(props.image || null);
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file && props.image) {
      setPreviewUrl(props.image);
    }
  }, [file, props.image]);

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;

    if (props.mode === "add") {
      if (event.target.files && event.target.files.length === 1) {
        pickedFile = event.target.files[0];
        setFile(pickedFile);
        setIsValid(true);
        fileIsValid = true;
      } else {
        setFile(null);
        setIsValid(false);
        fileIsValid = false;
      }
    } else if (props.mode === "edit") {
      if (event.target.files && event.target.files.length === 1) {
        pickedFile = event.target.files[0];
        setFile(pickedFile);
        setIsValid(true);
        fileIsValid = true;
      } else {
        pickedFile = file;
        setIsValid(true);
        fileIsValid = true;
      }
    }

    setPreviewUrl(pickedFile ? URL.createObjectURL(pickedFile) : null);
    props.onInput(pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className={styles.example}>
      <input
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickHandler}
      />
      <div className={styles.preview}>
        {previewUrl && (
          <img src={previewUrl} alt="Preview" className={styles.img} />
        )}
        {!previewUrl && <p className={styles.info}>Please pick an image.</p>}
      </div>
      <button type="button" onClick={pickImageHandler}>
        Pick Image
      </button>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;

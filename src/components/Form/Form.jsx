// UploadImageForm.jsx
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import React, { useState, useRef } from "react";
import style from "./Form.module.css";
import { Button } from "../Controls/Button";

export const UploadImageForm = () => {
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    photo: null,
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false); // Новое состояние

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setIsSuccess(true); // Устанавливаем состояние успеха
  };

  const handleUpload = () => {
    fileInputRef.current.click();
    if (!formData.photo) {
      alert("Please select a file first");
      return;
    }
    alert("Image uploaded successfully!");
  };

  const isFormValid = formData.name && formData.email && formData.phone && formData.position && formData.photo;

  return (
    <>
      {isSuccess ? ( // Условный рендеринг
        <div className={style.success_screen}>
          <h1>Success</h1>
          <img
            src="success_image_url" // Укажите путь к вашему изображению "Success"
            alt="Success"
            style={{ width: "200px", marginTop: "10px" }}
          />
        </div>
      ) : (
        <form className={style.form} onSubmit={handleSubmit}>
          <h1 className={style.form_title}>Working with POST request</h1>
          <div className={style.form_content_wrapper}>
            <label className={style.form_label}>
              <input
                className={style.form_input}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </label>

            <label className={style.form_label}>
              <input
                className={style.form_input}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </label>

            <label className={style.form_label}>
              <input
                className={style.form_input_last}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
            </label>

            <label className={style.checkbox_title}>Select your position:</label>
            <label className={style.custom_radio}>
              <input
                type="radio"
                name="position"
                value="Frontend developer"
                checked={formData.position === "Frontend developer"}
                onChange={handleChange}
                className={style.checkbox}
              />
              <span className={style.radio_button}></span>
              Frontend developer
            </label>

            <label className={style.custom_radio}>
              <input
                type="radio"
                name="position"
                value="Backend developer"
                checked={formData.position === "Backend developer"}
                onChange={handleChange}
                className={style.middle_checkbox}
              />
              <span className={style.radio_button}></span>
              Backend developer
            </label>

            <label className={style.custom_radio}>
              <input
                type="radio"
                name="position"
                value="Designer"
                checked={formData.position === "Designer"}
                onChange={handleChange}
                className={style.checkbox}
              />
              <span className={style.radio_button}></span>
              Designer
            </label>

            <label className={style.custom_radio}>
              <input
                type="radio"
                name="position"
                value="QA"
                checked={formData.position === "QA"}
                onChange={handleChange}
                className={style.checkbox}
              />
              <span className={style.radio_button}></span>
              QA
            </label>

            <div className={style.upload_container}>
              <button
                type="button"
                onClick={handleUpload}
                className={style.upload_button}
              >
                Upload
              </button>
              <input
                ref={fileInputRef}
                className={style.img_input}
                type="file"
                name="photo"
                onChange={handleChange}
              />
            </div>
            <div className={style.btn_wrapper}>
              <Button text="Sign up" disabled={!isFormValid} />
            </div>

            {imagePreviewUrl && (
              <div>
                <h2>Selected Image:</h2>
                <img
                  src={imagePreviewUrl}
                  alt="Selected"
                  style={{ width: "200px", marginTop: "10px" }}
                />
              </div>
            )}
          </div>
        </form>
      )}
    </>
  );
};

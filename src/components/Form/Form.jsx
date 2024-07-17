// src/components/Form/components/UploadImageForm.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useRef } from "react";
import style from "./Form.module.css";
import { Button } from "../Controls/Button";
import img from "./Success.png";
import { Input } from "./components/Input";
import { RadioButtons } from "./components/Radio";
import Preloader from "./Preloader.jsx";

export const UploadImageForm = () => {
  const fileInputRef = useRef();
  const [selectedPosition, setSelectedPosition] =
    useState("Frontend developer");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    photo: null,
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({});

  const positions = [
    "Frontend developer",
    "Backend developer",
    "Designer",
    "QA",
  ];

  const handleChange = (e) => {
    console.log(e.target);
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

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      console.log(formData);
      setIsSuccess(true);
      setIsLoading(false);
    }, 2000); // Симуляция задержки для загрузки
  };

  const handleUpload = () => {
    fileInputRef.current.click();
    if (!formData.photo) {
      alert("Please select a file first");
      return;
    }
    alert("Image uploaded successfully!");
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.position &&
    formData.photo;

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : isSuccess ? (
        <div className={style.success_screen}>
          <h1 className={style.success_title}>User successfully registered</h1>
          <img src={img} alt="Success" className={style.success_img} />
        </div>
      ) : (
        <form className={style.form} onSubmit={handleSubmit}>
          <h1 className={style.form_title}>Working with POST request</h1>
          <div className={style.form_content_wrapper}>
            <Input
              value={formData.name}
              type={"text"}
              placeholder="Your name"
              onChange={handleChange}
              onBlur={handleBlur}
              name={"name"}
            />
            <Input
              value={formData.email}
              type={"email"}
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              name={"email"}
              errorMessage={"TEST ERROR"}
            />
            <Input
              value={formData.phone}
              type={"tel"}
              tooltip={"+3800000000"}
              placeholder="Phone"
              onChange={handleChange}
              onBlur={handleBlur}
              name={"phone"}
            />
            <div className={style.radio_wrapper}>
              <h2 className={style.radio_buttons__title}>
                Select your position
              </h2>
              <RadioButtons
                positions={positions}
                selectedPosition={selectedPosition}
                onChange={(value) => {
                  setSelectedPosition(value);
                  setFormData({ ...formData, position: value });
                }}
              />
            </div>
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
                onBlur={handleBlur}
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

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import style from "./Form.module.css";
import { Button } from "../Controls/Button";
import img from "./Success.png";
import { Input, InputMasked, RadioButton } from "./components";
import { Preloader } from "./components";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export const UploadImageForm = () => {
  const fileInputRef = useRef();
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(
          "https://frontend-test-assignment-api.abz.agency/api/v1/positions"
        );
        setPositions(response.data.positions);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };
    fetchPositions();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
      photo: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      position: Yup.string().required("Position is required"),
      photo: Yup.mixed().required("Photo is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setTimeout(() => {
        console.log(values);
        setIsSuccess(true);
        setIsLoading(false);
      }, 2000); // Симуляция задержки сети
    },
  });

  const validateImage = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(new Error("Invalid image"));
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await validateImage(file);
        formik.setFieldValue("photo", file);

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);

        setImageError("");
      } catch (error) {
        setImageError("The selected file is not a valid image.");
        formik.setFieldValue("photo", null);
      }
    }
  };

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const isFormValid = formik.isValid && formik.dirty;

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : isSuccess ? (
        <div className={style.success_screen}>
          <h4 className={style.success_title}>User successfully registered</h4>
          <img src={img} alt="Success" className={style.success_img} />
        </div>
      ) : (
        <form
          className={style.form}
          id="signUpForm"
          onSubmit={formik.handleSubmit}
        >
          <h3 className={style.form_title}>Working with POST request</h3>
          <div className={style.form_content_wrapper}>
            <Input
              id="name"
              value={formik.values.name}
              type="text"
              placeholder="Your name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
              errorMessage={formik.touched.name && formik.errors.name}
            />
            <Input
              id="email"
              value={formik.values.email}
              type="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              errorMessage={formik.touched.email && formik.errors.email}
            />
            <InputMasked
              id="phone"
              value={formik.values.phone}
              type="tel"
              tooltip={"+3800000000"}
              placeholder="Phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="phone"
              errorMessage={formik.touched.phone && formik.errors.phone}
            />
            <div className={style.radio_wrapper}>
              <h2 className={style.radio_buttons__title}>
                Select your position
              </h2>
              {positions.map((position) => (
                <RadioButton
                  key={position.id}
                  position={position}
                  selectedPosition={selectedPosition}
                  onChange={(value) => {
                    setSelectedPosition(value);
                    formik.setFieldValue("position", value);
                  }}
                />
              ))}
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
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
                style={{ display: "none" }}
              />
              <div className={style.image_preview_container}>
                {imagePreviewUrl ? (
                  <img
                    src={imagePreviewUrl}
                    alt="Selected"
                    className={style.image_preview}
                  />
                ) : (
                  <span className={style.placeholder}>Upload your photo</span>
                )}
              </div>
              {formik.touched.photo && formik.errors.photo && (
                <div className={style.error_message}>{formik.errors.photo}</div>
              )}
              {imageError && (
                <div className={style.error_message}>{imageError}</div>
              )}
            </div>
            <div className={style.btn_wrapper}>
              <Button type="submit" text="Sign up" disabled={!isFormValid} />
            </div>
          </div>
        </form>
      )}
    </>
  );
};
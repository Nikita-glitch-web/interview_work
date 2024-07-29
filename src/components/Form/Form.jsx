// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import style from "./Form.module.css";
import { Button } from "../Controls/Button";
import img from "./Success.png";
import { Input, InputMasked, RadioButton } from "./components";
import { Preloader } from "./components";
import { useFormik } from "formik";
import * as Yup from "yup";
import useImageValidation from "./useImageValidation";

export const UploadImageForm = () => {
  const fileInputRef = useRef();
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { imageError, fileName, handleFileChange } = useImageValidation();

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch(
          "https://frontend-test-assignment-api.abz.agency/api/v1/positions"
        );
        const data = await response.json();
        setPositions(data.positions);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };
    fetchPositions();
  }, []);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    position: "",
    photo: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters long")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .min(3, "Email must be at least 3 characters long")
      .required("Email is required"),
    phone: Yup.string()
      .min(3, "Phone must be at least 3 characters long")
      .required("Phone is required"),
    position: Yup.string().required("Position is required"),
    photo: Yup.mixed().required("Photo is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("position_id", selectedPosition);
      formData.append("photo", values.photo);

      try {
        const response = await fetch(
          "https://frontend-test-assignment-api.abz.agency/api/v1/users",
          {
            method: "POST",
            body: formData,
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (response.status === 201) {
          setIsSuccess(true);
        } else {
          formik.setFieldError("photo", "Failed to submit data.");
        }
      } catch (error) {
        formik.setFieldError("photo", "Failed to submit data.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileChange(file, formik.setFieldValue);
  };

  const getShortFileName = (name) => {
    const maxLength = 20;
    if (name.length <= maxLength) {
      return name;
    }
    return `${name.substring(0, 7)}...${name.substring(name.length - 10)}`;
  };

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
            <div
              className={classNames(style.upload_container, {
                [style.error_border]: imageError,
              })}
            >
              <button
                type="button"
                onClick={handleUpload}
                className={classNames(style.upload_button, {
                  [style.error_btn_input]: imageError,
                })}
              >
                Upload
              </button>
              <input
                ref={fileInputRef}
                className={style.img_input}
                type="file"
                name="photo"
                onChange={handleFileInputChange}
                onBlur={formik.handleBlur}
                style={{ display: "none" }}
              />
              <div className={style.image_preview_container}>
                {fileName ? (
                  <div className={style.file_name}>
                    {getShortFileName(fileName)}
                  </div>
                ) : (
                  <span className={style.placeholder}>Upload your photo</span>
                )}
              </div>
              {formik.touched.photo && formik.errors.photo && (
                <div className={style.error_message}>{formik.errors.photo}</div>
              )}
            </div>
            <div>
              {imageError && (
                <div className={style.error_message}>{imageError}</div>
              )}
            </div>
            <div className={style.btn_wrapper}>
              <Button type="submit" disabled={!formik.isValid || !formik.dirty}>
                Sign Up
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

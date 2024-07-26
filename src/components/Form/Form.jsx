// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import style from "./Form.module.css";
import { Button } from "../Controls/Button";
import img from "./Success.png";
import { Input, InputMasked, RadioButton } from "./components";
import { Preloader } from "./components";
import { useFormik } from "formik";
import * as Yup from "yup";

export const UploadImageForm = () => {
  const fileInputRef = useRef();
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [fileName, setFileName] = useState("");

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
          setImageError("Failed to submit data.");
        }
      } catch (error) {
        setImageError("Failed to submit data.");
      } finally {
        setIsLoading(false);
      }
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
     // Validate file type
     const validTypes = ["image/jpeg", "image/jpg", "image/png"];
     if (!validTypes.includes(file.type)) {
       setImageError("Only JPG and PNG images are allowed.");
       formik.setFieldValue("photo", null);
       return;
     }

     // Validate file size (max 5MB)
     const maxSize = 5 * 1024 * 1024; // 5MB
     if (file.size > maxSize) {
       setImageError("Image size should not exceed 5MB.");
       formik.setFieldValue("photo", null);
       return;
     }

     // Validate image dimensions (min 70x70 and max 5000x5000)
     const validateImageSize = (file) => {
       return new Promise((resolve, reject) => {
         const img = new Image();
         img.onload = () => {
           if (img.width < 200 || img.height < 200) {
             reject(
               new Error("Image dimensions should be at least 70x70 pixels.")
             );
           } else if (img.width > 5000 || img.height > 5000) {
             reject(
               new Error("Image dimensions should not exceed 5000x5000 pixels.")
             );
           } else {
             resolve(true);
           }
         };
         img.onerror = () => reject(new Error("Invalid image."));
         img.src = URL.createObjectURL(file);
       });
     };

     try {
       await validateImage(file);
       await validateImageSize(file);
       formik.setFieldValue("photo", file);
       setFileName(file.name);
       setImageError("");
     } catch (error) {
       setImageError(error.message);
       formik.setFieldValue("photo", null);
     }
   }
 };



  const handleUpload = () => {
    fileInputRef.current.click();
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
            {imageError && (
              <div className={style.error_message}>{imageError}</div>
            )}
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

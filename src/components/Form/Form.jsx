// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import style from "./Form.module.css";
import { Button } from "../Controls/Button";
import img from "./Success.png";
import { Input, InputMasked, RadioButton } from "./components";
import { Preloader } from "./components";
import axios from "axios";

export const UploadImageForm = () => {
  const fileInputRef = useRef();
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");
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
  const [errors, setErrors] = useState({});

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

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
    validateForm();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.position) newErrors.position = "Position is required";
    if (!formData.photo) newErrors.photo = "Photo is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

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
          <h4 className={style.success_title}>User successfully registered</h4>
          <img src={img} alt="Success" className={style.success_img} />
        </div>
      ) : (
        <form className={style.form} id="signUpForm" onSubmit={handleSubmit}>
          <h3 className={style.form_title}>Working with POST request</h3>
          <div className={style.form_content_wrapper}>
            <Input
              value={formData.name}
              type={"text"}
              placeholder="Your name"
              onChange={handleChange}
              onBlur={handleBlur}
              name={"name"}
              errorMessage={touched.name && errors.name}
            />
            <Input
              value={formData.email}
              type={"email"}
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              name={"email"}
              errorMessage={touched.email && errors.email}
            />
            <InputMasked
              value={formData.phone}
              type={"tel"}
              tooltip={"+3800000000"}
              placeholder="Phone"
              onChange={handleChange}
              onBlur={handleBlur}
              name={"phone"}
              errorMessage={touched.phone && errors.phone}
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
                    setFormData({ ...formData, position: value });
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
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className={style.image_preview_container}>
                {imagePreviewUrl && (
                  <img
                    src={imagePreviewUrl}
                    alt="Selected"
                    className={style.image_preview}
                  />
                )}
              </div>
              {touched.photo && errors.photo && (
                <div className={style.error_message}>{errors.photo}</div>
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

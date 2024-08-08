// Імпортуємо необхідні модулі та компоненти
import React, { useState, useEffect, useRef, ChangeEvent, FC } from "react";
import classNames from "classnames";
import style from "./Form.module.css";
import { Button } from "../Controls/Button";
import img from "./Success.png";
import { Input, InputMasked, RadioButton } from "./components";
import { Preloader } from "./components";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import useImageValidation from "./useImageValidation";

// Визначаємо інтерфейс для даних форми
interface FormValues {
  name: string;
  email: string;
  phone: string;
  position: string;
  photo: File | null;
}

// Визначаємо інтерфейс для позиції
interface Position {
  id: string;
  name: string;
}

// Основний компонент форми
export const UploadImageForm: FC = () => {
  // Використовуємо useRef для роботи з елементом input для завантаження файлу
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  // Стан для зберігання списку позицій
  const [positions, setPositions] = useState<Position[]>([]);
  
  // Стан для зберігання обраної позиції
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  
  // Стан для керування відображенням успіху
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  // Стан для керування відображенням завантаження
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Використовуємо кастомний хук для валідації зображень
  const { imageError, fileName, handleFileChange } = useImageValidation();

  // Завантажуємо список позицій під час монтування компонента
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch("https://frontend-test-assignment-api.abz.agency/api/v1/positions");
        const data = await response.json();
        setPositions(data.positions);
      } catch (error) {
        console.error("Помилка під час отримання позицій:", error);
      }
    };
    fetchPositions();
  }, []);

  // Початкові значення для форми
  const initialValues: FormValues = {
    name: "",
    email: "",
    phone: "",
    position: "",
    photo: null,
  };

  // Схема валідації для форми
  const validationSchema = Yup.object({
    name: Yup.string().min(3, "Ім'я повинно містити щонайменше 3 символи").required("Ім'я є обов'язковим"),
    email: Yup.string().email("Невірна електронна адреса").min(3, "Електронна адреса повинна містити щонайменше 3 символи").required("Електронна адреса є обов'язковою"),
    phone: Yup.string().min(3, "Телефон повинен містити щонайменше 3 символи").required("Телефон є обов'язковим"),
    position: Yup.string().required("Позиція є обов'язковою"),
    photo: Yup.mixed().required("Фото є обов'язковим"),
  });

  // Ініціалізація useFormik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: FormValues, { setFieldError }: FormikHelpers<FormValues>) => {
      setIsLoading(true);

      // Створюємо FormData для відправлення даних
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("position_id", selectedPosition);
      formData.append("photo", values.photo as Blob);

      try {
        const response = await fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.status === 201) {
          setIsSuccess(true);
        } else {
          setFieldError("photo", "Не вдалося відправити дані.");
        }
      } catch (error) {
        setFieldError("photo", "Не вдалося відправити дані.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Обробник для відкриття вікна вибору файлу
  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  // Обробник зміни файлу
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file, formik.setFieldValue);
    }
  };

  // Функція для скорочення довгого імені файлу
  const getShortFileName = (name: string) => {
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
          <h4 className={style.success_title}>Користувач успішно зареєстрований</h4>
          <img src={img} alt="Success" className={style.success_img} />
        </div>
      ) : (
        <form className={style.form} id="signUpForm" onSubmit={formik.handleSubmit}>
          <h3 className={style.form_title}>Робота з POST-запитом</h3>
          <div className={style.form_content_wrapper}>
            <Input
              id="name"
              value={formik.values.name}
              type="text"
              placeholder="Ваше ім'я"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
              errorMessage={formik.touched.name && formik.errors.name}
            />
            <Input
              id="email"
              value={formik.values.email}
              type="email"
              placeholder="Електронна пошта"
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
              placeholder="Телефон"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="phone"
              errorMessage={formik.touched.phone && formik.errors.phone}
            />
            <div className={style.radio_wrapper}>
              <h2 className={style.radio_buttons__title}>Оберіть вашу позицію</h2>
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
            <div className={classNames(style.upload_container, {
              [style.error_border]: imageError,
            })}>
              <button
                type="button"
                onClick={handleUpload}
                className={classNames(style.upload_button, {
                  [style.error_btn_input]: imageError,
                })}
              >
                upload
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
                  <span className={style.placeholder}>upload your photo</span>
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
                Sign in
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

import { useState, useCallback } from "react";

const useImageValidation = ({
  validTypes = ["image/jpeg", "image/jpg", "image/png"],
  maxSize = 5 * 1024 * 1024, // 5MB
  minWidth = 200,
  minHeight = 200,
  maxWidth = 5000,
  maxHeight = 5000,
} = {}) => {
  const [imageError, setImageError] = useState("");
  const [fileName, setFileName] = useState("");

  const validateImage = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(new Error("Invalid image"));
      img.src = URL.createObjectURL(file);
    });
  };

  const validateImageSize = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        if (img.width < minWidth || img.height < minHeight) {
          reject(
            new Error(
              `Image size should be at least ${minWidth}x${minHeight}px`
            )
          );
        } else if (img.width > maxWidth || img.height > maxHeight) {
          reject(
            new Error(`Image size should not exceed ${maxWidth}x${maxHeight}px`)
          );
        } else {
          resolve(true);
        }
      };
      img.onerror = () => reject(new Error("Invalid image."));
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = useCallback(
    async (file, setFieldValue) => {
      if (file) {
        // Validate file type
        if (!validTypes.includes(file.type)) {
          setImageError("Only JPG and PNG images are allowed.");
          setFieldValue("photo", null);
          return;
        }

        // Validate file size
        if (file.size > maxSize) {
          setImageError("Image size shouldn't exceed 5MB.");
          setFieldValue("photo", null);
          return;
        }

        try {
          await validateImage(file);
          await validateImageSize(file);
          setFieldValue("photo", file);
          setFileName(file.name);
          setImageError("");
        } catch (error) {
          setImageError(error.message);
          setFieldValue("photo", null);
        }
      }
    },
    [validTypes, maxSize, minWidth, minHeight, maxWidth, maxHeight]
  );

  return { imageError, fileName, handleFileChange };
};

export default useImageValidation;

import { useState } from "react";

const usePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return { passwordVisibility, togglePasswordVisibility };
};

export default usePasswordVisibility;

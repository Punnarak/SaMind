import { useState } from "react";

const usePasswordVisibility1 = () => {
  const [passwordVisibility1, setPasswordVisibility1] = useState(true);

  const togglePasswordVisibility1 = () => {
    setPasswordVisibility1(!passwordVisibility1);
  };

  return { passwordVisibility1, togglePasswordVisibility1 };
};

export default usePasswordVisibility1;

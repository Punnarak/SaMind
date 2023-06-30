import { useState } from "react";

const useCheck = () => {
  const [check, setCheck] = useState(true);

  const toggleCheck = () => {
    setCheck(!check);
  };

  return { check, toggleCheck };
};

export default useCheck;

import { FaStar } from "react-icons/fa";
import { useState } from "react";

const StarReview = ({ size, updateStars }) => {
  const [selected, setSelected] = useState(1);
  const stars = Array.from({ length: size }).fill(0);

  const handleClick = (index) => {
    setSelected(index + 1);
    updateStars(index + 1);
  }

  return (
    <div className="flex gap-3 items-center align middle">
      {stars.map((_, index) => (
        <FaStar
          size={30}
          fill={selected > index ? "yellow" : ""}
          className={`cursor-pointer transition hover:scale-150 duration-75`}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleClick(index)}
        />
      ))}
    </div>
  );
}

export default StarReview;
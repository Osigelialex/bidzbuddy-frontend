import * as React from "react";
import RemainingTime from "./RemainingTime";

export default function ProductDetailCard({ image, title, remainingTime }) {
  return (
    <div className=" sm:min-w-128 max-w-128 container">
      <div className="grid place-items-center bg-gray-950 text-white">
        <RemainingTime milliseconds={remainingTime} />
      </div>
      <img loading="lazy" className="object-full w-full" src={image} alt={title} />
    </div>
  );
}

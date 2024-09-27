import React from "react";

function PageCard({ name, description, image, page }) {
  return (
    <a
      href={page}
      className="transition-all duration-300 hover:scale-110 hover:z-10"
    >
      <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm min-w-96 mx-auto">
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/40"></div>
        <h3 className="z-10 mt-3 text-3xl font-bold text-white">{name}</h3>
        <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 min-h-12 text-gray-300">
          {description}
        </div>
      </div>
    </a>
  );
}

export default PageCard;

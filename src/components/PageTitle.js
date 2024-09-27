import React from "react";

function PageTitle({ image, title, percent }) {
  return (
    <div
      className="shadow-[inset_0_0_10px_rgba(0,0,0,0.75)] bg-center bg-cover h-56 p-5 flex justify-center justify-items-center items-center relative overflow-hidden group"
      // style={{ backgroundImage: `url(${image})` }}
    >
      <img
        src={image}
        alt=""
        className="absolute w-full -z-10 group-hover:scale-110 group-hover:blur-[2px] transition-all duration-300"
      />
      {percent ? (
        <div
          className="absolute -z-10 w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, transparent ${
              Math.round(percent * 100) / 100
            }%, #000000cc ${Math.floor((percent + 5) * 100) / 100}%)`,
          }}
        />
      ) : null}

      <h1 className="absolute text-center tracking-wide text-6xl text-black font-semibold blur-lg">
        {title}
      </h1>
      <h1 className="text-center tracking-wide text-6xl text-white font-semibold z-10">
        {title}
      </h1>
    </div>
  );
}

export default PageTitle;

import React, { useState } from "react";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue) {
      // Evitar tags duplicadas
      if (!tags.includes(inputValue)) {
        setTags([...tags, inputValue]);
      }
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex flex-wrap items-center p-2 border border-gray-300 rounded">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="flex items-center bg-primary-700 font-medium text-white text-xs uppercase px-2 py-1 m-1 rounded"
          style={{ fontFamily: "'Fira Sans'" }}
        >
          {tag}
          <button
            className="ml-2 text-gray-500 hover:text-gray-800"
            onClick={() => removeTag(index)}
          >
            &times;
          </button>
        </div>
      ))}
      <input
        className="flex-grow p-1 m-1 focus:outline-none rounded-md"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Lojas"
      />
    </div>
  );
};

export default TagInput;

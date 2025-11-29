"use client";

import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

const Dropdown = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-neutral-800 rounded-md max-w-full md:max-w-2xl lg:max-w-[1115px] mx-auto p-5 md:p-7 mb-3 transition-all duration-300 ease-in-out hover:bg-neutral-600">
      <button
        className="flex text-base md:text-lg lg:text-xl justify-between w-full font-bold focus:outline-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{title}</span>
        <span>{isOpen ? <FaTimes /> : <FaPlus />}</span>
      </button>
      <div className={`overflow-hidden text-start transition-max-height duration-500 ease-in-out ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
        <p className="mt-2 text-white">{content}</p>
      </div>
    </div>
  );
};

export default function DropdownList() {
  const dropdownItems = [
    { title: "What is Netflix?", content: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices." },
    { title: "How much does Netflix cost?", content: "Plans range from ₦2,200 to ₦7,000 a month. No extra costs, no contracts." },
    { title: "Where can I watch?", content: "Sign in with your Netflix account to watch instantly on various devices." },
    { title: "How do I cancel?", content: "You can easily cancel your account online in two clicks. No cancellation fees." },
    { title: "What can I watch on Netflix?", content: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, and more." },
    { title: "Is Netflix good for kids?", content: "The Netflix Kids experience gives parents control while kids enjoy family-friendly content." },
  ];

  return (
    <div className=" p-7 ">
      <h2 className="font-extrabold md:ml-[90px] lg:[95px] mb-4 text-lg ">
        Frequently Asked Questions
      </h2>
      {dropdownItems.map((item, index) => (
        <Dropdown key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
}
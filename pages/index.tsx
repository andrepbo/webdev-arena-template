import React, { useState, useEffect } from "react";
import {
  FiBell,
  FiClock,
  FiChevronDown,
  FiCornerDownLeft,
  FiCheckCircle,
  FiCheck,
} from "react-icons/fi";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";
import {
  MdOutlineImage,
  MdOutlineSmartDisplay,
  MdOutlineMusicNote,
  MdOutlineExtension,
  MdOutlineCode,
  MdOutlineTextFields,
  MdOutlineChatBubbleOutline,
  MdOutlineEmail,
  MdOutlineFolder,
} from "react-icons/md";
import { FaFacebookF, FaPinterestP, FaShareAlt } from "react-icons/fa";
import { TbTransform, TbLayoutGrid } from "react-icons/tb";
import { HiOutlineMenuAlt3, HiOutlinePaperClip } from "react-icons/hi";
import { TiPinOutline } from "react-icons/ti";

const EditorApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [highlightPos, setHighlightPos] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setHighlightPos({
          top: rect.top + window.scrollY - 40,
          left: rect.right + window.scrollX,
        });
      } else {
        setHighlightPos(null);
      }
    };
    document.addEventListener("mouseup", handleSelection);
    return () => document.removeEventListener("mouseup", handleSelection);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-black dark:bg-gray-900 dark:text-white font-sans flex flex-col">
      {highlightPos && (
        <div
          className="absolute z-50 flex items-center gap-2 px-3 py-2 bg-blue-100 rounded-full shadow-md"
          style={{ top: highlightPos.top, left: highlightPos.left }}
        >
          <img
            src="https://placehold.co/32x32"
            alt="avatar"
            className="w-8 h-8 rounded-full border"
          />
          <HiOutlineMenuAlt3 className="text-gray-700" />
        </div>
      )}
      <header className="fixed top-0 z-40 w-full bg-white dark:bg-gray-900 border-b dark:border-gray-700 px-4 py-4 flex flex-row flex-wrap items-center justify-between gap-4">
        <div
          onClick={() => setDarkMode(!darkMode)}
          className="hidden md:flex w-20 h-10 bg-gray-100 dark:bg-gray-800 rounded-full p-1 items-center justify-between cursor-pointer relative"
        >
          <BsSunFill className="text-lg text-gray-500 ml-2 z-10" />
          <BsMoonStarsFill className="text-lg text-gray-500 mr-2 z-10" />
          <div
            className={`absolute top-1 w-8 h-8 bg-white rounded-full shadow-md transition-all duration-300 ${
              darkMode ? "right-1" : "left-1"
            }`}
          />
        </div>

        <div className="flex flex-col items-start md:flex-row md:items-center md:gap-4 md:mx-auto">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-1 mb-2 md:mb-0">
            <FiClock className="text-base" />
            Auto saved 13mins ago
          </div>
          <div className="flex gap-4">
            <button className="border px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">
              Save Draft
            </button>
            <div className="flex divide-x divide-white/20 rounded overflow-hidden border border-black dark:border-white text-sm font-medium">
              <button className="bg-black text-white px-4 py-2 hover:bg-gray-800">
                Publish
              </button>
              <button className="bg-zinc-800 text-white px-2 py-2 hover:bg-zinc-700 flex items-center justify-center">
                <FiChevronDown className="text-xs" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 self-end md:mt-0 md:self-auto md:w-fit">
          <FiBell className="text-xl text-gray-500 dark:text-gray-400 cursor-pointer" />
          <img
            src="https://placehold.co/32x32"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover border"
          />
        </div>
      </header>

      <div className="fixed z-50 bottom-0 md:bottom-auto left-0 w-full md:top-1/2 md:left-4 md:-translate-y-1/2 md:w-14 bg-white dark:bg-gray-800 border md:rounded-2xl shadow-lg border-gray-200 dark:border-gray-700 flex md:flex-col items-center justify-center md:justify-start md:items-center px-2 md:px-0 py-2 md:py-0 overflow-x-auto md:overflow-visible">
        <div className="flex md:flex-col gap-x-6 md:gap-y-4 md:py-4 w-max md:w-full">
          <div className="flex md:flex-col items-center gap-x-6 md:gap-y-4">
            <button
              aria-label="Insert image"
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MdOutlineImage />
            </button>
            <button
              aria-label="Insert video"
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MdOutlineSmartDisplay />
            </button>
            <button
              aria-label="Insert music"
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MdOutlineMusicNote />
            </button>
            <button
              aria-label="Insert extension"
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MdOutlineExtension />
            </button>
            <button
              aria-label="Insert code"
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MdOutlineCode />
            </button>
          </div>

          <hr className="hidden md:block border-t border-gray-200 dark:border-gray-700 w-full my-2" />

          <div className="flex md:flex-col items-center gap-x-6 md:gap-y-4">
            <button
              aria-label="Insert text"
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MdOutlineTextFields />
            </button>
            <button
              aria-label="Transform text"
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <TbTransform />
            </button>
            <button
              aria-label="Open chat"
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MdOutlineChatBubbleOutline />
            </button>
          </div>

          <hr className="hidden md:block border-t border-gray-200 dark:border-gray-700 w-full my-2" />

          <div className="flex md:flex-col items-center gap-x-6 md:gap-y-4">
            <button
              aria-label="Open grid layout"
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <TbLayoutGrid />
            </button>
            <button
              aria-label="Open folder"
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MdOutlineFolder />
            </button>
          </div>
        </div>
      </div>

      <div className="md:flex flex-1">
        <main className="flex-1 overflow-y-auto max-h-screen px-4 md:px-6 py-8 md:py-12 pt-[88px] flex justify-center">
          <div className="w-full max-w-4xl md:pt-12 pt-16">
            <div className="text-red-600 font-semibold text-sm mb-2">NEWS</div>
            <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4 md:mb-6">
              The United States of Fashion Meet the 56 people Changing the
              Fashion landscape of America
            </h1>
            <div className="w-full h-52 md:h-[260px] bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 md:mb-6 relative overflow-hidden">
              <input
                id="file-upload"
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="absolute inset-0 cursor-pointer flex flex-col items-center justify-center text-center"
              >
                <div className="text-gray-400 text-sm font-medium">
                  Upload Image or Video
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  jpg, png, gif not exceeding 1mb
                  <br />
                  mp4, mov not exceeding 20mb
                </div>
              </label>
              {selectedFile && (
                <div className="absolute bottom-2 left-2 text-sm text-gray-600 dark:text-gray-300">
                  Selected file: {selectedFile.name}
                </div>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-6">
              Meet the 56 people—from Nantucket to Oregon and from Santa Fe to
              Minneapolis—changing the landscape of American fashion.
            </p>

            <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 md:py-6 mb-8 md:mb-12 flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0">
              <div className="flex items-center gap-4">
                <img
                  src="https://placehold.co/48x48"
                  alt="Author"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-sm flex items-center gap-1">
                    JULIA ROBERTS{" "}
                    <MdOutlineEmail className="text-gray-500 dark:text-gray-400" />
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 max-w-[240px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                  LAST UPDATED JAN 13,2021
                </div>
                <div className="flex gap-2">
                  <button className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-sm text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                    <FaFacebookF size={14} />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-sm text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                    <FaPinterestP size={14} />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-sm text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                    <FaShareAlt size={14} />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-sm text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                    <MdOutlineEmail size={16} />
                  </button>
                </div>
              </div>
            </div>

            <article className="space-y-4 md:space-y-6 text-gray-800 dark:text-gray-200 text-base leading-relaxed pb-8">
              <p>
                Wildest time, the pin of American fashion only ever dropped on
                one place: New York City. As those living elsewhere—and anybody
                who has traveled from sea to shining sea—knows, though, there’s
                a diverse and ever-growing crowd of designers, visionaries,
                artisans, and native heritage-keepers working across the
                country, imbuing their work with craft, history, and a focus on
                community.
              </p>
              <p>
                For our February issue, we spent months finding, photographing,
                and interviewing scores of creatives everywhere from large
                cities to small towns—from Miami to Los Angeles to Lodge Grass,
                population 428.
              </p>
            </article>
          </div>
        </main>

        <aside className="w-full md:w-80 px-4 md:pt-24 pt-6 pb-[88px] md:pb-0 space-y-6 bg-white dark:bg-gray-900 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Article Completion
              </h3>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                40%
              </span>
            </div>
            <p className="text-xs text-gray-500">10/26 Comments resolved</p>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-black dark:bg-white rounded-full"
                style={{ width: "40%" }}
              ></div>
            </div>
          </div>

          <hr className="border-t border-gray-200 dark:border-gray-700" />

          <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded w-fit">
            <MdOutlineChatBubbleOutline className="text-gray-500 dark:text-gray-400" />
            Comments
          </div>

          <div className="space-y-4 max-h-[calc(100vh-240px)] overflow-y-auto pr-2">
            <div className="relative flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full flex items-center justify-center bg-black dark:bg-white">
                  <FiCheck className="text-white dark:text-black text-[10px]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <img
                    src="https://placehold.co/32x32"
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">Harmony Antony</p>
                    <p className="text-xs text-gray-500">12 hrs ago</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  @Julia can you look into new suggestions from @Sylvia to make
                  sure the imagery is correct.
                </p>
              </div>
            </div>

            <div className="relative bg-blue-50 p-3 rounded-md border-l-4 border-black flex gap-3 dark:border-slate-500">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full border border-black bg-white">
                  <FiCheck className="text-white text-[10px]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <img
                    src="https://placehold.co/32x32"
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium dark:text-black">
                      Olivia Gil
                    </p>
                    <p className="text-xs text-gray-500">8 hrs ago</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-2">
                  Can we see a rephrased sample of the line here, Thank you!
                </p>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <FiCornerDownLeft /> Reply
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCheckCircle /> Resolved
                  </span>
                </div>
              </div>
            </div>

            <div className="relative flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full border border-black dark:border-white bg-white">
                  <FiCheck className="text-white text-[10px]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <img
                    src="https://placehold.co/32x32"
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">Harmony Antony</p>
                    <p className="text-xs text-gray-500">8 hrs ago</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Here are some image suggestions from @sylvia as replacements
                  from the shoot !!!
                </p>
                <p className="text-xs text-gray-400 mt-1">📎 3 Attachments</p>
                <div className="flex gap-2 mt-2">
                  <img
                    src="https://placehold.co/80x80"
                    className="rounded"
                    alt=""
                  />
                  <img
                    src="https://placehold.co/80x80"
                    className="rounded"
                    alt=""
                  />
                  <img
                    src="https://placehold.co/80x80"
                    className="rounded"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded px-3 py-2 focus-within:outline-none text-sm mt-4">
            <input
              type="text"
              placeholder="@ comment"
              className="flex-1 bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm focus:outline-none"
            />
            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-base">
              <HiOutlinePaperClip className="cursor-pointer" />
              <TiPinOutline className="cursor-pointer" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EditorApp;

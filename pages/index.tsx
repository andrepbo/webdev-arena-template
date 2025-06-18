import { useState, useEffect, useCallback } from "react";
import { FaMicrophone, FaPlay, FaStop, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import {
  IoIosArrowDown,
  IoMdSettings,
  IoMdInformationCircle,
  IoMdHelpCircle,
  IoMdApps,
  IoMdHome,
} from "react-icons/io";
import { MdDarkMode } from "react-icons/md";

const voiceEffects = [
  "Robot",
  "Alien",
  "Baby",
  "Chipmunk",
  "Female",
  "Male",
  "Darth Vader",
  "Radio",
  "Squeak",
  "Gargle",
  "Custom 1",
  "Custom 2",
];

const ambientSounds = [
  "None",
  "Rain",
  "Thunderstorm",
  "Wind",
  "Waves",
  "Fire",
  "Coffee Shop",
  "Night",
];

const soundDescriptions = {
  "None": "",
  "Rain": "Rain Description",
  "Thunderstorm": "Thunderstorm Description",
  "Wind": "Wind Description",
  "Waves": "Waves Description",
  "Fire": "Fire Description",
  "Coffee Shop": "Coffee Shop Description",
  "Night": "Night Description",
};

export default function VoiceChangerApp() {
  const [selectedEffect, setSelectedEffect] = useState("Robot");
  const [ambientSound, setAmbientSound] = useState("None");
  const [voiceChangerOn, setVoiceChangerOn] = useState(false);
  const [ambientSoundOn, setAmbientSoundOn] = useState(false);
  const [showEffectDropdown, setShowEffectDropdown] = useState(false);
  const [showSoundDropdown, setShowSoundDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedEffectDescription, setSelectedEffectDescription] = useState("Robot Description");

  const toggleVoiceChanger = useCallback(() => {
    setVoiceChangerOn((prev) => !prev);
  }, []);

  const toggleAmbientSound = useCallback(() => {
    setAmbientSoundOn((prev) => !prev);
  }, []);

  const toggleMenu = useCallback(() => {
    setShowMenu((prev) => !prev);
  }, []);

  const toggleEffectDropdown = useCallback(() => {
    setShowEffectDropdown((prev) => !prev);
  }, []);

  const toggleSoundDropdown = useCallback(() => {
    setShowSoundDropdown((prev) => !prev);
  }, []);

  useEffect(() => {
    setDescription(soundDescriptions[ambientSound]);
    setSelectedEffectDescription(`${selectedEffect} Description`);
  }, [ambientSound, selectedEffect]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden relative w-[450px] h-[750px]">
        {/* Top Bar */}
        <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors">
              <MdDarkMode className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors">
              <IoMdSettings className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors">
              <IoMdInformationCircle className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors">
              <IoMdHelpCircle className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors">
              <IoMdApps className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors">
              <IoMdHome className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Voice Changer</h1>

          <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32 mb-4">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
                <FaMicrophone className="w-16 h-16 text-white" />
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors">
                <FaPlay className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-gray-700">Voice Changer:</span>
              <button onClick={toggleVoiceChanger} className={`w-14 h-8 rounded-full flex items-center px-1 transition-colors duration-300 ${voiceChangerOn ? "bg-green-500" : "bg-gray-300"}`}>
                <div className={`w-6 h-6 rounded-full bg-white shadow transform transition-transform duration-300 ${voiceChangerOn ? "translate-x-6" : "translate-x-0"}`}></div>
              </button>
              <span className="font-medium text-gray-700">{voiceChangerOn ? "ON" : "OFF"}</span>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="font-medium text-gray-700">Ambient Sound:</span>
              <button onClick={toggleAmbientSound} className={`w-14 h-8 rounded-full flex items-center px-1 transition-colors duration-300 ${ambientSoundOn ? "bg-green-500" : "bg-gray-300"}`}>
                <div className={`w-6 h-6 rounded-full bg-white shadow transform transition-transform duration-300 ${ambientSoundOn ? "translate-x-6" : "translate-x-0"}`}></div>
              </button>
              <span className="font-medium text-gray-700">{ambientSoundOn ? "ON" : "OFF"}</span>
            </div>
          </div>

          <div className="w-full space-y-4">
            <div className="relative">
              <button onClick={toggleEffectDropdown} className="w-full flex justify-between items-center px-4 py-2 bg-white rounded-lg border border-gray-300 shadow-sm text-gray-700 font-medium hover:bg-gray-50">
                <span>{selectedEffect}</span>
                <IoIosArrowDown className={`transition-transform duration-200 ${showEffectDropdown ? "rotate-180" : ""}`} />
              </button>
              {showEffectDropdown && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg border border-gray-200 shadow-lg z-10">
                  <div className="max-h-60 overflow-y-auto py-1">
                    {voiceEffects.map((effect) => (
                      <button key={effect} onClick={() => { setSelectedEffect(effect); setShowEffectDropdown(false); }} className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700">
                        {effect}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={toggleSoundDropdown} className="w-full flex justify-between items-center px-4 py-2 bg-white rounded-lg border border-gray-300 shadow-sm text-gray-700 font-medium hover:bg-gray-50">
                <span>{ambientSound}</span>
                <IoIosArrowDown className={`transition-transform duration-200 ${showSoundDropdown ? "rotate-180" : ""}`} />
              </button>
              {showSoundDropdown && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg border border-gray-200 shadow-lg z-10">
                  <div className="max-h-60 overflow-y-auto py-1">
                    {ambientSounds.map((sound) => (
                      <button key={sound} onClick={() => { setAmbientSound(sound); setShowSoundDropdown(false); }} className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700">
                        {sound}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center px-6 py-3 bg-white border-t border-gray-200">
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-blue-500 hover:bg-gray-200 transition-colors">
              <FaVolumeUp className="w-5 h-5" />
            </button>
            <span className="font-medium text-gray-700">89%</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
              <FaStop className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-colors">
              <FaPlay className="w-6 h-6" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
              <FaVolumeMute className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">99%</span>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-blue-500 hover:bg-gray-200 transition-colors">
              <FaVolumeUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// Zod Schema
export const Schema = {
    "commentary": "",
    "template": "nextjs-developer",
    "title": "",
    "description": "",
    "additional_dependencies": [
        "react-icons"
    ],
    "has_additional_dependencies": true,
    "install_dependencies_command": "npm install react-icons",
    "port": 3000,
    "file_path": "pages/index.tsx",
    "code": "<see code above>"
}
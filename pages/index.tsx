import { useState } from "react";
import { MdSettings } from "react-icons/md";
import { SiBat } from "react-icons/si";
import { LuMessageSquareText } from "react-icons/lu";
import { RxMinus, RxSquare, RxCross2 } from "react-icons/rx";
import { GiSoundWaves } from "react-icons/gi";
import { RiSpaceShipFill } from "react-icons/ri";
import { FaAndroid } from "react-icons/fa";
import {
  FaFaceTired,
  FaFaceGrinTongueWink,
  FaFaceAngry,
  FaFaceSurprise,
} from "react-icons/fa6";
import { PiBabyFill, PiAlienFill, PiPoliceCarFill } from "react-icons/pi";
import { SiSurveymonkey } from "react-icons/si";
import { BsFan } from "react-icons/bs";
import Head from "next/head";

const effects = [
  { id: 1, name: "No effects", icon: <GiSoundWaves size={36} /> },
  { id: 2, name: "Alien", icon: <RiSpaceShipFill size={36} /> },
  { id: 3, name: "Android", icon: <FaAndroid size={36} /> },
  { id: 4, name: "Aphonic", icon: <FaFaceTired size={36} /> },
  { id: 5, name: "Baby", icon: <PiBabyFill size={36} /> },
  { id: 6, name: "Alien", icon: <PiAlienFill size={36} /> },
  { id: 7, name: "Chipmunk", icon: <SiSurveymonkey size={36} /> },
  { id: 8, name: "Cop", icon: <PiPoliceCarFill size={36} /> },
  { id: 9, name: "Crazy", icon: <FaFaceGrinTongueWink size={36} /> },
  { id: 10, name: "Dark", icon: <FaFaceAngry size={36} /> },
  { id: 11, name: "Echo", icon: <FaFaceSurprise size={36} /> },
  { id: 12, name: "Fan", icon: <BsFan size={36} /> },
];

export default function VoiceChangerApp() {
  const [selectedEffect, setSelectedEffect] = useState(1);
  const [voiceChanger, setVoiceChanger] = useState(true);
  const [ambientSound, setAmbientSound] = useState(false);
  const [listenFX, setListenFX] = useState(true);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen w-full bg-gradient-to-br from-[#21A3EA] to-[#4CDFC4] text-white flex items-center justify-center p-4 font-[Poppins]">
        <div className="w-full max-w-[900px] h-full sm:h-[600px] bg-[#2c2c2c] shadow-[0_25px_70px_rgba(0,0,0,0.4)] flex flex-col sm:flex-row">
          {/* Sidebar */}
          <aside className="w-full sm:w-16 bg-[#1f1f1f] flex sm:flex-col justify-between sm:justify-between items-center sm:items-center p-0 relative">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#21A3EA] to-[#4CDFC4] flex items-center justify-center">
                <SiBat size={20} className="text-white" />
              </div>
              <div className="mt-4 hidden sm:block">
                <button className="text-gray-300 hover:text-white">
                  <MdSettings size={24} />
                </button>
              </div>
            </div>
            <div className="hidden sm:flex flex-col items-center gap-4 pb-4">
              <button className="text-gray-300 hover:text-white">
                <LuMessageSquareText size={24} />
              </button>
            </div>
            <div className="flex sm:hidden items-center gap-4 px-2">
              <button className="text-gray-300 hover:text-white">
                <MdSettings size={24} />
              </button>
              <button className="text-gray-300 hover:text-white">
                <LuMessageSquareText size={24} />
              </button>
            </div>
          </aside>

          {/* Right Content */}
          <div className="flex flex-col flex-1">
            {/* Header */}
            <header className="h-10 px-4 flex items-center justify-end gap-4 text-gray-400">
              <button className="hover:text-white">
                <RxMinus size={18} />
              </button>
              <button className="hover:text-white">
                <RxSquare size={18} />
              </button>
              <button className="hover:text-white">
                <RxCross2 size={18} />
              </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 relative flex flex-col overflow-hidden h-full">
              <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 sm:px-6 pt-4 pb-4 max-h-full">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-gray-700"></div>
                  <h1 className="text-lg font-semibold text-gray-300 whitespace-nowrap">
                    VOICEMOD VOICES
                  </h1>
                  <div className="flex-1 h-px bg-gray-700"></div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {effects.map((effect) => (
                    <div
                      key={effect.id}
                      className="flex flex-col items-center justify-center"
                    >
                      <button
                        className={`relative w-24 h-24 rounded-full focus:outline-none ${
                          selectedEffect === effect.id
                            ? "ring-4 ring-white/70"
                            : ""
                        }`}
                        onClick={() => setSelectedEffect(effect.id)}
                      >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#21A3EA] to-[#4CDFC4]"></div>
                        <div className="absolute inset-[3px] rounded-full bg-[#2c2c2c]"></div>
                        <div className="absolute inset-[6px] rounded-full bg-gray-200 flex items-center justify-center text-[#2c2c2c] text-3xl">
                          {effect.icon}
                        </div>
                      </button>
                      <span className="text-sm text-center mt-2 text-gray-300 font-medium">
                        {effect.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <footer className="h-auto bg-[#2c2c2c] border-t border-gray-700 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4 py-4 sm:px-6">
                <div className="flex items-center gap-2">
                  <div
                    className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${
                      listenFX ? "bg-blue-500" : "bg-gray-400"
                    }`}
                    onClick={() => setListenFX(!listenFX)}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                        listenFX ? "left-0.5" : "left-5"
                      }`}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-300">
                    LISTEN MY FX VOICE
                  </span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <div
                    className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${
                      voiceChanger ? "bg-blue-500" : "bg-gray-400"
                    }`}
                    onClick={() => setVoiceChanger(!voiceChanger)}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                        voiceChanger ? "left-0.5" : "left-5"
                      }`}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-300">
                    VOICE CHANGER
                  </span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <div
                    className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${
                      ambientSound ? "bg-blue-500" : "bg-gray-400"
                    }`}
                    onClick={() => setAmbientSound(!ambientSound)}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                        ambientSound ? "left-0.5" : "left-5"
                      }`}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-300">
                    AMBIENT SOUND
                  </span>
                </div>
              </footer>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

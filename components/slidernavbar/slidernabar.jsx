import Buttoncalendar from "./Buttoncalendar";
import Spotify from "./buttonSpotify";
import ButtonInbox from "./buttonInbox";
import DropdownTrigge from "../DropdownTrigge";
import "../../styles/fecha.css";
import Link from "next/link";
import { useRouter } from 'next/navigation'; // Import useRouter
const Slidernavbar = () => { // Receive logout prop
  const router = useRouter(); // Initialize useRouter


  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-10 bg-white backdrop-blur-lg rounded-md p-4 shadow-md grid w-24 justify-items-center text-center space-y-4 mt-8">
      <div className="relative overflow-hidden rounded-md hover:scale-105 transition-transform duration-300 ease-out">
        <Link href="/UserNotes" className="no-underline">
          <Buttoncalendar />
        </Link>
      </div>
      <div className="relative overflow-hidden rounded-md hover:scale-105 transition-transform duration-300 ease-out">
        <ButtonInbox />
      </div>
      <div className="relative overflow-hidden rounded-md hover:scale-105 transition-transform duration-300 ease-out">
        <Spotify />
      </div>
      <hr className="my-4" /> 
      <div className="relative overflow-hidden rounded-md hover:scale-105 transition-transform duration-300 ease-out">
        <DropdownTrigge  /> {/* Pass handleLogout to DropdownTrigge */}
      </div>
    </div>
  );
};

export default Slidernavbar;

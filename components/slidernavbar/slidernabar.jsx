import Buttoncalendar from "./Buttoncalendar";
import Spotify from "./buttonSpotify";
import ButtonInbox from "./buttonInbox";
import DropdownTrigge from "../DropdownTrigge";
import DrawerButton from "./buttonInvitacion/DrawerButton"
import "../../styles/fecha.css";




const Slidernavbar = () => (
  <div className="grid w-24 justify-items-center text-center space-y-4 mt-8">
    <Buttoncalendar />
    <ButtonInbox />
    <Spotify />
    <hr/>
    <DrawerButton/>
    <div >
      <DropdownTrigge /> 
    </div>
  </div>
);

export default Slidernavbar;



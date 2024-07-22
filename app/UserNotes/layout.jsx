"use client";
import { AuthProvider } from "../api/users/route";
import Slidernavbar from "@/components/slidernavbar/slidernabar";


export default function UserNotes({ children }) {
  return (
    <>
      <AuthProvider>
        <div className="flex"> {/* Add h-screen to the main container */}
          <div className="w-32"> {/* Container for the navbar */}
            <Slidernavbar />
          </div>
          <div className="flex-1 overflow-y-auto"> {/* Add flex-1 and p-4 to the content container */}
            {children}
          </div>
        </div>
      </AuthProvider>
    </>
  );
}

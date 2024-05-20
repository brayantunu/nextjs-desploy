"use client";
import { AuthProvider } from "../api/users/route";
import Slidernavbar from "@/components/slidernavbar/slidernabar";
import SpinnerCentered from "@/components/SpinnerCenter";


export default function UserNotes({ children }) {
  return (
    <>
      <AuthProvider>
        <container className="flex">
          <container className=" h-[100vh] ">
            <Slidernavbar />
          </container>
          <container>{children}</container>
        </container>
      </AuthProvider>
    </>
  );
}

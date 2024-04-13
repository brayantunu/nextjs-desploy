"use client"
import  {AuthProvider}  from "../api/users/route";
export default function UserNotes({ children }) {
  return (
    <>
      <AuthProvider>
         {children}
        </AuthProvider>
    </>
  );
}

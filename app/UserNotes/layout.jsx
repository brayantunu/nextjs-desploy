import  {AuthProvider}  from "../AuthContext";
export default function UserNotes({ children }) {
  return (
    <>
      <AuthProvider>
         {children}
        </AuthProvider>
    </>
  );
}

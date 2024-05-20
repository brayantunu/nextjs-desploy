import {Spinner} from "@nextui-org/react";

export default function SpinnerCentered() {
  return (
    <div
      style={{
        display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw', // Ancho completo de la pantalla
    height: '100vh', // Alto completo de la pantalla
    position: 'fixed', // Fijar en la pantalla
    top: 0,
    left: 0,
      }}
    >
      <Spinner />
    </div>
  );
}

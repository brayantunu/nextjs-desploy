import React, { useState, useEffect } from 'react';

function Buttoncalendar() {
  const [diaSemana, setDiaSemana] = useState('');
  const [numeroDia, setNumeroDia] = useState('');

  useEffect(() => {
    const obtenerFecha = () => {
      const fechaActual = new Date();
      
      // Obtener el día de la semana como texto corto (3 letras)
      const opcionesDia = { weekday: 'short' };
      const diaActual = fechaActual.toLocaleDateString('es-ES', opcionesDia);
      setDiaSemana(diaActual);

      // Obtener el número del día del mes
      const numeroDiaActual = fechaActual.getDate();
      setNumeroDia(numeroDiaActual);
    };

    obtenerFecha(); // Llamada inicial
    const intervalo = setInterval(obtenerFecha, 3600000); // Actualizar cada hora (3600000 ms)

    return () => clearInterval(intervalo);
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div>
      <button className='boton' onClick={() => alert('¡Haz clic en el botón!')}>
          <p className='semana'>{diaSemana}</p>
          <p className='dia'>{numeroDia}</p>
      
      </button>
    </div>
  );
}

export default Buttoncalendar;

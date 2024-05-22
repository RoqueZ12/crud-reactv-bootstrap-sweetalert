import React, { useState, useEffect } from "react";
import '../styles/lisdata.css'
import Axios from "axios"
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css'

const ListData = ({ editValues, setEditValues, edit}) =>{
  //estados para controlar los datos
  const[nombre, setNombre] = useState("")
  const[edad, setEdad] = useState()
  const[pais, setPais] = useState("")
  const[cargo, setCargo] = useState("")
  const[anios, setAnios] = useState()

  //evento para crear datos registrados con libreria axios 
  // y el cuerpo del  mensaje
  //CREATE
  const createDatos = () => {
    // Verificar si los campos están llenos
    if (nombre && edad && pais && cargo && anios) {
      Axios.post("http://localhost:3001/create", {
        nombre: nombre,
        edad: edad,
        pais: pais,
        cargo: cargo,
        anios: anios
      }).then(() => {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: `El empleado ${nombre} fue registrado!!`,
          timer: 2000
        });
        // Reiniciar los campos después de una operación exitosa
        limpiarCampos();
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos antes de registrar."
      });
    }
  };

  //mostrar valores para edit
  useEffect(() => {
    if (editValues) {
      setNombre(editValues.nombre);
      setEdad(editValues.edad);
      setPais(editValues.pais);
      setCargo(editValues.cargo);
      setAnios(editValues.anios);
    }
  }, [editValues]);
   // Función para limpiar los campos de entrada
   const limpiarCampos = () => {
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnios("");
  };

  return(
      <div className="client-data">
        <label>Nombre: 
          <input type="text" 
          value={nombre}
          onChange={(e) => setEditValues({...editValues, nombre: e.target.value})}
          />
        </label>
        <label>Edad: 
          <input type="number"
          value={edad}  
          onChange={(e) => setEditValues({...editValues, edad: e.target.value})}
          />
        </label>
        <label>Pais: 
          <input type="text" 
          value={pais}
          onChange={(e) => setEditValues({...editValues, pais: e.target.value})}
          />
        </label>
        <label>Cargo: 
          <input type="text"  
          value={cargo}
          onChange={(e) => setEditValues({...editValues, cargo: e.target.value})}
          />
        </label>
        <label>Años de Experiencia: 
          <input type="number"  
          value={anios} 
          onChange={(e) => setEditValues({...editValues, anios: e.target.value})}
          />
        </label>  
        <label> 
         
        </label>
          {
            edit? '':  <div className="Botones">
                <button 
              className="btn btn-success"
              onClick={createDatos}>Registrar</button>
                <button 
              className="btn btn-danger"
              onClick={limpiarCampos}>Limpiar</button>
              </div>    
          }  
      </div>
   
  )
}
export {ListData}
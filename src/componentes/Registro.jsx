import React, {useState} from "react";
import '../styles/registro.css'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Axios from "axios"
import Swal from 'sweetalert2'
const Registro = ({empleados, onEdit, edit}) =>{
  const eliminarDatos = (val) =>{
    //ventana de advertencia
    Swal.fire({
      title: "Estas seguro?",
      text: "No sera posible revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      //si se confirma eliminacion recien se realiza el DELETE
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.idempleado}`).then(()=>{
           //ventana de eliminacion exitosa
        Swal.fire({
          title: "Eliminado!",
          text: "El empleado" + val.nombre + "fue eliminado",
          icon: "success",
          timer:2000
        });
      }).catch(function(error){
        Swal.fire({
          title: "Oops...!",
          text: "No se logro eliminar el empleado",
          icon: "error",
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"
          ? "Intente mas tarde. Caida de Sistema"
          : JSON.parse(JSON.stringify(error)).message
        });
      })
      }
     
    });
   
  }
  return(
    <div className="client-registro">
      <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Pais</th>
          <th>Cargo</th>
          <th>Experiencia</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
      {
        empleados.map((val, key) =>{
          return <tr key={val.idempleado}>
            <td>{val.idempleado}</td>
            <td>{val.nombre}</td>
            <td>{val.edad}</td>
            <td>{val.pais}</td>
            <td>{val.cargo}</td>
            <td>{val.anios}</td>
            <td>
              <ButtonGroup className="btn-action" aria-label="Basic example">
                <Button className="primary" variant="primary" onClick={() => onEdit(val)}>Editar</Button>{' '}
                {
                  edit?'': 
                  <div className="secundary">
                    <Button  className="btn-izq" variant="danger"  onClick={() => eliminarDatos(val)}>Borrar</Button>
                    <Button  className="btn-der" variant="warning" >Ver</Button>
                  </div>
                }
         
            </ButtonGroup>
            </td>
          </tr>
        })
      }
      </tbody>
    </Table>
    </div>
  )
}
export {Registro}
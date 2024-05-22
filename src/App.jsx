import { useState, useEffect } from 'react'
import { ListData } from './componentes/ListData'
import { Registro } from './componentes/Registro'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './App.css'
import Swal from 'sweetalert2'
import Axios from "axios"
function App() {

  //lista de empleados
  const [empleadosList, setEmpleadosList] = useState([])
  const [editValues, setEditValues] = useState(null);
  const [editar, setEditar] = useState(false)
  const [cantidadEmpleados, setCantidadEmpleados]= useState(0)

 // Función para limpiar los campos después de actualizar
 const limpiarCampos = () => {
  setEditValues(null); // Limpiar editValues
};

   //evento para obtener empleados
   const listEmpleados = () =>{
    Axios.get("http://localhost:3001/empleado").then((response)=>{
      setEmpleadosList(response.data)
      setCantidadEmpleados(response.data.length)
      console.log(setCantidadEmpleados)
    })
  }
  const handleEdit = (empleado) => {
    setEditValues(empleado);// Actualiza el estado editValues con el objeto empleado
    setEditar(true)
  };
  const handleCancelar = () =>{
    setEditar(false);
    limpiarCampos();
  }
    // Función para actualizar datos
    const updateDatos = () => {
      if (editValues.idempleado) {
        Axios.put("http://localhost:3001/update", {
          idempleado: editValues.idempleado,
          nombre: editValues.nombre,
          edad: editValues.edad,
          pais: editValues.pais,
          cargo: editValues.cargo,
          anios: editValues.anios,
        }).then(() => {
          Swal.fire({
            icon: "success",
            title: "Datos actualizados",
            text: `Los datos de ${editValues.nombre} fueron actualizados!!`,
            timer: 2000
          });
          listEmpleados()
        }).catch(error => {
          console.error("Error al actualizar empleado:", error);
          alert("Hubo un error al actualizar el empleado");
        });
      } else {
        console.error("El ID del empleado es indefinido");
      }
    };
    // useEffect para cargar los datos al montar el componente
    useEffect(() => {
      listEmpleados();
    }, []);
  return (
    <div className='app'>
      <h1>Desarrollo de un <strong>CRUD</strong> con Node.js, Express,
      MySql, API Rest y React Vite</h1>
      <ListData  editValues={editValues} setEditValues={setEditValues}
      edit={editar}/>
      <div className='lista'>
        {
          editar? <div>
            <Button onClick={updateDatos} variant='success'>ACTUALIZAR</Button> 
            <Button onClick={handleCancelar} variant='warning'>CANCELAR</Button> 
          </div>:
          <div>
            <Button onClick={listEmpleados} variant="info">LISTA DE EMPLEADOS : <span>{cantidadEmpleados}</span></Button>
            </div>
          
        }       
      </div>
      <Registro empleados={empleadosList} onEdit={handleEdit} edit={editar}/>
    </div>
  )
}

export default App

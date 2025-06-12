import { useState, useEffect } from 'react'
import { deleteClient, getClients } from '../api/Client';
import type { Client } from '../interface';
import { useNavigate} from "react-router-dom";


const ListPage = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientsData = await getClients();
        setClients(clientsData); 
      } catch (err) {
        setError('Error al cargar los clientes');
        console.error('Error fetching clients:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

    const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar este cliente?')) return;
    
    try {
      await deleteClient(id);
      setClients(clients.filter(client => client.id !== id));
      alert('Cliente eliminado correctamente');
    } catch (err) {
      alert('Error al eliminar cliente');
      console.error('Error deleting client:', err);
    }
  };

   const handleUpdate = (id: number) => {
    navigate(`/update/${id}`); // Navega a la página de actualización
  };
    

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (clients.length === 0) return <div>No se encontraron clientes</div>;

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-intro">
      
          <h2>Clientes</h2>
            
            <button onClick={() => navigate('/create')}>
                Crear
            </button>

          
          <ul>
            
            {clients.map(client => (
              <li key={client.id}>
                {client.id}{client.name} ({client.email})
                <button
                  onClick={() => handleUpdate(client.id)}
                >Actualizar</button>
                <button 
                  onClick={() => handleDelete(client.id)}
                >
                    Borrar</button>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  )
}

export default ListPage;
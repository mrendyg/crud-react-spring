import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteClient, getClients } from '../api/Client';
import type { Client } from '../interface';

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
    navigate(`/update/${id}`);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (clients.length === 0) return <div>No se encontraron clientes</div>;

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-intro">
          <h2>Clientes</h2>
          
          <button 
            onClick={() => navigate('/create')}
            style={buttonStyle('#4CAF50')}
          >
            Crear
          </button>

          <ul style={listStyle}>
            {clients.map(client => (
              <li key={client.id} style={listItemStyle}>
                {client.id} - {client.name} ({client.email})
                <div style={buttonContainerStyle}>
                  <button
                    onClick={() => handleUpdate(client.id)}
                    style={buttonStyle('#3380ff')}
                  >
                    Actualizar
                  </button>
                  <button 
                    onClick={() => handleDelete(client.id)}
                    style={buttonStyle('#f44336')}
                  >
                    Borrar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
};

// Estilos reutilizables
const buttonStyle = (color: string) => ({
  padding: '8px 15px',
  backgroundColor: color,
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  margin: '0 5px',
  cursor: 'pointer'
});

const listStyle = {
  listStyle: 'none',
  padding: 0,
  marginTop: '20px'
};

const listItemStyle = {
  padding: '10px 15px',
  margin: '5px 0',
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const buttonContainerStyle = {
  display: 'flex',
  gap: '10px'
};

export default ListPage;
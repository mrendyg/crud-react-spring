import { useState, useEffect } from 'react'
import './App.css'
import { getClients } from './api/Client'; // Asegúrate de que la ruta de importación es correcta
import type { Client } from './interface';


function App() {
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

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (clients.length === 0) return <div>No se encontraron clientes</div>;

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-intro">
          <h2>Clientes</h2>
          <ul>
            {clients.map(client => (
              <li key={client.id}>
                {client.name} ({client.email})
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  )
}

export default App
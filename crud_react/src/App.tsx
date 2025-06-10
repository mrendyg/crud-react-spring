import { useState, useEffect } from 'react'
import './App.css'
import { axi } from './api/useAxios'

interface Client {
  id: number;
  name: string;
  email: string;
}

function App() {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axi.get('/client/1'); // Usando ID 1 como ejemplo
        setClient(response.data);
      } catch (err) {
        setError('Error al cargar el cliente');
        console.error('Error fetching client:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!client) return <div>No se encontró el cliente</div>;

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-intro">
          <h2>Client</h2>
          <div>
            {client.name} ({client.email})
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
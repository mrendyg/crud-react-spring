import { useState, useEffect } from 'react'
import './App.css'

interface Client {
  id: number;
  name: string;
  email: string;
}

function App() {
 
  // Estado tipado como un array de Client
  const [clients, setClients] = useState<Client[]>([]);

  // Equivalente a componentDidMount
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/clients');
        const data: Client[] = await response.json(); // Tipamos la respuesta
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

     fetchClients();
  }, []); // El array vacío asegura que se ejecute solo al montar

  return (
      <div className="App">
      <header className="App-header">
        <div className="App-intro">
          <h2>Clients</h2>
          {clients.map(client => (
            <div key={client.id}>
              {client.name} ({client.email})
            </div>
          ))}
        </div>
      </header>
    </div>
  )
}

export default App

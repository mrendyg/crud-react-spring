import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "../api/Client";
import type { Client } from "../interface"; // Asegúrate de que la ruta sea correcta

const CreatePage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Omit<Client, 'id'>>({
        name: "",
        email: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        if (!formData.name.trim() || !formData.email.trim()) {
            alert("Todos los campos son obligatorios");
            return;
        }

        try {
            await createClient(formData);
            alert("Cliente creado exitosamente!");
            navigate('/');
        } catch (error) {
            alert("Error al crear cliente");
            console.error(error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Nuevo Cliente</h2>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                    Nombre:
                </label>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                    Correo:
                </label>
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                    onClick={() => navigate('/')}
                    style={{ padding: '8px 15px', backgroundColor: '#f44336', color: 'white' }}
                >
                    Cancelar
                </button>
                <button 
                    onClick={handleSubmit}
                    style={{ padding: '8px 15px', backgroundColor: '#4CAF50', color: 'white' }}
                >
                    Crear Cliente
                </button>
            </div>
        </div>
    );
};

export default CreatePage;
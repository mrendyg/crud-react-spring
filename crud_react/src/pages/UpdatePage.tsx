import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateClient, getidClient } from "../api/Client"; // Cambiado a getClient
import type { Client } from "../interface";

const UpdatePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Omit<Client, 'id'>>({
        name: "",
        email: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                if (!id) return;
                const client = await getidClient(parseInt(id)); // Cambiado a getClient
                setFormData({
                    name: client.name,
                    email: client.email
                });
            } catch (err) {
                setError("Error al cargar el cliente");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchClient();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.name.trim() || !formData.email.trim()) {
            setError("Nombre y email son obligatorios");
            return;
        }

        if (!id) return;

        try {
            await updateClient(parseInt(id), formData);
            navigate("/", { state: { message: "Cliente actualizado correctamente" } });
        } catch (err) {
            setError("Error al actualizar cliente");
            console.error(err);
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
            <h2>Editar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>
                        Nombre:
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
                        Email:
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        style={{
                            padding: "8px 15px",
                            backgroundColor: "#f44336",
                            color: "white"
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        style={{
                            padding: "8px 15px",
                            backgroundColor: "#4CAF50",
                            color: "white"
                        }}
                    >
                        Actualizar Cliente
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdatePage;
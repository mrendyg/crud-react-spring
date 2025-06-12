import { axi } from "./useAxios";

interface Client {
  id: number;
  name: string;
  email: string;
}

export const getClients = async (): Promise<Client[]> => {
  const response = await axi.get('/clients/list');
  return response.data;
}
export const getidClient = async (id: number): Promise<Client> => {
  const response = await axi.get(`/clients/${id}`);
  return response.data;
};

export const createClient = async (clientData: any) => {
    const response = await axi.post('/clients/create', clientData);
    return response.data;
}

export const deleteClient = async (id: number) : Promise<void> => {
  await axi.delete(`/clients/delete/${id}`)
}

export const updateClient = async (id: number, clientData: Omit<Client, 'id'>):
 Promise<Client> => {
  try {
    const response = await axi.put<Client>(`/clients/update/${id}`, clientData);
    return response.data;
  } catch (error) {
    console.error("Error updating client:", error);
    throw new Error("No se pudo actualizar el cliente");
  }
};
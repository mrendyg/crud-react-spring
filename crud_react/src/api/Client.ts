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
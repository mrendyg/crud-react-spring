import { axi } from "./useAxios";

//Lista de productos
export const getClient = async (id: number) => {
    const res = await axi.get(`/clients/${id}`)
}
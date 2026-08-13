import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

export async function buscarProdutos(categorias: string[]) {
  const respostas = await Promise.all(
    categorias.map((categoria) =>
      api.get(`/products/category/${categoria}`)
    )
  );

  return respostas.flatMap((resposta) => resposta.data.products);
}

export async function buscarProdutoPorId(id: string) {
  const resposta = await api.get(`/products/${id}`);
  return resposta.data;
}
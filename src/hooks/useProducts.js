

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// URL API 
const API_URL = 'https://69191f179ccba073ee923377.mockapi.io/products';

// --- Funciones para interactuar con la API ---

// Función para OBTENER todos los productos
const fetchProducts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al obtener los productos');
  }
  return response.json();
};

// Función para CREAR un nuevo producto
const addProduct = async (newProduct) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
  });
  if (!response.ok) {
    throw new Error('Error al añadir el producto');
  }
  return response.json();
};




export const useProducts = () => {
  const queryClient = useQueryClient();

  // useQuery para leer los datos
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products'], 
    queryFn: fetchProducts,   
  });

  // useMutation para crear datos
  const { mutate: addProductMutation, isPending: isAdding } = useMutation({
    mutationFn: addProduct,
   
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

 
  return {
    products,
    isLoading,
    isError,
    error,
    addProductMutation,
    isAdding
  };
};
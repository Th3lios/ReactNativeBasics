import { useState, useEffect } from 'react';

export interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Datos simulados para las APIs
const mockApiData: Record<string, any> = {
  '/api/users': [
    { id: 1, name: 'Juan Pérez', email: 'juan@email.com' },
    { id: 2, name: 'María García', email: 'maria@email.com' },
    { id: 3, name: 'Carlos López', email: 'carlos@email.com' },
  ],
  '/api/posts': [
    { id: 1, title: 'Primer Post', content: 'Contenido del primer post' },
    { id: 2, title: 'Segundo Post', content: 'Contenido del segundo post' },
  ],
  '/api/products': [
    { id: 1, name: 'Producto A', price: 99.99 },
    { id: 2, name: 'Producto B', price: 149.99 },
  ]
};

/**
 * Custom hook para manejar llamadas a API con estados de carga y error
 * @param url - URL de la API a consultar
 * @returns Objeto con data, loading, error y función refetch
 */
export const useFetch = <T = any>(url: string): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simular llamada a API con delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Obtener datos simulados basados en la URL
      const result = mockApiData[url] || { message: 'Datos no encontrados' };
      setData(result as T);
    } catch (err) {
      setError('Error al cargar los datos');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const refetch = () => {
    fetchData();
  };

  return { 
    data, 
    loading, 
    error, 
    refetch 
  };
};

import axios from 'axios'

// Define a generic type for the resource,
// T will represent the structure of a Todo, Service, Booking, etc.
// T must have an 'id' property of type number.
export interface Identifiable {
  id: number;
}

// Function that creates a service for a specific resource path
const createGenericService = <T extends Identifiable>(resourcePath: string) => {
  // The base URL for the API
  const API_BASE_URL = 'http://localhost:5000';
  // Construct the full URL for the resource (e.g., 'http://localhost:5000/api/tasks')
  const baseUrl = `${API_BASE_URL}/${resourcePath}`;

  /**
   * Fetches all resources of type T.
   */
  const getAll = (): Promise<T[]> => {
    const request = axios.get<T[]>(baseUrl);
    console.log(baseUrl);
    return request.then(response => response.data);
  };

  /**
   * Creates a new resource.
   * NewObject is T without the 'id' since the backend assigns it.
   */
  const create = (newObject: Omit<T, 'id'>): Promise<T> => {
    const request = axios.post<T>(baseUrl, newObject);
    return request.then(response => response.data);
  };

  /**
   * Updates an existing resource by id.
   */
  const update = (id: number, newObject: T): Promise<T> => {
    const request = axios.put<T>(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
  };
  
  /**
   * Removes a resource by id.
   */
  const remove = (id: number): Promise<void> => {
    // Note: DELETE requests often return a 204 No Content, so we expect void/empty data.
    return axios.delete<void>(`${baseUrl}/${id}`).then(response => response.data);
  };


  // Return the service object with all CRUD methods
  return {
    getAll,
    create,
    update,
    remove,
  };
};

export default createGenericService;
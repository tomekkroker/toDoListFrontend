/**
 * Klasa reprezentująca odpowiedź zawierającą informacje o zadaniu
 */
export interface TaskResponse {
  id: number;
  name: string;
  priority: string;
  deadline: string | null;
  description: string | null;
}

/**
 * Klasa reprezentująca żądanie utworzenia/edycji zadania
 */
export interface TaskRequest {
  name: string;
  priority: string;
  deadline: string | null;
  description: string | null;
  listId: number;
}

/**
 * Klasa reprezentująca odpowiedź zawierającą informacje o liście zadań
 */
export interface ListResponse {
  id: number;
  name: string;
  priority: string;
}

/**
 * Klasa reprezentująca żądanie utworzenia/edycji listy
 */
export interface ListRequest {
  name: string;
  priority: string;
}

export interface BasicResponse {
  success: boolean | null;
  message: string | null;
  dto: Object;
}
export interface CardMenu {
  label: string;
}

interface _Error {
  message: string;
  status: number;
}
export interface Response<T> {
  error: _Error;
  response: Record<string, unknown>;
  success: boolean;
}

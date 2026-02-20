export interface ApiErrorResponse {
  success: false;
  status: number;
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

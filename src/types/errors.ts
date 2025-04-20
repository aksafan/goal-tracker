export interface Error {
  code: number;
  message: string;
}

export interface ValidationErrorDetail {
  field: string;
  message: string;
}

export interface ValidationError extends Error {
  errors: ValidationErrorDetail[];
}

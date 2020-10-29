interface ApiValidationError {
  code: 'validation';
  extra: {
    validation: {
      field: string;
      error: string[];
    };
  };
}

export type ApiError = ApiValidationError;

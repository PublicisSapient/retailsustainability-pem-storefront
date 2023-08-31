import { AxiosError } from 'axios';

interface ErrorMapInterface {
  SERVICE_NOT_AVAILABLE: string | number;
  BAD_REQUEST: string | number;
  UNAUTHORIZED: string | number;
  UNAUTHENTICATED: string | number;
  NOT_FOUND: string | number;
  CONFLICT: string | number;
}

const ErrorMap: ErrorMapInterface = {
  SERVICE_NOT_AVAILABLE: 'SERVICE_NOT_AVAILABLE',
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
};

export const getErrorMessage = (error: AxiosError) => {
  const errorData = (error.response as any)?.data?.errorMap;
  const statusCode = error.response?.status;
  if (errorData) {
    if (statusCode === 400) {
      return errorData[ErrorMap.BAD_REQUEST];
    }

    if (statusCode === 401) {
      return errorData[ErrorMap.UNAUTHORIZED];
    }

    if (statusCode === 403) {
      return errorData[ErrorMap.UNAUTHENTICATED];
    }

    if (statusCode === 404) {
      return errorData[ErrorMap.NOT_FOUND];
    }

    if (statusCode === 409) {
      return errorData[ErrorMap.CONFLICT];
    }

    if (statusCode === 503) {
      return errorData[ErrorMap.SERVICE_NOT_AVAILABLE];
    }

    return 'Something went wrong, Please try again later';
  }
};

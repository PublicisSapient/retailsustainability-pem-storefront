export interface IPosition {
    latitude: number | null;
    longitude: number | null;
    error: string | null;
}

export interface PostListProps {
    position:IPosition
    fetchGeoLocation:Function
}


export interface FormValues {
    [key: string]: {
      value: string | number;
      error: boolean;
      errorMessage: string;
    };
  }
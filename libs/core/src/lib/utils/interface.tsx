import { AlertColor } from '@mui/material';
import { FileError } from 'react-dropzone';

export interface UploadableFile {
  // id was added after the video being released to fix a bug
  // Video with the bug -> https://youtube-2021-feb-multiple-file-upload-formik-bmvantunes.vercel.app/bug-report-SMC-Alpha-thank-you.mov
  // Thank you for the bug report SMC Alpha - https://www.youtube.com/channel/UC9C4AlREWdLoKbiLNiZ7XEA
  id: number;
  file: File;
  errors: FileError[];
  isServerError: boolean;
  url?: string;
  progress?: number;
  isLoading: boolean;
}

export interface Config {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options';
  maxBodyLength: number;
  url: string;
  headers: {
    'Content-Type'?: string;
    'X-Frame-Options': string;
  };
  data?: any;
}

export interface GeoLocation {
  latitude: number | null;
  longitude: number | null;
}

export interface GeoLocationForm {
  lat: number | null;
  lng: number | null;
  name: string;
}

interface LatLngProps {
  lat: number;
  lng: number;
}
export interface GeoPlaceLatLng {
  address: string;
  position: LatLngProps;
}

export interface PostItem {
  id?: string;
  name: string;
  description: string;
  category: string;
  offerType: string;
  files?: UploadableFile[];
  images: string[];
  geoLocation: GeoLocation;
  location: string;
  user: string;
  price: string;
  isLoading?: boolean;
  createdTime?: number;
}

export interface PostItemForm {
  id?: string;
  name: string;
  description: string;
  category: string;
  offerType: string;
  files: any[];
  images: string[];
  geoLocation: GeoPlaceLatLng;
  user: string;
  price: string;
  isLoading?: boolean;
  createdTime?: number;
}

export interface PostItemResponse {}

export interface DeleteImageResponse {
  name: string;
}

export interface PostsListing {
  productListing: PostItem[];
  isLoading: boolean;
}

export interface PostsListingResponse {}

export interface SnackBarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

export interface GeoPosition {
  latitude: number | null;
  longitude: number | null;
  address: string;
  error?: string | null;
}

export interface MapCordinates {
  position: {
    lat: number;
    lng: number;
  };
  location?: string;
}

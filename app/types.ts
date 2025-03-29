export interface IProject {
  id: string;
  title: string;
  location: string;
  numberOfOrders: number;
  lastOrderDate: string;
  imageCount: number;
  videoCount: number;
  panoCount: number;
  coordinates: number[];
  media?: IMedia[];
}

export interface IMedia {
  metaData: {
    contentType?: string;
    name: string;
    size: number;
  };
  donwloadURL: string;
  isUploading?: boolean;
}

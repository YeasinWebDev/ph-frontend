export interface ITourPackage {
  _id: string;
  name: string;       
  slug: string;
  description: string;
  images: string[];
  startDate?: string;
  endDate?: string;
  arrivalLocation?: string;
  departureLocation?: string;
  location?: string;
  costFrom?: number;
  maxGuest?: number;
  minAge?: number;
  division?: string;
  tourType?: string;
  amenities?: string[];
  include?: string[];
  exclude?: string[];
  tourPlan?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ITourResponse {
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
  };
  tours: ITourPackage[];
}

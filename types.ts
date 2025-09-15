export interface Service {
  id: number;
  name: string;
  shortDescription: string;
  features: string[];
  price: string;
  imageUrls: string[];
  scent: {
    icon: string; 
    text: string;
  };
}
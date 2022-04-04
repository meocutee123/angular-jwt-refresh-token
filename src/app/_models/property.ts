import { Landlord } from "./landlord";
import { PropertyAmenity } from "./property-amenity";
import { PropertyImage } from "./property-image";

export class Property {
  id!: number;
  building!: Building;
  propertyType!: PropertyType;
  roomCount: number | undefined;
  bathCount: number | undefined;
  otherFeatures: OtherFeatures[] = [];
  images: PropertyImage[] = [];
  highlights: string = '';
  amenities: PropertyAmenity[] = [];
  additionalInformation: AdditionalInformation[] = [];
  landlord!: Landlord;
}

enum PropertyType {
  Good,
  Fair,
  Poor
}

class Building {
  street: string | undefined;
  unit: string | undefined;
  city: string | undefined;
  state: string | undefined;
  zipCode: string | undefined;
  buildingAge: number | undefined;
}

class OtherFeatures {
  id!: number;
  name: string | undefined;
  description: string | undefined;
}

class AdditionalInformation {
  id!: number;
  label: string | undefined;
  fieldAlias: string | undefined;
  value: string | undefined;
}
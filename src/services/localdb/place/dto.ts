import { DataClass } from "ts-data-object";

type OrganizationType = "police" | "fire" | "hospital" | "shelter";

@DataClass()
export class CreatePlaceDTO {
  placeLocation!: string;
  organizationType!: OrganizationType;
  updatedTime!: Date;
}

@DataClass()
export class UpdatePlaceDTO {
  placeId!: string;
  placeLocation!: string;
  organizationType!: OrganizationType;
  updatedTime!: Date;
}

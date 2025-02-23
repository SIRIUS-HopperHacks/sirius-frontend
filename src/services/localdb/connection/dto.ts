import { DataClass } from "ts-data-object";

@DataClass()
export class CreateConnectionDTO {
  deviceId!: string;
  detectedLocation!: string;
  detectedTime!: Date;
}

@DataClass()
export class UpdateConnectionDTO {
  connectionId!: string;
  deviceId!: string;
  detectedLocation!: string;
  detectedTime!: Date;
}

import { DataClass } from "ts-data-object";

@DataClass()
export class CreateConnectionDTO {
  deviceId!: string;
  detectedLocation!: string;
  alertType!: string;
  alertedTime!: Date;
  detectedTime!: Date;
}

@DataClass()
export class UpdateConnectionDTO {
  connectionId!: string;
  deviceId!: string;
  detectedLocation!: string;
  alertType!: string;
  alertedTime!: Date;
  detectedTime!: Date;
}

@DataClass()
export class ConnectionDTO {
  connectionId!: string;
  deviceId!: string;
  detectedLocation!: string;
  alertType!: string;
  alertedTime!: Date;
  detectedTime!: Date;
}

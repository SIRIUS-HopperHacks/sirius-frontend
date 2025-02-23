import { DataClass } from "ts-data-object";

@DataClass()
export class CreateUserDTO {
  deviceId!: string;
  deviceLocation!: string;
  updatedAt!: Date;
}

@DataClass()
export class UpdateUserDTO {
  deviceId!: string;
  deviceLocation!: string;
  updatedAt!: Date;
}

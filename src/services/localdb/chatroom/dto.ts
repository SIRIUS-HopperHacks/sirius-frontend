import { DataClass } from "ts-data-object";

@DataClass()
export class CreateChatroomDTO {
  deviceId!: string;
  detectedLocation!: string;
  alertType!: string;
  alertedTime!: Date;
  detectedTime!: Date;
}

@DataClass()
export class UpdateChatroomDTO {
  connectionId!: string;
  deviceId!: string;
  detectedLocation!: string;
  alertType!: string;
  alertedTime!: Date;
  detectedTime!: Date;
}

@DataClass()
export class ChatroomDTO {
  connectionId!: string;
  deviceId!: string;
  detectedLocation!: string;
  alertType!: string;
  alertedTime!: Date;
  detectedTime!: Date;
}

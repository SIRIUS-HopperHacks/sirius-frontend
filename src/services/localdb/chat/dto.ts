import { DataClass } from "ts-data-object";

@DataClass()
export class CreateChatroomDTO {
  connectionId!: string;
  deviceId1!: string;
  deviceId2!: string;
}

@DataClass()
export class CreateChatDTO {
  connectionId!: string;
  sender!: string;
  receiver!: string;
  content!: string;
  sentAt!: Date;
}

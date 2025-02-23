import { ChatService } from "@services/localdb/chat/service";
import {
  ConnectionDTO,
  CreateConnectionDTO,
} from "@services/localdb/connection/dto";
import { ChatroomService } from "@services/localdb/chatroom/service";
import { ConnectionService } from "@services/localdb/connection/service";
import { PlaceService } from "@services/localdb/place/service";
import { UserService } from "@services/localdb/user/service";
import axios, { Axios } from "axios";

type LocalServices = {
  chat: ChatService;
  connection: ConnectionService;
  place: PlaceService;
  user: UserService;
};

export class APIService {
  baseURL: string;
  axios: Axios;
  services: LocalServices;
  constructor() {
    this.baseURL = "http://127.0.0.1:5000";
    this.axios = axios.create({
      baseURL: this.baseURL,
    });
    this.services = {
      chat: new ChatService(),
      connection: new ConnectionService(),
      place: new PlaceService(),
      user: new UserService(),
    };
  }

  async getPlaces() {
    type OrganizationType = "police" | "fire" | "hospital" | "shelter";
    interface Shelter {
      placeId: string;
      name: string;
      distance: string;
      phone: string;
      organizationType: OrganizationType;
      location: string;
      placeLocation: string;
      updatedTime: Date;
    }
    return this.services.place.getAllPlaces() as any as Shelter[];
  }

  async fetchNearbyAlerts() {
    // mock p2p connection
    const connections: CreateConnectionDTO[] = [
      /*fetched data by p2p*/
    ];
    const alreadyFetchedConnections =
      (await this.services.connection.getAllConnections()) as ConnectionDTO[];
    const newConnections = connections.filter((conn) => {
      return !alreadyFetchedConnections.some(
        (c: CreateConnectionDTO) => c.deviceId === conn.deviceId
      );
    });

    for (const conn of newConnections) {
      await this.services.connection.createConnection(conn);
    }
  }

  async sendToNearbyUsers() {
    const connections =
      (await this.services.connection.getAllConnections()) as ConnectionDTO[];
    const nearbyConnections = connections.filter(
      (connection: ConnectionDTO) => {
        // mock distance calculation
        return true;
      }
    );
    for (const conn of nearbyConnections) {
      // mock sending data by p2p
      console.log("sending data to", conn.deviceId);
    }
  }

  async alertToServer() {
    const connections = await this.services.connection.getAllConnections();
    this.axios.post("/sqs/enqueue", { alerts: connections.slice(0, 3) });
  }

  async getChatrooms() {
    return this.services.chat.getAllChatrooms();
  }
}

import { ConnectionDAO } from "@localdb/connection/dao";
import { CreateConnectionDTO, UpdateConnectionDTO } from "@localdb/connection/dto";

export class ConnectionService {
  dao: ConnectionDAO;

  constructor() {
    this.dao = new ConnectionDAO();
  }

    // Haversine 공식을 이용한 두 좌표 간 거리 계산 (단위: km)
    private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
      const R = 6371; // 지구 반지름 (km)
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }
  
    private deg2rad(deg: number): number {
      return deg * (Math.PI / 180);
    }
  
    private extractCoordinates(coordStr: string): [number, number] {
      const trimmed = coordStr.replace(/[()]/g, "");
      const parts = trimmed.split(",");
      if (parts.length !== 2) {
        throw new Error("Invalid coordinate format");
      }
      return [parseFloat(parts[0].trim()), parseFloat(parts[1].trim())];
    }

  async createConnection(inputData: CreateConnectionDTO) {
    const allowedReference = { lat: 37.5665, lon: 126.9780 };
    const [lat, lon] = this.extractCoordinates(inputData.detectedLocation);
    const distance = this.calculateDistance(lat, lon, allowedReference.lat, allowedReference.lon);
    if (distance > 0.5) {
      throw new Error(`Connection distance is too far: ${distance.toFixed(2)} km (allowed: 0.50 km).`);
    }
    return this.dao.create(inputData);
  }

  async updateConnection(inputData: UpdateConnectionDTO) {
    return this.dao.update(inputData);
  }

  async deleteConnection(connectionId: string) {
    return this.dao.delete(connectionId);
  }

  async findConnection(connectionId: string) {
    return this.dao.find(connectionId);
  }

  async getAllConnections() {
    return this.dao.getAll();
  }
}

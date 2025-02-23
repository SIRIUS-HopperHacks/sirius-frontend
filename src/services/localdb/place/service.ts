import { PlaceDAO } from "@localdb/place/dao";
import { CreatePlaceDTO, UpdatePlaceDTO } from "@localdb/place/dto";

export class PlaceService {
  dao: PlaceDAO;

  constructor() {
    this.dao = new PlaceDAO();
  }

  async createPlace(inputData: CreatePlaceDTO) {
    return this.dao.create(inputData);
  }

  async updatePlace(inputData: UpdatePlaceDTO) {
    return this.dao.update(inputData);
  }

  async deletePlace(placeId: string) {
    return this.dao.delete(placeId);
  }

  async findPlace(placeId: string) {
    return this.dao.find(placeId);
  }



  
  async getAllPlaces() {
    return this.dao.getAll();
  }

  async findPlacesByOrganization(organizationType: string) {
    const allPlaces = await this.getAllPlaces();
    return allPlaces.filter((place) => place.organizationType === organizationType);
  }


  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
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

  async findNearestPlace(coordStr: string): Promise<{ place: any; distance: number }> {
    const [lat, lon] = this.extractCoordinates(coordStr);
    const allPlaces = await this.getAllPlaces();
    if (allPlaces.length === 0) {
      throw new Error("No places available");
    }

    let nearestPlace = allPlaces[0];
    let minDistance = Infinity;
    for (const place of allPlaces) {
      try {
        const [placeLat, placeLon] = this.extractCoordinates(place.placeLocation);
        const distance = this.calculateDistance(lat, lon, placeLat, placeLon);
        if (distance < minDistance) {
          minDistance = distance;
          nearestPlace = place;
        }
      } catch (error) {
        console.error("Invalid placeLocation format for place:", place);
      }
    }
    return { place: nearestPlace, distance: minDistance };
  }
}

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
}

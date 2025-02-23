import { CreatePlaceDTO, UpdatePlaceDTO } from "@localdb/place/dto";
import IndexedDB from "@lib/infra/idb";
import { v4 as uuid4 } from "uuid";

export class PlaceDAO {
  db: IndexedDB;

  constructor() {
    this.db = new IndexedDB();
  }

  async create(inputData: CreatePlaceDTO) {
    const placeId = uuid4();
    const place = { ...inputData, placeId };
    await this.db.insertOrUpdate("places", place);
  }

  async update(inputData: UpdatePlaceDTO) {
    const place = await this.db.fetchOne("places", inputData.placeId);
    if (place) {
      await this.db.insertOrUpdate("places", { ...place, ...inputData });
    }
  }

  async delete(placeId: string) {
    await this.db.delete("places", placeId);
  }

  async find(placeId: string) {
    return this.db.fetchOne("places", placeId);
  }
}

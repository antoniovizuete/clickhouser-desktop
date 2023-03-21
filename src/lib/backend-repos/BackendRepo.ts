import { invoke } from "@tauri-apps/api/tauri";

type Entity<T, ID> = Omit<T, "id"> & { id?: ID };

export abstract class BackendRepo<T, ID> {
  private readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  public async get(): Promise<T[]> {
    return invoke(`get_all_${this.name}`);
  }

  public async getById(id: ID): Promise<T> {
    return invoke(`get_${this.name}_by_id`, { id });
  }

  public async update(id: ID, entity: Entity<T, ID>): Promise<void> {
    return invoke(`update_${this.name}`, {
      id,
      entity,
    });
  }

  public async insert(entity: Entity<T, ID>): Promise<void> {
    return invoke(`insert_${this.name}`, { entity });
  }

  public async delete(id: ID): Promise<void> {
    return invoke(`delete_${this.name}`, { id });
  }
}

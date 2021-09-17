import { Identifyable } from "@app/entity/identify";

export type UserEntityDTO = {
  id: string;
  name: string;
  interests: string[];
};

export class UserEntity implements Identifyable {
  constructor(
    public id: string,
    public name: string,
    public interests: string[]
  ) {}

  static fromDTO(dto: UserEntityDTO) {
    return new UserEntity(dto.id, dto.name, dto.interests);
  }

  getPrimaryKey(): string {
    return this.id;
  }

  toDTO(): UserEntityDTO {
    return {
      id: this.id,
      name: this.name,
      interests: this.interests,
    };
  }
}

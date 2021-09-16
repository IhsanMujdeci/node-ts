export type UserEntityDTO = {
  id: string;
  name: string;
  interests: string[];
};

class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public interests: string[]
  ) {}

  static fromDTO(dto: UserEntityDTO) {
    return new UserEntity(dto.id, dto.name, dto.interests);
  }

  toDTO(): UserEntityDTO {
    return {
      id: this.id,
      name: this.name,
      interests: this.interests,
    };
  }
}

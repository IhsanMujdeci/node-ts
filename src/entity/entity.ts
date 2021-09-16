export type EntityDTO = {
    id: string,
    name: string,
    interests: string[]
}

class Entity {

    constructor(
        public id: string,
        public name: string,
        public interests: string[]
    ) {
    }

    static fromDTO(dto: EntityDTO){
        return new Entity(dto.id, dto.name, dto.interests)
    }
}

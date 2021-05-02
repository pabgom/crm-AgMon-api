import { UserEntity } from '../../../entity/user.entity';

export default class UserCreateResponseDto {
    id: number;
    name: string;
    email: string;

    constructor(user: UserEntity) {
        if (user) {
            this.id = user.id;
            this.name = user.name;
            this.email = user.email;
        }
    }
}

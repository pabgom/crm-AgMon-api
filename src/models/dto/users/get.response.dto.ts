import { UserEntity } from '../../../entity/user.entity';
export default class UserResponseDto {
    id: number;
    name: string;
    email: string;
    Roles: number[];

    constructor(user: UserEntity) {
        if (user) {
            this.id = user.id;
            this.name = user.name;
            this.email = user.email;
            this.Roles = user.roles.map(r => r.id);
        }
    }
}

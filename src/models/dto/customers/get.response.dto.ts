import config from '../../../config';
import { CustomerEntity } from '../../../entity/customer.entity';
import { UserResponseDto } from '../users';

export default class CustomerResponseDto {
    id: number;
    name: string;
    surname: string;
    photoUrl: String;
    createdBy: UserResponseDto;
    modifiedBy: UserResponseDto;

    constructor(customer: CustomerEntity) {
        this.id = customer.id;
        this.name = customer.name;
        this.surname = customer.surname;
        this.photoUrl = customer.photoUrl ? `${config.HOST}/public/customer/${customer.photoUrl}` : null;
        this.createdBy = new UserResponseDto(customer.createdBy);
        this.modifiedBy = new UserResponseDto(customer.modifiedBy);
    }
}

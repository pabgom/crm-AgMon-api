import config from '../../../config';
import { CustomerEntity } from '../../../entity/customer.entity';

export default class CustomerCreateResponseDto {
    id: number;
    name: string;
    surname: string;
    photoUrl: String;

    constructor(customer: CustomerEntity) {
        this.id = customer.id;
        this.name = customer.name;
        this.surname = customer.surname;
        this.photoUrl = customer.photoUrl ? `${config.HOST}/public/customer/${customer.photoUrl}` : null;
    }
}

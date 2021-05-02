import { ImageService } from './../../lib/upload-image';
import { UserEntity } from './../../entity/user.entity';
import { DeleteResult, getRepository } from 'typeorm';
import { CustomerEntity } from './../../entity';
import { IPayload } from '../../models/interfaces';

class CustomerService {
    find(): Promise<CustomerEntity[]> {
        return getRepository(CustomerEntity).find();
    }

    findOne(id: number): Promise<CustomerEntity> {
        return getRepository(CustomerEntity).findOne({ where: { id: id } });
    }

    async create(customer: CustomerEntity, payload: IPayload): Promise<CustomerEntity> {
        const newCustomer = getRepository(CustomerEntity).create(customer);

        const user = await getRepository(UserEntity).findOne(payload.id);
        newCustomer.createdBy = user;

        return getRepository(CustomerEntity).save(newCustomer);
    }

    async update(customer: CustomerEntity, payload: IPayload): Promise<CustomerEntity> {
        const customerDb = await this.findOne(customer.id);
        if (customerDb) {
            let oldPhotoUrl = customerDb.photoUrl;
            getRepository(CustomerEntity).merge(customerDb, customer);

            const user = await getRepository(UserEntity).findOne(payload.id);
            customerDb.modifiedBy = user;

            const newCustomer = await getRepository(CustomerEntity).save(customerDb);
            if (oldPhotoUrl !== newCustomer.photoUrl) {
                ImageService.replaceImage(oldPhotoUrl, newCustomer.photoUrl, '/public/customer');
            }
            return newCustomer;
        } else {
            return null;
        }
    }

    async delete(id: number): Promise<DeleteResult> {
        const customer = await this.findOne(id);

        if (customer) {
            const result = await getRepository(CustomerEntity).delete(customer);
            if (customer.photoUrl) {
                ImageService.removeFile(customer.photoUrl, 'public/customer');
            }
            return result;
        }

        // Return
        const emptyResult = new DeleteResult();

        emptyResult.affected = 0;
        emptyResult.raw = [];

        return emptyResult;
    }
}

export default new CustomerService();

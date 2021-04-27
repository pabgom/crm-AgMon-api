import { getRepository } from 'typeorm';
import { RoleEntity } from './../../entity/role.entity';
class RoleService {
    find(): Promise<RoleEntity[]> {
        return getRepository(RoleEntity).find();
    }

    findOne(id: number): Promise<RoleEntity> {
        return getRepository(RoleEntity).findOne({
            where: {
                id: id
            }
        });
    }
}

export default new RoleService();

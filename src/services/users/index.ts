import { DeleteResult, FindManyOptions, getRepository } from 'typeorm';
import RoleService from './../roles';
import { UserEntity } from './../../entity';

class UserService {
    /**
     * Return all the users by default only return true
     * @param userActive By default true
     * @returns Return all the Users Entity
     */
    find(userActive: boolean = null): Promise<UserEntity[]> {
        let options: FindManyOptions = {};
        if (userActive) {
            options = { where: { active: userActive } };
        }

        return getRepository(UserEntity).find(options);
    }

    findByUserName(username: string): Promise<UserEntity> {
        return getRepository(UserEntity).findOne({ where: { name: username }, relations: ['roles'] });
    }

    findOne(id: number): Promise<UserEntity> {
        return getRepository(UserEntity).findOne({ where: { id: id } });
    }

    async create(user: UserEntity, roleId: number): Promise<UserEntity> {
        const role = await RoleService.findOne(roleId);
        user.roles = [role];

        const newUser = getRepository(UserEntity).create(user);
        if (newUser) {
            return null;
        }

        return getRepository(UserEntity).save(newUser);
    }

    async update(newData: UserEntity, roleId?: number): Promise<UserEntity> {
        const user = await getRepository(UserEntity).findOne(newData.id);

        if (user) {
            if (roleId) {
                const role = await RoleService.findOne(roleId);
                user.roles = [role];
            }

            getRepository(UserEntity).merge(user, newData);
            return getRepository(UserEntity).save(user);
        }

        return null;
    }

    async delete(id: number): Promise<DeleteResult> {
        const userDb = await this.findOne(id);
        const deleteResult = new DeleteResult();
        deleteResult.affected = 0;
        if (userDb) {
            userDb.active = false;
            await this.update(userDb, null);
            deleteResult.affected++;
        }
        deleteResult.raw = [];

        return deleteResult;
    }
}

export default new UserService();

import { DeleteResult, FindManyOptions, getRepository } from 'typeorm';
import RoleService from './../roles';
import { UserEntity } from './../../entity';
import { AuthenticateService } from '..';

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

        options.relations = ['roles'];

        return getRepository(UserEntity).find(options);
    }

    findByEmail(userEmail: string): Promise<UserEntity> {
        return getRepository(UserEntity).findOne({ where: { email: userEmail, active: true }, relations: ['roles'] });
    }

    findOne(id: number): Promise<UserEntity> {
        return getRepository(UserEntity).findOne({ where: { id: id, active: true }, relations: ['roles'] });
    }

    async create(user: UserEntity, roleId: number): Promise<UserEntity | string> {
        var validateUser = await this.findByEmail(user.email);
        if (validateUser) {
            return 'Exists an user with the same email';
        }

        const role = await RoleService.findOne(roleId);
        user.roles = [role];

        const newUser = getRepository(UserEntity).create(user);

        return getRepository(UserEntity).save(newUser);
    }

    async update(newData: UserEntity, roleId: number = null): Promise<UserEntity | string> {
        var validateUser = await this.findByEmail(newData.email);
        if (validateUser && validateUser.id !== newData.id) {
            return 'Exists an user with the same email';
        }

        const user = await getRepository(UserEntity).findOne(newData.id);

        if (user) {
            if (roleId) {
                const role = await RoleService.findOne(roleId);
                user.roles = [role];
            }
            if (newData.password) {
                newData.password = await AuthenticateService.encryptPassword(newData.password);
            }

            getRepository(UserEntity).merge(user, newData);
            return getRepository(UserEntity).save(user);
        } else {
            return 'User not found';
        }
    }

    async delete(id: number): Promise<DeleteResult> {
        const userDb = await getRepository(UserEntity).findOne({ where: { id: id, active: true } });
        const deleteResult = new DeleteResult();
        deleteResult.affected = 0;
        if (userDb) {
            userDb.active = false;
            userDb.email = `${userDb.email}-deleted`;
            await this.update(userDb, null);
            deleteResult.affected++;
        }
        deleteResult.raw = [];

        return deleteResult;
    }
}

export default new UserService();

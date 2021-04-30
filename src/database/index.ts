import { createConnection, getRepository } from 'typeorm';
import config, { Roles } from './../config';
import { CustomerEntity, RoleEntity, UserEntity } from './../entity';

export async function InitializeDB(): Promise<void> {
    /** Create Connection to DataBase */

    await createConnection({
        type: 'postgres',
        host: config.DB_HOST,
        port: config.DB_PORT,
        username: config.DB_USER,
        password: config.DB_PASSWORD,
        database: config.DB_DATABASE,
        entities: [UserEntity, CustomerEntity, RoleEntity],
        synchronize: process.env.DB_SYNCHRONIZE === 'true',
        logging: process.env.DB_LOGGER
    });

    /** Validate if table users is empty, in that case create first user, run the seed data */
    const users = await getRepository(UserEntity).find();

    if (users.length > 0) return;

    await seedRoles();
    await seedUser();
}

/** Create Roles in the DB */
async function seedRoles(): Promise<RoleEntity[]> {
    const adminRole: RoleEntity = { id: Roles.Admin, name: 'admin' };
    const basicRole: RoleEntity = { id: Roles.Basic, name: 'basic' };

    // Insert roles in the DB
    return await getRepository(RoleEntity).save([adminRole, basicRole]);
}

async function seedUser(): Promise<UserEntity> {
    const roleAdmin = await getRepository(RoleEntity).findOne(Roles.Admin);

    const user: UserEntity = new UserEntity();
    user.name = config.INITIAL_USER_NAME;
    user.email = config.INITIAL_USER_EMAIL;
    user.password = config.INITIAL_USER_PASSWORD;
    user.roles = [roleAdmin];
    return await getRepository(UserEntity).save(user);
}

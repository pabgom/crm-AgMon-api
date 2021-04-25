import { createConnection, getRepository } from 'typeorm';
import config, { Roles } from './../config';
import { User, Customer, Role } from './../entity';

export async function InitializeDB(): Promise<void> {
    /** Create Connection to DataBase */
    await createConnection({
        type: 'postgres',
        host: config.DB_HOST,
        port: config.DB_PORT,
        username: config.DB_USER,
        password: config.DB_PASSWORD,
        database: config.DB_DATABASE,
        entities: [User, Customer, Role],
        synchronize: process.env.DB_SYNCHRONIZE === 'true',
        logging: false
    });

    /** Validate if table users is empty, in that case create first user, run the seed data */
    const users = await getRepository(User).find();
    if (users.length > 0) return;

    await seedRoles();
    await seedUser();
}

/** Create Roles in the DB */
async function seedRoles(): Promise<Role[]> {
    const adminRole: Role = { id: Roles.Admin, name: 'admin' };
    const basicRole: Role = { id: Roles.Basic, name: 'basic' };

    // Insert roles in the DB
    return await getRepository(Role).save([adminRole, basicRole]);
}

async function seedUser(): Promise<User> {
    const roleAdmin = await getRepository(Role).findOne(Roles.Admin);

    const user: User = new User();
    user.name = config.INITIAL_USER_NAME;
    user.password = config.INITIAL_USER_PASSWORD;
    user.roles = [roleAdmin];
    return await getRepository(User).save(user);
}

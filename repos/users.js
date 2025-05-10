import fs from 'fs';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import Repository from './repository.js';


const scrypt = promisify(_scrypt);
//const scryptAsync = util.promisify(crypto.scrypt);
class UsersRepository extends Repository {

    
    async comparePasswords(saved, supplied) {
       const [hashed, salt] = saved.split('.');
       const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

       return hashed === hashedSuppliedBuf.toString('hex');

    };
    async create(attrs) {
        attrs.id = this.randomId();


        const salt = randomBytes(8).toString('hex');
         const buf = await scrypt(attrs.password, salt, 64); 

        const records = await this.getAll();
        const record = {
            ...attrs,
            password: `${buf.toString('hex')}.${salt}`
        };
        records.push(record);
        
        await this.writeAll(records);

        return record;
    }
     
}

const usersRepo = new UsersRepository('users.json');
export default usersRepo;

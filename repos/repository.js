import fs from 'fs';
import { randomBytes, scrypt as _scrypt } from 'crypto';


class Repository {
     constructor(filename) {
        if (!filename) {
            throw new Error('Creating a repository requires a filename')
        }

        this.filename = filename;
        try {
            fs.accessSync(this.filename);

        } catch (err) {
            fs.writeFileSync(this.filename, '[]');

        }
      
    }
     async create(attrs) {
        attrs.id = this.randomId();

        const records = await this.getAll();
        records.push(attrs);
        await this.writeAll(records);

        return attrs;
     }

    async getAll() {
        return JSON.parse(
            await fs.promises.readFile(this.filename, {
                encoding: 'utf-8'
            })
        );
    }

   


    async writeAll(records) {
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
    }

    randomId() {
        return randomBytes(4).toString('hex');

    }

    async getOne(id) {
        const records = await this.getAll();
        return records.find(record => record.id === id);

    }

    async delete(id) {
        const records = await this.getAll();
        const filterRecords = records.filter(record => record.id !== id);
        await this.writeAll(filterRecords);
    }

    async update(id, attrs) {
        const records = await this.getAll();
        const record = records.find(record => record.id === id);

        if(!record) {
            throw new Error(`Record with id ${id} not found`);
        }

        Object.assign(record, attrs);
        await this.writeAll(records)

    }

    async getOneBy(filters) {
        const records = await this.getAll();

        for(let record of records) {
            let found = true;

            for(let key in filters) {
                if (record[key] !== filters[key]) {
                    found = false;
                }
            }

            if(found) {
                return record;
            }
        }
    }

}

export default Repository
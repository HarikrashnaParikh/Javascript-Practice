const fs = require("fs");
const crypto = require("crypto");

module.exports = class Repository {
  constructor(fileName) {
    if (!fileName) {
      throw new Error("Creating repository requires fileName");
    }

    this.fileName = fileName;
    // using sync is not a good way but as I needed this to be performed once I used it
    //try block checks if the file exists or not catch block creates the file and assigns [] to it
    try {
      fs.accessSync(this.fileName);
    } catch (err) {
      fs.writeFileSync(this.fileName, "[]");
    }
  }
  // create data
  async create(attrs) {
    attrs.id = this.randomId();
    const records = await this.getAll();
    records.push(attrs);
    await this.writeAll(records);
    return attrs;
  }
  // getting all users data
  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.fileName, {
        encoding: "utf8",
      })
    );
  }

  //Writing the data in user.json
  async writeAll(records) {
    await fs.promises.writeFile(
      this.fileName,
      JSON.stringify(records, null, 2)
    );
  }

  //creating random id to assign as id
  randomId() {
    return crypto.randomBytes(4).toString("hex");
  }

  //Select based on id
  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }

  //delete the element with id
  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    return await this.writeAll(filteredRecords);
  }

  //update the user.json data with specific data
  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);
    if (!record) {
      throw new Error(`User with ${id} not found`);
    }
    Object.assign(record, attrs);
    return await this.writeAll(records);
  }
  async getOneBy(filters) {
    const records = await this.getAll();
    for (let record of records) {
      let found = true;
      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }
      if (found) {
        return record;
      }
    }
  }
};

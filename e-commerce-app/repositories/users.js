const crypto = require("crypto");
const util = require("util");
const Repository = require("./repository");

const scrypt = util.promisify(crypto.scrypt);

class UserRepository extends Repository {
  // creating users data
  async create(attrs) {
    attrs.id = this.randomId();
    const records = await this.getAll();
    const salt = crypto.randomBytes(8).toString("hex");
    const buff = await scrypt(attrs.password, salt, 64);
    const record = {
      ...attrs,
      password: `${buff.toString("hex")}.${salt}`,
    };
    records.push(record);
    await this.writeAll(records);
    return record;
  }
  async hashComparator(saved, supplied) {
    const [hased, salt] = saved.split(".");
    const hashedSuppliedBuff = await scrypt(supplied, salt, 64);
    return hased === hashedSuppliedBuff.toString("hex");
  }
}
// testing the repositories methods
// const test = async () => {
//   const repo = new UserRepository("users.json");
//   //   await repo.create({ email: "test@test.com", password: "testtest" });
//   //   const users = await repo.getAll();
//   const user = await repo.getOneBy({ id: "9a658831" });
//   console.log(user);
// };
// test();

module.exports = new UserRepository("users.json");

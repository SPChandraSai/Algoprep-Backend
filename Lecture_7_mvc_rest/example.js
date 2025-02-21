const bcrypt=require("bcrypt");
const password="abcd"

async function create(){
    console.time();
    const randomsalt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password, randomsalt);
    const isTheSameorNot=await bcrypt.compare(password, hash);
    console.timeEnd();
    console.log("hashed password", hash);
}
create();
const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/psycheai");

async function test() {
  const user = await User.create({
    name: "Test",
    email: "test@mail.com",
    password: "123"
  });

  console.log(user);
}

test();

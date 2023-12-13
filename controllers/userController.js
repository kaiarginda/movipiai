const User = require("../models/User");
const Comment = require("../models/Comments");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
exports.createuser = async (req, res) => {
  const body = req.body;
  const password = body.password;
  const exists = await User.findOne({ username: body.username });
  console.log(exists);
  if (exists) return res.json({ fail: "true" });
  let success = false;
  await bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      return bcrypt.hash(password, salt);
    })
    .then(async (hash) => {
      await User.create({ username: body.username, password: hash });
      success = true;
    })
    .catch((err) => console.error(err.message));
  //   console.log(body, "body working");
  if (success) {
    return res.json({ success: "true" });
  } else {
    return res.json({ fail: "true" });
  }
};

exports.login = async (req, respo) => {
  const body = req.body;
  const user = await User.findOne({ username: body.formData.username });
  if (!user) return respo.json({ fail: "true" });
  async function validateUser(hash) {
    try {
      const result = await bcrypt.compare(req.body.formData.password, hash);
      if (result === true) {
        const token = jwt.sign({ user: user }, "secret", {
          expiresIn: 3600000,
        });
        return token;
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  const token = await validateUser(user.password);
  //   console.log(token);
  return respo.json({ token });
};

exports.getuserbytoken = async (req, res) => {
  const token = req.body.token;

  function verifyRefreshToken(token) {
    const secret = "secret";
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  }

  const obj = verifyRefreshToken(token);

  return res.json({ user: obj.data.user });
};

exports.getRootComments = async (req, res) => {
  const comments = await Comment.find({ root: "root" });
  return res.json({ comments });
};
exports.getAllComments = async (req, res) => {
  const allComments = await Comment.find();
  return res.json({ allComments });
};

exports.reply = async (req, res) => {
  const body = req.body;

  await Comment.create({
    text: body.reply,
    parentId: body.parentId,
    productId: body.productId,
    author: body.author,
  });
  return res.json({ st: "suc" });
};
exports.comment = async (req, res) => {
  const body = await req.body;
  // console.log(body);
  const user = await User.findOne({ _id: body.author });
  await Comment.create({
    text: body.comment,
    productId: body.postID,
    parentId: body.parentId,
    root: body.onroot,
    author: user.username,
  });

  return res.json("adf");
};

exports.getComments = async (req, res) => {
  // console.log(req.body, "id");
  const { id } = req.body;
  const commentData = await Comment.find({ productId: `${id}` });
  return res.json({ commentData });
};

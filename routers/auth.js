const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const User = require("../models/").user;
const Space = require("../models").space;
const Story = require("../models").story;
const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }

    const userSpace = await Space.findOne({
      where: { userId: user.id },
      include: [Story],
    });

    delete user.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ userId: user.id });
    return res
      .status(200)
      .send({ token, user: user.dataValues, space: userSpace });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).send("Please provide an email, password and a name");
  }

  try {
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      name,
    });

    delete newUser.dataValues["password"]; // don't send back the password hash

    const newSpace = await Space.create({
      title: `${newUser.name} space`,
      description: null,
      backgroundColor: "#fff",
      color: "#191919",
      userId: newUser.id,
    });

    const fullSpace = await Space.findByPk(newSpace.id, {
      include: [Story],
    });

    const token = toJWT({ userId: newUser.id });

    res.status(201).json({ token, user: newUser.dataValues, space: fullSpace });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get("/me", authMiddleware, async (req, res) => {
  // don't send back the password hash

  // find space of this user (with stories)
  // include in the response

  delete req.user.dataValues["password"];

  const userSpace = await Space.findOne({
    where: { userId: req.user.id },
    include: [Story],
  });

  res.status(200).send({ user: req.user, space: userSpace });
});

router.post("/me/:spaceId", authMiddleware, async (req, res) => {
  const spaceId = parseInt(req.params.spaceId);
  const { name, content, imageUrl } = req.body;
  try {
    const newStory = await Story.create({
      name,
      content,
      imageUrl,
      spaceId,
    });
    const userSpace = await Space.findOne({
      where: { userId: req.user.id },
      include: [Story],
    });

    res.status(200).send({ user: req.user, space: userSpace });
    // res.status(201).send("Successfully submitted");
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;

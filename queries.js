const User = require("./models").user;
const Story = require("./models").story;
const Space = require("./models").space;

async function getUsers() {
  const allUsers = await User.findAll();
  return allUsers.map((user) => user.toJSON());
  // allUsers.map((user) => {
  //   user.get({ plain: true });
  // });
}

getUsers().then((users) => console.log(users));

async function getStories() {
  const allStories = await Story.findAll();
  return allStories.map((story) => story.toJSON());
  // allStories.map((story) => {
  //   story.get({ plain: true });
  // });
}

getStories().then((stories) => console.log(stories));

async function getSpaces() {
  const allSpacesa = await Space.findAll();
  return allSpacesa.map((space) => space.toJSON());
  // allStories.map((story) => {
  //   story.get({ plain: true });
  // });
}

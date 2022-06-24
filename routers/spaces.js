const { Router } = require("express");
const Space = require("../models").space;
const Story = require("../models").story;
const spacesRouter = new Router();

spacesRouter.get("/", async (request, response, next) => {
  try {
    const getSpaces = await Space.findAll();
    response.send(getSpaces);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

spacesRouter.get("/details/:id", async (request, response, next) => {
  try {
    const id = parseInt(request.params.id);
    const getSpacesDetails = await Space.findByPk(id, { include: Story });
    response.send(getSpacesDetails);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

spacesRouter.delete("/:storyId", async (request, response, next) => {
  try {
    const storyId = parseInt(request.params.storyId);
    const findStory = await Story.findByPk(storyId);

    if (!storyId) {
      return response.status(404).send("Story not found");
    }

    await findStory.destroy();
    return response.status(204).send("Story deleted");
  } catch (e) {
    console.log(e.message, error);
    next(e);
  }
});

module.exports = spacesRouter;

const { Router } = require("express");
const Space = require("../models").space;
const Story = require("../models").story;
const spacesRouter = new Router();
const authMiddleware = require("../auth/middleware");
const Favorite = require("../models").favorite;

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

// http PUT :4000/space/1 backgroundColor="#191919" color="#f5f5f5" title="Blabla" description="whatever" Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1NjE1MDk3NCwiZXhwIjoxNjU2MTU4MTc0fQ.PMwyyekdw2AvYJKRGNeELAKBZxEwEJyLzgD4X2l4QEY"

spacesRouter.put("/:spaceId", authMiddleware, async (req, res) => {
  try {
    const { backgroundColor, color, title, description } = req.body;
    const space = parseInt(req.params.spaceId);
    const mySpace = await Space.findByPk(space);
    const updateSpace = await mySpace.update({
      backgroundColor,
      color,
      title,
      description,
    });
    res.send(updateSpace);
  } catch (e) {
    console.log(e.message);
  }
});

spacesRouter.put("/me/favorites", async (req, res) => {
  try {
    // const { userId, storyId } = Number(req.body);
    const userId = req.body.userId;
    const storyId = req.body.storyId;
    const newFavorite = await Favorite.update({
      id,
      userId,
      storyId,
    });
    console.log("hello from the other side");
    res.send(newFavorite);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = spacesRouter;

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

module.exports = spacesRouter;

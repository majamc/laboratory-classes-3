
const { MENU_LINKS } = require("../constants/navigation");
const express = require("express");

const router = express.Router();

router.get("/", (_req, res) => {
  res.render("logout", {
    headTitle: "Shop - Logout",
    path: "/logout",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/logout",
  });
});

module.exports = router;
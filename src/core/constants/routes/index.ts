const ROOT = "/";

const BLOGS = "blogs";

const RECIPES = "recipes";

const ABOUT = "about";

export const RELATIVE_ROUTES = {
  ROOT,
  BLOGS,
  RECIPES,
  ABOUT,
} as const;

export const ABSOLUTE_ROUTES = {
  ROOT,
  BLOGS: `${ROOT}${BLOGS}`,
  RECIPES: `${ROOT}${RECIPES}`,
  ABOUT: `${ROOT}${ABOUT}`,
} as const;

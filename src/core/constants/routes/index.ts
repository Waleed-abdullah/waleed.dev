const ROOT = '/';

const BLOGS = 'blogs';

const RECIPES = 'recipes';

export const RELATIVE_ROUTES = {
  ROOT,
  BLOGS,
  RECIPES,
} as const;

export const ABSOLUTE_ROUTES = {
  ROOT,
  BLOGS: `${ROOT}${BLOGS}`,
  RECIPES: `${ROOT}${RECIPES}`,
} as const;

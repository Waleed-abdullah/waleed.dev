const ROOT = "/";

const BLOGS = "blogs";

const PROJECTS = "projects";

const ABOUT = "about";

export const RELATIVE_ROUTES = {
  ROOT,
  BLOGS,
  PROJECTS,
  ABOUT,
} as const;

export const ABSOLUTE_ROUTES = {
  ROOT,
  BLOGS: `${ROOT}${BLOGS}`,
  PROJECTS: `${ROOT}${PROJECTS}`,
  ABOUT: `${ROOT}${ABOUT}`,
} as const;

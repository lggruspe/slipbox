/**
 * Category that the home page belongs to.
 */
type HomeRoute = {
  type: "home";
};

/**
 * Category that note pages belong to.
 */
type NoteRoute = {
  type: "note";
  // TODO or should this be a string?
  note: number;
};

/*
 * A temporary page that redirects the user to a random note page.
 */
type RandomRoute = {
  type: "random";
};

/**
 * Category that reference pages belong to.
 */
type ReferenceRoute = {
  type: "reference";
  reference: string;
};

/**
 * Category that the references page belongs to.
 */
type ReferenceListRoute = {
  type: "reference-list";
};

/**
 * Category that the search page belongs to.
 */
type SearchRoute = {
  type: "search";
};

/**
 * Category that tag pages belong to.
 */
type TagRoute = {
  type: "tag";
  tag: string;
};

/**
 * Category that the tags page belongs to.
 */
type TagListRoute = {
  type: "tag-list";
};

/**
 * A route represents what kind of category a page belongs to.
 */
type Route =
  | HomeRoute
  | NoteRoute
  | RandomRoute
  | ReferenceRoute
  | ReferenceListRoute
  | SearchRoute
  | TagRoute
  | TagListRoute;

/**
 * Returns route for the given URL fragment hash.
 */
export function getRoute(hash: string): Route {
  switch (hash) {
    case "":
    case "#":
    case "#home":
      return { type: "home" };
    case "#random":
      return { type: "random" };
    case "#references":
      return { type: "reference-list" };
    case "#search":
      return { type: "search" };
    case "#tags":
      return { type: "tag-list" };
    default:
      break;
  }

  // Note route.
  if (/^#(0|([1-9][0-9]*))$/.test(hash)) {
    return {
      type: "note",
      note: Number(hash.slice(1)),
      // TODO check if note exists
    };
  }

  // Reference route.
  if (hash.startsWith("#ref-")) {
    return {
      type: "reference",
      reference: hash.slice(5),
      // TODO check if reference exists
    };
  }

  // Tag route.
  return {
    type: "tag",
    tag: hash,
    // TODO check if tag exists
  };
}

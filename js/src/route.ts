/**
 * Category that the home page belongs to.
 */
type HomeRoute = {
  type: "home";
  hash: string;
};

/**
 * Category that note pages belong to.
 */
type NoteRoute = {
  type: "note";
  // TODO or should this be a string?
  note: number;
  hash: string;
};

/*
 * A temporary page that redirects the user to a random note page.
 */
type RandomRoute = {
  type: "random";
  hash: string;
};

/**
 * Category that reference pages belong to.
 */
type ReferenceRoute = {
  type: "reference";
  reference: string;
  hash: string;
};

/**
 * Category that the references page belongs to.
 */
type ReferenceListRoute = {
  type: "reference-list";
  hash: string;
};

/**
 * Category that the search page belongs to.
 */
type SearchRoute = {
  type: "search";
  hash: string;
};

/**
 * Category that tag pages belong to.
 */
type TagRoute = {
  type: "tag";
  tag: string;
  hash: string;
};

/**
 * Category that the tags page belongs to.
 */
type TagListRoute = {
  type: "tag-list";
  hash: string;
};

/**
 * A route represents what kind of category a page belongs to.
 */
export type Route =
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
      return { type: "home", hash };
    case "#random":
      return { type: "random", hash };
    case "#references":
      return { type: "reference-list", hash };
    case "#search":
      return { type: "search", hash };
    case "#tags":
      return { type: "tag-list", hash };
    default:
      break;
  }

  // Note route.
  if (/^#(0|([1-9][0-9]*))$/.test(hash)) {
    return {
      type: "note",
      note: Number(hash.slice(1)),
      hash,
      // TODO check if note exists
    };
  }

  // Reference route.
  if (hash.startsWith("#ref-")) {
    return {
      type: "reference",
      reference: hash.slice(5),
      hash,
      // TODO check if reference exists
    };
  }

  // Tag route.
  return {
    type: "tag",
    tag: hash,
    hash,
    // TODO check if tag exists
  };
}

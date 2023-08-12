/**
 * Type of parameter to `randomChoice`.
 * This interface is implemented by `cytoscape.NodeCollection` and `T[]`.
 */
interface Sequence<T> {
  length: number;
  [index: number]: T | undefined;
}

/**
 * Returns a random node from the collection, or `undefined` if the collection
 * is empty.
 */
export function randomChoice<T>(choices: Sequence<T>): T | undefined {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

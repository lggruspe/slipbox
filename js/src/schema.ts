import { ElementsDefinition } from "cytoscape";

export type GraphSchema = {
  data: unknown[];
  directed?: boolean;
  multigraph?: boolean;
  elements: ElementsDefinition;
};

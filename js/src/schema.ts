type NodeSchema = {
    data: {
        filename: string;
        tags: string[];
        id: string;
        value: number;
        title: string;
        position: {
            x: number;
            y: number;
        };
    };
};

type EdgeSchema = {
    data: {
        source: number;
        target: number;
    };
};

export type GraphSchema = {
    data: unknown[];
    directed?: boolean;
    multigraph?: boolean;
    elements: {
        nodes: NodeSchema[];
        edges: EdgeSchema[];
    };
};

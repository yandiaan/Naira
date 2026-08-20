// Generated from openapi/openapi.yaml. Do not edit by hand.

export interface paths {
    "/health/live": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get process liveness */
        get: operations["getLiveHealth"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/health/ready": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get dependency readiness */
        get: operations["getReadyHealth"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/version": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get build metadata */
        get: operations["getVersion"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        BuildInfo: {
            service: string;
            version: string;
            gitSha: string;
            buildTime: string;
        };
        HealthResponse: {
            /** @constant */
            status: "ok";
        };
        ReadyResponse: {
            /** @constant */
            status: "ready";
            checks: {
                [key: string]: "ok" | "unavailable";
            };
        };
        ErrorEnvelope: {
            error: {
                code: string;
                message: string;
                details: {
                    [key: string]: unknown;
                };
                requestId: string;
            };
        };
        MutationRequest: {
            mutationId: string;
            entityId: string;
            expectedVersion: number;
            /** @enum {string} */
            operation: "create" | "update" | "delete";
            payload?: {
                [key: string]: unknown;
            };
        };
        MutationResult: {
            /** @enum {string} */
            status: "applied" | "conflict" | "rejected";
            entityId: string;
            serverVersion?: number;
        };
        Conflict: {
            code: string;
            entityId: string;
            serverVersion: number;
        };
        ChangeCursor: string;
        ChangeRecord: {
            entityId: string;
            version: number;
            deleted: boolean;
            payload?: {
                [key: string]: unknown;
            };
        };
        ChangePage: {
            changes: components["schemas"]["ChangeRecord"][];
            nextCursor: components["schemas"]["ChangeCursor"];
            hasMore: boolean;
        };
    };
    responses: {
        /** @description The request is invalid. */
        BadRequest: {
            headers: {
                "X-Request-ID": components["headers"]["RequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorEnvelope"];
            };
        };
        /** @description Unexpected server error. */
        InternalError: {
            headers: {
                "X-Request-ID": components["headers"]["RequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorEnvelope"];
            };
        };
    };
    parameters: never;
    requestBodies: never;
    headers: {
        /** @description Correlation identifier for the request. */
        RequestId: string;
    };
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    getLiveHealth: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The API process is alive. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HealthResponse"];
                };
            };
            400: components["responses"]["BadRequest"];
            500: components["responses"]["InternalError"];
        };
    };
    getReadyHealth: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description All required dependencies are ready. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ReadyResponse"];
                };
            };
            400: components["responses"]["BadRequest"];
            /** @description One or more dependencies are unavailable. */
            503: {
                headers: {
                    "X-Request-ID": components["headers"]["RequestId"];
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorEnvelope"];
                };
            };
        };
    };
    getVersion: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Build metadata. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BuildInfo"];
                };
            };
            400: components["responses"]["BadRequest"];
            500: components["responses"]["InternalError"];
        };
    };
}

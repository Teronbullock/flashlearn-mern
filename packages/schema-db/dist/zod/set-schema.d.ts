import { z } from 'zod';
export declare const SetSelectSchema: import("drizzle-zod").BuildSchema<"select", {
    id: import("drizzle-orm/pg-core").PgColumn<{
        name: "id";
        tableName: "fc_sets";
        dataType: "number";
        columnType: "PgSerial";
        data: number;
        driverParam: number;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: true;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
    userId: import("drizzle-orm/pg-core").PgColumn<{
        name: "user_id";
        tableName: "fc_sets";
        dataType: "string";
        columnType: "PgUUID";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
    title: import("drizzle-orm/pg-core").PgColumn<{
        name: "title";
        tableName: "fc_sets";
        dataType: "string";
        columnType: "PgVarchar";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: 180;
    }>;
    description: import("drizzle-orm/pg-core").PgColumn<{
        name: "description";
        tableName: "fc_sets";
        dataType: "string";
        columnType: "PgVarchar";
        data: string;
        driverParam: string;
        notNull: false;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: 500;
    }>;
}, undefined, undefined>;
export declare const SetInsertSchema: import("drizzle-zod").BuildSchema<"insert", {
    id: import("drizzle-orm/pg-core").PgColumn<{
        name: "id";
        tableName: "fc_sets";
        dataType: "number";
        columnType: "PgSerial";
        data: number;
        driverParam: number;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: true;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
    userId: import("drizzle-orm/pg-core").PgColumn<{
        name: "user_id";
        tableName: "fc_sets";
        dataType: "string";
        columnType: "PgUUID";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
    title: import("drizzle-orm/pg-core").PgColumn<{
        name: "title";
        tableName: "fc_sets";
        dataType: "string";
        columnType: "PgVarchar";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: 180;
    }>;
    description: import("drizzle-orm/pg-core").PgColumn<{
        name: "description";
        tableName: "fc_sets";
        dataType: "string";
        columnType: "PgVarchar";
        data: string;
        driverParam: string;
        notNull: false;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: 500;
    }>;
}, undefined, undefined>;
export type SetSelectType = z.infer<typeof SetSelectSchema>;
export type SetInsertType = z.infer<typeof SetInsertSchema>;
export declare const SetSchema: z.ZodObject<{
    title: z.ZodPipe<z.ZodString, z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodOptional<z.ZodNullable<z.ZodString>>, z.ZodString>>>;
}, {
    out: {};
    in: {};
}>;
export type SetType = z.infer<typeof SetSchema>;
//# sourceMappingURL=set-schema.d.ts.map
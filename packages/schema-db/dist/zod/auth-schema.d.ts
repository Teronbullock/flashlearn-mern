import { z } from 'zod';
export declare const UserSelectSchema: import("drizzle-zod").BuildSchema<"select", {
    id: import("drizzle-orm/pg-core").PgColumn<{
        name: "id";
        tableName: "fc_users";
        dataType: "string";
        columnType: "PgUUID";
        data: string;
        driverParam: string;
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
    email: import("drizzle-orm/pg-core").PgColumn<{
        name: "email";
        tableName: "fc_users";
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
        length: 125;
    }>;
    password: import("drizzle-orm/pg-core").PgColumn<{
        name: "password";
        tableName: "fc_users";
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
        length: 125;
    }>;
    slug: import("drizzle-orm/pg-core").PgColumn<{
        name: "slug";
        tableName: "fc_users";
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
        length: 125;
    }>;
}, undefined, undefined>;
export declare const UserInsertSchema: import("drizzle-zod").BuildSchema<"insert", {
    id: import("drizzle-orm/pg-core").PgColumn<{
        name: "id";
        tableName: "fc_users";
        dataType: "string";
        columnType: "PgUUID";
        data: string;
        driverParam: string;
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
    email: import("drizzle-orm/pg-core").PgColumn<{
        name: "email";
        tableName: "fc_users";
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
        length: 125;
    }>;
    password: import("drizzle-orm/pg-core").PgColumn<{
        name: "password";
        tableName: "fc_users";
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
        length: 125;
    }>;
    slug: import("drizzle-orm/pg-core").PgColumn<{
        name: "slug";
        tableName: "fc_users";
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
        length: 125;
    }>;
}, undefined, undefined>;
export type UserSelectType = z.infer<typeof UserSelectSchema>;
export type UserInsertType = z.infer<typeof UserInsertSchema>;
export declare const RegisterSchema: z.ZodObject<{
    email: z.ZodPipe<z.ZodString, z.ZodEmail>;
    password: z.ZodPipe<z.ZodString, z.ZodString>;
    passwordConfirm: z.ZodString;
}, {
    out: {};
    in: {};
}>;
export type RegisterType = z.infer<typeof RegisterSchema>;
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodPipe<z.ZodString, z.ZodEmail>;
    password: z.ZodPipe<z.ZodString, z.ZodString>;
}, {
    out: {};
    in: {};
}>;
export type LoginType = z.infer<typeof LoginSchema>;
export declare const PasswordSchema: z.ZodObject<{
    password: z.ZodPipe<z.ZodString, z.ZodString>;
}, {
    out: {};
    in: {};
}>;
export type PasswordType = z.infer<typeof PasswordSchema>;
export declare const UpdatePasswordSchema: z.ZodObject<{
    password: z.ZodPipe<z.ZodString, z.ZodString>;
    oldPassword: z.ZodString;
    passwordConfirm: z.ZodString;
}, {
    out: {};
    in: {};
}>;
export type UpdatePasswordType = z.infer<typeof UpdatePasswordSchema>;
//# sourceMappingURL=auth-schema.d.ts.map
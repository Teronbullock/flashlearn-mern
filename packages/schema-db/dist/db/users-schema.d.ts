export declare const usersTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "fc_users";
    schema: undefined;
    columns: {
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
    };
    dialect: "pg";
}>;
export declare const usersRelations: import("drizzle-orm").Relations<"fc_users", {
    cards: import("drizzle-orm").Many<"fc_cards">;
    sets: import("drizzle-orm").Many<"fc_sets">;
    refreshTokens: import("drizzle-orm").One<"fc_refresh_tokens", false>;
}>;
//# sourceMappingURL=users-schema.d.ts.map
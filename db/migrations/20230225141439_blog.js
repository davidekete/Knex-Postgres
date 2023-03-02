/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  //Create a table called "blog" with the following columns: id, title, content, author, created_at, updated_at
  return knex.schema.createTable("blog", (table) => {
    table.increments("id").primary(); //id column with auto-incrementing primary key
    table.string("title").notNullable(); //title column with type string
    table.text("content").notNullable(); //content column with type text
    table.string("author").notNullable(); //author column with type string
    table.timestamp("created_at").defaultTo(knex.fn.now()); //created_at column with type timestamp and default value of current time
    table.timestamp("updated_at").defaultTo(knex.fn.now()); //updated_at column with type timestamp and default value of current time
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  // Drop the "blog" table
  return knex.schema.dropTableIfExists("blog");
};

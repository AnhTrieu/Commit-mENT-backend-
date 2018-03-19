exports.up = function(knex, Promise) {
  return knex.schema.createTable('commits', (table) => {
    table.increments('id')
    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.string('message').notNullable().defaultTo('')
    table.string('createdAt').notNullable().defaultTo('')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('commits')
};

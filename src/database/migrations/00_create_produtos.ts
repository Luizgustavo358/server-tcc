import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('rfid').notNullable();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.string('type').notNullable();
        table.string('avatar').notNullable();
        table.date('validity').notNullable();
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('products');
}
/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.dropTable('bug', 'ifExists')
    pgm.dropTable('project', 'ifExists')
};

exports.down = pgm => {};

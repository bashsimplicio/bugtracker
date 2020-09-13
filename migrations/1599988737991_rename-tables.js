/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.renameTable('projects', 'project')
    pgm.renameTable('bugs', 'bug')
};

exports.down = pgm => {};

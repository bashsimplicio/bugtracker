/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.renameColumn('bug', 'projectId', 'project_id')
};

exports.down = pgm => {};

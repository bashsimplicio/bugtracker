/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.renameColumn('bug', 'bug_details', 'bug_detail')
};

exports.down = pgm => {};

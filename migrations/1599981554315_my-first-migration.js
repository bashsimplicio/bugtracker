/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('projects', {
        id: 'id',
        project_name: { type: 'varchar(1000)', notNull: true },
        team: { type: 'varchar(1000)', notNull: true },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    })
    pgm.createTable('bugs', {
        id: 'id',
        projectId: {
            type: 'integer',
            notNull: true,
            references: '"projects"',
            onDelete: 'cascade',
        },
        bug_name: { type: 'varchar(1000)', notNull: true },
        severity: { type: 'varchar(1000)', notNull: true },
        bug_details: { type: 'varchar(1000)', notNull: true },
        priority: { type: 'varchar(1000)', notNull: true },
        device: { type: 'varchar(1000)', notNull: true },
        browser: { type: 'varchar(1000)', notNull: true },
        status: { type: 'varchar(1000)', notNull: true },
        date_reported: { type: 'date', notNull: true },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    })
    pgm.createIndex('bugs', 'projectId')
    pgm.createType('severity', ['blocker', 'critical', 'major', 'minor', 'trivial', 'improvement'])
    pgm.createType('priority', ['critical', 'high', 'medium', 'low'])
    pgm.createType('status', ['open', 'in progress', 'pending', 'done'])
};

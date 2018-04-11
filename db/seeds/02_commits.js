exports.seed = function(knex, Promise) {
  return knex('commits').del()
    .then(function () {
      return knex('commits').insert([
        { id: 1, user_id: 1, message: 'testing testing', created_on: '2018-02-27T23:35:11Z', sha: 'blahblahblah' },
        { id: 2, user_id: 1, message: 'lets play rock paper scissors!', created_on: '2018-02-23T02:34:21Z', sha: 'blahblahblah' },
        { id: 3, user_id: 1, message: 'lets play roshambo', created_on: '2018-02-23T02:34:21Z', sha: 'blahblahblah' },
        { id: 4, user_id: 1, message: 'for charlie', created_on: '2018-02-16T17:55:41Z', sha: 'blahblahblah' },
        { id: 5, user_id: 1, message: 'pushing some stuff up', created_on: '2018-02-15T21:41:14Z', sha: 'blahblahblah' },
        { id: 6, user_id: 1, message: 'so i dont break stuff anymore than i already have', created_on: '2018-02-15T21:40:50Z', sha: 'blahblahblah' },
        { id: 7, user_id: 1, message: 'test', created_on: '2018-02-13T17:19:03Z', sha: 'blahblahblah' },
        { id: 8, user_id: 1, message: 'test', created_on: '2018-02-08T21:41:15Z', sha: 'blahblahblah' },
        { id: 9, user_id: 1, message: 'test', created_on: '2018-01-28T22:54:40Z', sha: 'blahblahblah' },
        { id: 10, user_id: 1, message: 'look mom', created_on: '2018-01-19T17:34:08Z', sha: 'blahblahblah' },
        { id: 11, user_id: 2, message: 'commit this, bro', created_on: '2018-01-18T17:34:08Z', sha: 'blahblahblah' },
        { id: 12, user_id: 2, message: 'all tests passing', created_on: '2018-01-17T17:34:08Z', sha: 'blahblahblah' },
        { id: 13, user_id: 2, message: 'wicked gnarly bug slaying', created_on: '2018-01-16T17:34:08Z', sha: 'blahblahblah' }
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('commits_id_seq', (SELECT MAX(id) FROM commits));`
      )
    })
}

module.exports.run = (client) => {
  if(process.env.NODE_ENV == 'production') {
    client.generateInvite({ permissions: 8 }).then(console.log);
  }
  console.log(client.user.username + ' ready!');
}

module.exports.name = 'ready';

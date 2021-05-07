module.exports.run = function(client, message) {
  message.channel.send('Понг!');
}

exports.config = {
  help: {
    description: `Вспомогательная команда для разработчика.`,
    usage: ''
  }
}

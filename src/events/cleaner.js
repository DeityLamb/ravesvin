const ms = require('ms');
const config = require('config').channels.content;

const messages = [];
let timeout = null;

function updateTimeout(...args) {
  if(timeout) clearTimeout(timeout);
  timeout = setTimeout(...args);
}

module.exports.run = (client, message) => {
  if(message.channel.id !== config.id) return;
  if(message.attachments.size) return;
  if(message.embeds.length) return;
  if(message.content.startsWith('.')) return;

  messages.push(message);

  updateTimeout(() => {
    if(!messages.length) return;
    if(!message.deletable) return;
    if(message.deleted) return;
    
    message.channel.bulkDelete(messages);
  }, ms(config.timeout));
}

module.exports.name = 'message';

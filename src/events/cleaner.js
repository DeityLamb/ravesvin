const ms = require('ms');
const config = require('config').channels.content;

const messages = [];
let timeout = null;

function updateTimeout(...args) {
  if(timeout) clearTimeout(timeout);
  timeout = setTimeout(...args);
}

function chunk(array, size) {
  const arr = [];
  for(let i = 0; i < array.length; i += size) {
    const arrChunk = array.slice(i, size + i); 
    arr.push(arrChunk);
  }
  return arr;
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
    
    for(const msgs of chunk(messages, 100)) {
      message.channel.bulkDelete(msgs).catch(console.error);
    }
  }, ms(config.timeout));
}

module.exports.name = 'message';

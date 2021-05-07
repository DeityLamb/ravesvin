const {prefix} = require('config');

module.exports.run = async (client, message) => {
  if(!message.author) return;
  if(message.channel.type == 'dm') return;
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
  
  // mrage-disable-next-line
  const [ command, ...args ] = (message.content.slice(prefix.length).match(/"[^"]+"|\S+/g) || []).map(i => i.replace(/"/g,'').trim());
  const cmd = client.getCommand(command);
  if(!cmd)return;
  cmd.run(client, message, args);
}

module.exports.name = 'message';

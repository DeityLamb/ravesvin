const config = require('config');
const { prefix } = require('config');
const util = require('util');

function getType(item) {
 if(!(item ?? null)) return item + '';
 if(typeof item === 'function') return item.name;
 return item?.constructor?.name ?? item.name;
};

function clean(text) {
  if(typeof text !== 'string') return text.toString()
  return text.replace(/`|@/g, (c) => c + String.fromCharCode(8203));
}

module.exports.run = async function(client, message) { 
  if(!config.eval.includes(message.author.id)) return;

  try {
    const code = message.content.slice(`${prefix}eval`.length);
    let evaled = eval(code);

    if(evaled instanceof Promise) evaled = await evaled;

    const res = util.inspect(evaled, { depth: 1 }).toString();

    message.channel.send(
      'Type: ' + getType(evaled) + '\n' +
      'Result: ' + clean(res)
    , { code: "ts", split: true });

  } catch (err) {
    message.channel.send(clean(err), { code: 'ts' });
  }
};

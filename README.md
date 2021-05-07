
# RaveSvin - discord bot for the RaveLabs

<a href="https://discord.gg/QRqWZKzXfA"><img src="https://img.shields.io/discord/686982541697351768?color=7289da&logo=discord&logoColor=white" alt="Discord server" /></a>

## Deploy
```bash
$ npm install
```
Copy `config/default.json` to `config/production.json` <br>
Change next lines
```json
"token": "your discord bot token"
```
```json
"channels": {
  "content": {
    "id": "*ID of a channel for cute pictures or cooler videos*",
    "timeout": "*Time was reserved before bulk deleting*"
  }
}
```
```bash
$ npm run start
```
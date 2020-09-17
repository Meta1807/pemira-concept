// Reference: https://stackoverflow.com/questions/57095434/encrypt-decrypt-json-data-in-nodejs with alterations.

const RSA = require('node-rsa')
const encKey = new RSA
const key = require('./encryption/key.json')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const Math = require('math')


db.defaults({votes: []})
  .write()

var {nanoid} = require('nanoid')

encKey.importKey(key.public, 'pkcs8-public-pem')

// voteData will only consist of who the user voted for, without any identifying information.
// This encrypted data will be stored on a database and not associated with any users (kept on a separate table in db)
// To ensure that one person can only vote once, i propose that there should be a user table that keeps track of a user's vote state.
// On submission of vote, the user's vote state would be set to True in the user table, and the vote data will be pushed to the votes table.
// Example of the vote calculation code will be demonstrated in the vote-decryption script.

const voteData = {
    'vote': Math.floor(Math.random() * 2 + 1) // Generates a value of either 1 or 2 (for emulating voter choice)
}

const encrypted_data = encKey.encrypt(JSON.stringify(voteData), 'base64') // Encrypts vote data to ensure anonymity

db.get('votes').push({id: nanoid(), voteData: encrypted_data}).write() // Writes encrypted vote to JSON.






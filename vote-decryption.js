// Reference: https://stackoverflow.com/questions/57095434/encrypt-decrypt-json-data-in-nodejs with alterations.
// This is the code for decrypting and tallying up votes.
// This script relies on being supplied the private key for decryption.
// The decryption key will be kept secret by a random anonymous member of Pemira, and will only be used and revealed when
// it is time to tally up votes. To ensure that the system is trustable, the code will be published ahead of time in a public GitHub repo
// so all members of Fasilkom UI can review and validate it.

const RSA = require('node-rsa')
const encKey = new RSA
const key = require('./encryption/key.json')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
var {nanoid} = require('nanoid')

encKey.importKey(key.private, 'pkcs1-pem')

var votes = db.get('votes').value()
var trackVotes = {
    'Candidate 1': 0,
    'Candidate 2': 0
}

votes.forEach(item => {
    const decrypt = encKey.decrypt(item.voteData, 'utf-8')
    data = JSON.parse(decrypt)
    if (data.vote == 1) {
        trackVotes['Candidate 1']++
    }
    if (data.vote == 2) {
        trackVotes['Candidate 2']++
    }
})

console.log("----- FINAL TALLY OF VOTES: -----")
console.log(trackVotes)






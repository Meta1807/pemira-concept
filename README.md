# Konsep Voting System Pemira
By Adrian Ardizza

Repo ini merupakan kode saya yang digunakan untuk tugas khusus ide sistem voting online.
Dependency untuk demo projek ini:
  * node-rsa
  * lowdb (Placeholder untuk sistem database lain seperti MySQL)

## Why store votes as encrypted strings?
Menurut saya, salah satu unsur terpenting dari sebuah sistem pemilihan adalah asas Kerahasiaan. Asas Kerahasiaan wajib ditegakkan karena kerahasiaan suara melindungi pemilih dari aksi-aksi intimidasi ataupun pemaksaan dalam memilih.

Untuk itu, saya memanfaatkan RSA key-pair dalam konsep voting system yang saya buat. RSA key-pair merupakan sepasang key (public dan private) yang di gunakan untuk mengenkripsi data. Secara singkat, public key adalah key yang digunakan untuk mengenkripsi data yang akan di send ke server, dan private key adalah key yang digunakan untuk mendekripsi data yang telah dienkripsi oleh public key. 

**Tanpa private key, data yang telah di enkripsi oleh public key tidak akan dapat didekripsi (membutuhkan waktu ribuan tahun).**

Dengan memanfaatkan RSA key-pair, dapat dibuat sebuah voting system dimana vote seseorang tidak dapat ditentukan tanpa memiliki private key, dan tidak bisa di _tamper_ secara langsung.

## What does this code do exactly?
Takes in vote from user (emulated by a random number function for this code) -> Vote data gets sent from client to server -> Server encrypts the incoming JSON object -> Generates a random UUID/nanoid and stores it into database, this ensures that without private key no one will be able to see votes.

For decryption and tallying, the code only needs to get all vote data from the database, decrypt using the private key (will be kept secret), and tallies up the votes.

To ensure that a user can only vote once, the UI SSO system can be used to get data of user. The server will then store a "Vote State" value that will be set to True after a user has voted. This data will be kept on a separate table from the votes to ensure that the identity of a voter cannot be deduced.

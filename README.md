#Simple API using node express

##Install and run
####git clone
####compile typescript (tsc)
####npm install
`npm start`

##Usage
###base endpoint: localhost:3000/V1
All non search requests ie. everything but GET will return all addresses

###search: GET /address/(text fragment) note: when searching for single id, the more of the id you include, the better your chance of a single id being returned. Searching without a fragment will return the entire list of addresses
`http://localhost:3000/V1/address`

`http://localhost:3000/V1/address/suite 10`

###add: POST /address provide a valid address object in the body
`{line1: string, line2?: string, city: string, state: string, zip: string}`

`http://localhost:3000/V1/address`

####there is no validation for any of the data

###update: PUT /address/(id) provide a valid address object in the body
`{line1: string, line2?: string, city: string, state: string, zip: string}`

`http://localhost:3000/V1/address/54160dad56f2f046903af7412047b9f1dc1a4d1f5ce510781c772602d609fd1a`

###remove: DELETE /address/(id)
`http://localhost:3000/V1/address/54160dad56f2f046903af7412047b9f1dc1a4d1f5ce510781c772602d609fd1a`

###Paging: use a query string with s=group depth and p=number of addresses in a group
`http://localhost:3000/V1/address?s=2&p=3`
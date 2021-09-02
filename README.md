1. npm install
2. node server.js

APIs

CREATE USER - http://localhost:4000/api/user(POST)

GET USER - http://localhost:4000/api/user(GET)

CREATE PROPERTY - http://localhost:4000/api/user/property(POST)

GET PROPERTY - http://localhost:4000/api/noauth/property/list(GET)

UPDATE PROPERTY - http://localhost:4000/api/user/property/{propertyId}(PATCH)

CREATE RENTAL REQUEST - http://localhost:4000/api/user/rental_request(POST)

APPROVE RENTAL REQUEST - http://localhost:4000/api/user/rental_request/{rentalRequestId}(PATCH)

GET RENTAL REQUEST - http://localhost:4000/api/noauth/rental_request/list(GET)



# POC - Key server
The purpose of this project is to provide a Proof-Of-Concept for API request signing.

## Features
- provide endpoint where a user can request for a private and public key pair.
- saves public key for a user in its database.
- validates autheticated requests.

## Running

```
$ npm install
$ NODE_ENV=development PORT=9090 node server
```
## Steps

### Step 1: Getting certificates

Fire off a request that looks like the following.
```
$ curl --location --request POST 'http://localhost:9090/certificates' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "devs@mindwaveventures.com"
}'
```

The response will be text, which may look like

```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7DsAf1Cp2rvyt
BjIrlw+IvqTWZb/1n+6bhLadQ3cky2nxZXslh2nPttYtlWmQw5/1TP6MfRan7TeK
48qBACa1t6gD61EX/fi86Y0nm2XBw66394F3OiUDRfDcSAuKrUrKpJYBOEiv5VdO
IBybAPHGvL+sX2PsfeJORDPOtLSUL5+tKYyIWgpCS+GHHs3WqOG3MfHoB4fIimnZ
i1MkfNaM0IsmvSOu31EfpxpNDV3BXZW7QVDA7LqJDM1PH3gpQy8L1BjS6BPN+s4W
6ENlhd6rRZlk9NVAJ3fqpOcwfMdT63+rNCkYa+qY1ipQj2NsZ6wWOaHKwTu2njUT
AHKteAhJAgMBAAECggEAFEbFDK4y7CqLuTWyuoblaC1CMPtWk4mCk9kO8n0drR9f
nIsjji3fimSHUumfR9HsxOpTrWbhzdIo8yU+Dj219Hyz+bjIUZF2JQQsCN8PaLGN
fuOVZRcoa/Jo6XflyGKAePbeS8OOHYL+s7lHYIX5r1FGdajhbAE5RsKd2wo7iNRx
Ork9MkHy7Ve2tozX/l0aVmKVZlZKhJTbDMdSxInqi5toBOcc578apHCDlvwXtYC8
mj8EkIW/TeLRJ2I3S2q5PFKSomm9J9Esf81CmrAfUuXmdK4evk0C7ISR5i3bOWR8
SUK2B7m0fxWOQB+RxHt+3pU5iPWIAErTbbOX+1WAAQKBgQDl5Apf+YU01QZVVqt/
DDv0in5xAykcSEHKfgZA+Jo/1mnsg49WeuAif4pNrOZYee5g2jTIH5cPQE0x9PMs
u6cQAMJ5rlha7VQJzs28gZnyBAGPBrRp4J+jgTu8+QazmxmllX5k5KrVJn+mP552
Om5GnKo8py2+UuxMKftNhkSkwQKBgQDQTVtt35U5MzsF6NOmBshJ4LQ7YiQnplw9
R9Snp2RZ+RG7dIHqpk2CrYxdpxUxnjFv3uaFw47Bo8VoPvPWd+peNnaPZUTIY5gy
X2Q99ItGfZBjWzQwHWCUEYBI9uS6qv4LLM8pTbWwOp/WT93U1T52/EukoLoV+O0p
wY9RlpIdiQKBgQCvC9rShX5mYiZ2aI4hKUGlzKbGiq+M94ARHbDJXAKnxS3Wh75n
DR0JZ6/5wUOL7xwR51T1ZQhy9nVRKsDXOPPWfZ2XZaelZLzu0udZOB3uaBp/u404
aW9k4oyIMd5meB0pNhGN5Ygm0S+1eQ/B2nAJmFUP5gQwvZdrzzOpLimqgQKBgCaL
WfK/354BA9f5GEjtklxRTyh55ZTMrN7ODuSjDee0NfrI+U1RTqByurmNtFdFHYLE
7UUtRZpBUsMSew5hjCW40EGCjLLD8yLHEgaA3NDDZVdtRf/tP7TGdEWMIhEEmRO6
S+8pqQgeIPuINdUvTGq6Dsk80JJGSKRkY7/GK+15AoGAEtBNgvo0TSZQ5OLcJgRe
s8Fn42aWdnQvy/RK/GuBwG8lGar1Z85J1bAd4XQtqlK2ACoL3n8RHW5gb9Zoi+cE
mC7Liok+mvAvj2k5uNubmQ9xWY4RIT1BgbjjxGzvSjDdz1FQcHZVmN2yU1EZLyu2
ivChnHgcohrpEqyFh0DgL0s=
-----END PRIVATE KEY-----

-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuw7AH9Qqdq78rQYyK5cP
iL6k1mW/9Z/um4S2nUN3JMtp8WV7JYdpz7bWLZVpkMOf9Uz+jH0Wp+03iuPKgQAm
tbeoA+tRF/34vOmNJ5tlwcOut/eBdzolA0Xw3EgLiq1KyqSWAThIr+VXTiAcmwDx
xry/rF9j7H3iTkQzzrS0lC+frSmMiFoKQkvhhx7N1qjhtzHx6AeHyIpp2YtTJHzW
jNCLJr0jrt9RH6caTQ1dwV2Vu0FQwOy6iQzNTx94KUMvC9QY0ugTzfrOFuhDZYXe
q0WZZPTVQCd36qTnMHzHU+t/qzQpGGvqmNYqUI9jbGesFjmhysE7tp41EwByrXgI
SQIDAQAB
-----END PUBLIC KEY-----
```
The system only saves the public key to the database. You should
save the private key for later use.

### Step 2: Requesting authentication token

This is similar to our system generating a JWT for user session.

**Request**

```
$ curl --location --request POST 'http://localhost:9090/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "devs@mindwaveventures.com"
}'
```

**Response**

```json
{
  "data": {
    "token": "58551bf0-5757-4082-b33f-fbfdb36de56d"
  }
}
```

### Step 3: Signing a request payload and sending it with the token

In [make_signature_for_payload.js](examples/make_signature_for_payload.js),
replace the `privateKey` constant's value with your private key.

The file has an object called `messagePayload` that we'd be signing. You
may change it, if you'd like. For this demo we'll keep it as
```
{
  "message": "Hello world!"
}
```

Save and run the script

```
$ node examples/make_signature_for_payload.js
Using private key to sign message
Signature: 7c07efb164a70a68098964ff3c2659d65d1061dbdbe153e1031f861c65005e39678c5f2f45c0e351439ed1f8046b227b4f6c942fe64c41c04d5442efa4f2c62914253a8822e2c4ac6d38b5a3eddd29081fab5edaf989d2aff56096222cb33e29b9713637e24fef44f47cdcd34e882f75c57f0df46a8929fb9db7e0cb258d3e4bda7dcd15082c4408c10ce953e76b32e44bcc9c56ca2b7d4384f6e1a3351d8f25f7c5842066715d6578b9ac8e8f68faebfb5a719a3552a5bc7d812128b4b0522f7b513c20639046580d14cc1157e5c1bc1847619b56b66002efb89a0aa74d2bf0cd609a3a95a303bfe61783a2f69a7c5890ccc013d5cd28a795112ae6d74120ca
```

**Request**

```
$ curl --location --request POST 'http://localhost:9090/check' \
--header 'ks-x-signature: 7c07efb164a70a68098964ff3c2659d65d1061dbdbe153e1031f861c65005e39678c5f2f45c0e351439ed1f8046b227b4f6c942fe64c41c04d5442efa4f2c62914253a8822e2c4ac6d38b5a3eddd29081fab5edaf989d2aff56096222cb33e29b9713637e24fef44f47cdcd34e882f75c57f0df46a8929fb9db7e0cb258d3e4bda7dcd15082c4408c10ce953e76b32e44bcc9c56ca2b7d4384f6e1a3351d8f25f7c5842066715d6578b9ac8e8f68faebfb5a719a3552a5bc7d812128b4b0522f7b513c20639046580d14cc1157e5c1bc1847619b56b66002efb89a0aa74d2bf0cd609a3a95a303bfe61783a2f69a7c5890ccc013d5cd28a795112ae6d74120ca' \
--header 'ks-x-token: 58551bf0-5757-4082-b33f-fbfdb36de56d' \
--header 'Content-Type: application/json' \
--data-raw '{
    "message": "Hello world!"
}'
```

There are 2 headers to note here,
- `ks-x-signature` - holds the signature of the body payload with your private key.
- `ks-x-token` - authorization token from the previous step

**Response**

```
{
  "message": "All good! Signature verified with body payload",
  "user": "7e42501a-e704-4bc3-9b96-cdbdf8a03c28",
  "token": "58551bf0-5757-4082-b33f-fbfdb36de56d"
}
```

If either the body payload or the singature sent with the request
is faulty, the response would a 403 and will be like

```
{
  "message": "Request signature verification failed"
}
```

## Links

- Postman collection - https://www.getpostman.com/collections/929d231d6100cb02318c
- https://gist.github.com/MatthieuLemoine/ea7e5fa658d6a9ba69b6e098bb704dbc

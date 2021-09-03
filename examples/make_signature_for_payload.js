const crypto = require('crypto');

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDuOt8sXRriibB6
gF+cdNlxCJBqLjgUcl1T2zoOmBUcYW31syuucP7K+WbtF4yW85nNcFs7OR4IURpw
N5GYxipzsRnCrJGwChYy0QChjIkegPJe57pj/0q6imS8I8frB7pIwzmIcUNtw803
MoBqbH1j7cHn/V11Up3tGIIrKU9TxT29j8mUlJ18hgE/p9+q6Vlz4+bNbzlPkS6C
w4nXj68/rYiKTwS4lTtHsMGX92VYMl5TC+R+/+1np/Fzx72wY0jqSXy9Qee2eg5L
Vp/VTT6r8riNaDpxTNtVKr5aYntjeL1CFqhG/MMdneTid+pxAuHSGehofUVgxuZ1
nsJLjk3LAgMBAAECggEBAM+Po5p3lFEEPiq9ZpBejoUZPRoGIv5NllrViwPkJaCQ
ksmbzdcyxAv8uFyiQ+/RVpPT7OjwnuYII8zZ3ZUKMzqRdyxSRqzmXOjxiGc4ls9o
8cMWiyNM7sMQiSwS0MBJ/1geICZs6J7eFhKdgZ034RgLswJ5kdACp25ICEGqwF7u
sMLmnpdqXf/L7saFRFcQCZL5sfOnjExwgovcRR5b61fhbUp/oUG+yO68PBAJZtqt
Wq59764zGd/Ye4OW+zS04YHpVd9bJ367Sm+v6HKrjwzewb/N6W9AXSZvTK9Rg/fL
4VLEygZalmnltlx1RiEP5hPfpPq2ZZpPsRBV1Vz6jMECgYEA930ixdtoYWFV+PxK
MuKCWFylFB+S2mddZDz+ka46+GvuUDFANXzIJplusLvMzBqgiC6NZA7hMjHxoKjM
ZBkUpTrG8U2bPtz0h8CdoPUjBTZNi2Fj93cCP4yAl1rB8LO6tBNqJUE1ztu4sNZt
dvNYySoZJnRk+Ik3DBBx3gdSnMkCgYEA9mw4231Of9AuaB/W7ZfD4PVfVQgGAy1w
kjX+R8GZZEMulOKDfFIzJV6zNqBsa1k0RYckrmaaVAscEqc2GvgFmr4BXvncCN/3
Ey46tShY1/1EjqWNm745aJbX8Lz1Z/GKdEl0/H1ay0b85GmsSfbnRWtO9ipGUORO
itMKZeUUI/MCgYAIWH3tsiJo9kFR7iAKazz+AdHHRfFL0CSEFtJ20ytF6U3WAnMp
2pVdR9tFtm+HinZTYU5/S0koyipdwpNx5K6fi8XdqUJM8mKEmWg3X0zZBiXDR3t5
gtfekLxdXkAf/8+R9v2jV/maiipGPFTgqAAceID0nQQypV3n2D4ewJx2kQKBgQDP
TKNYIcXTx/ICLibEoRNrP3//LEzCh4tXtIxBGSBNNCcPoK4z+4KDQXNJ1RLgC57p
jpLRFAdoBCCNoJTngxZT4tuMZm0wGhjjzdQdad+zc6Ak0CiciB4LWjo2jv9zfcKX
qOP9NAcZUpKUJEGHx2kvAOLgOxgEHMvmBTuOFHQo+QKBgHEaR0mK7nEwFsM89gtn
HTFV8/Qcqa43Ip9Z1gILS4m0gAOoj2K5+8lz8bXDWnJy+gjPPNtqLW9+dC5JMi8W
nLw7qaIzzKD7wFynK6xmjgBHy2jv03WdFIO+vfqrm2AgVKzFBX5wSW/Dr46joV+K
FvQXUkZJkFNcXD0SCuOZ2C+r
-----END PRIVATE KEY-----`

const messagePayload = {
  message: 'Hello world!',
}

const messagePayloadString = JSON.stringify(messagePayload);

console.log('Using private key to sign message')
const signer = crypto.createSign('RSA-SHA512');
signer.update(messagePayloadString);
const signature = signer.sign(privateKey, 'hex');

console.log('Signature:', signature)



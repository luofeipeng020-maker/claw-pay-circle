const crypto = require('crypto');

const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAyqvGuhhmUj49Ozg8f6n+
8FvuZl/hcL7fFJtCQ2tHU3NPjZaOy1uvRUOBRlouQcacLzjmXFyZ/y7vXZpUbVNs
U88ZqTK6oUOtNkGUefde+pNQF7D9xU//aydQllvTh4ZIJMQum16JQeWPQDUznwIZ
sAOMCmvejnVh8vLTIWUgmj/XSxqu2qN0QQXm3sfPlt7Ak9Fgz0myWf8Cb0GCi2Fx
EMEprBdzWnLIkROSrlNDjKCX0WZf+pxHevnis3nDjv+z13z52g2V83Xoz5MAz/eL
Q6J7fxELSMOQrq0JgwUUEfkFO0ivqfUJZ8GQkyWopmeF8cefj1UwXGuT9FHtYkjI
x7IU6yqOyvZimnku2DzXhwKjcKVWTH1oN309ZvcMAdFWgDg+KCfKgGSbwWkqOxX+
AXDT5nNsPTTOPKPvl4C79Mncaphu+2hb9UDUzhfEvISCrfnNmbf7LC0TtCWbNzYX
LJ7Jg/S+Pq6MJOwEAjCRB4vsAAH+hjw9nHirXmH+NQqCwRLSp8ethwwRhMvO6DYx
NRN+QtJs5LHiHfixS3mGQ7oPkqnqu2I7apnutm7BYnSvn/0LvyY+C/onbQjz+Gtp
8wPkAbBNFpz0s/Cw/Of7+paEn5snKmVC6Lik1EY/i3OWuNjliaUOjuM0sDI72G7f
PW6PzAauJTDgxKq8bi4nut8CAwEAAQ==
-----END PUBLIC KEY-----`;

const entitySecretHex = process.env.CIRCLE_ENTITY_SECRET || '';
const entitySecret = Buffer.from(entitySecretHex, 'hex');

if (entitySecret.length !== 32) {
  console.error("Entity Secret must be 32 bytes (64 hex characters)");
  process.exit(1);
}

const encrypted = crypto.publicEncrypt(
  {
    key: publicKeyPem,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256',
  },
  entitySecret
);

console.log(encrypted.toString('base64'));

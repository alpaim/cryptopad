# Cryptopad

Cryptopad is an Open-Source, client-only cryptographic tool that helps you to Encrypt and Decrypt text.

> [!CAUTION]
> Please, read this segment carefully

## Is it secure?

This tool was developed solely for educational purposes to study and practice encryption implementation. While it implements E2EE (End-to-End Encryption) and **DOES NOT** store any data, it should **NOT** be used for:

    Production environments
    Sensitive communications
    Real-world security purposes
    Any situation requiring genuine privacy protection

This project has not undergone security audits and may contain vulnerabilities. It serves as a learning tool and demonstration of encryption concepts only.

If you need secure communication, please use well-established and properly audited messaging applications.

**USE AT YOUR OWN RISK**

## Features

- End-to-End Encryption
- Client Only

## Building

This project has default `Vite` build config, just use `npm run build` to build (or any other package manager).

## Developing

Same for building, developing process doesn't differ from the most of `Vite` apps. Just install dependencies and run
development script.

## Deploying

Checkout `Dockerfile` and `docker-compose.yml`

```yaml
version: '3.8'

services:
  cryptopad:
    container_name: cryptopad
    image: ghcr.io/alpaim/cryptopad:latest
    ports:
      - "80:80"
    networks:
      - cryptopadNetwork

networks:
  cryptopadNetwork:
    name: cryptopadNetwork
```
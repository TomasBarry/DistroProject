#!/bin/bash

openssl genrsa -out privkey.pem 2048

openssl rsa -in privkey.pem -pubout -out pubkey.pem

#!/bin/bash

stack build && stack exec client 10.62.0.250 8000 10.62.0.248 8000

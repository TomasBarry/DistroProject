#!/bin/bash

stack build && stack exec client 10.62.0.117 3002 10.62.0.117 3001

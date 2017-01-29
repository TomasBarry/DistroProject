# CS4032 Distributed Systems Project

## Overview
We were tasked with building a distributed file server. This file server was to be secure and capable of handling multiple clients and replica file servers. A number of challenges were presented by this project however by tackling the project methodically the entire system could be developed.

Consider the following description of how files are exchanged by the server:
A Client registers with the Auth server. If a client wants a file `a.txt` then it encrypts a message using it's private key and sends that message to the directory server. The directory server requests the public key for that user so it can interpret the message. The directory server decides what File server should handle the request and forwards the original (encrypted) request to the chosen file server. The file server decrypts the message and sends back `a.txt` encrypted with the users public key.

This ensures that only the appropriate individuals in the system can decode messages and no malicious third party can see what a user is doing.

## Development
The development procedure was as follows:

1. Map out the system on paper and how each services is conneced
2. Define the messages that would be passed between services
3. Establish languages and tools to be used in the project as well as research packages provided by those languages
4. Prepare VMs for development
  * Install language dependencies etc
5. Write each service independently
6. Connect services and test
7. Test entire system and fix bugs
8. Enhance system after analysis

Each of these steps took a considerable amount of time to review and test, but the time spent mapping the communications for example paid off in later stages as many of the problems faced in later stages had already been solved on paper.

The format of this README is a description of how each service acts from the point of view of a service

## The Client
A client can do 3 things:

1. Register with the Auth server 
2. Request a file from the Directory server
3. Upload a file to the file system

The client generates a public/private key pair and a username. To register with the system, the client provides the username and public key to the Auth server. Only after registering with the system can the client act in the system. The client can request a file and upload a file.

## The Auth Server
The Auth server is used to control access to files in the system as well as allowing secure transmission of files/requests. The Auth server a document in a MongoDB database for each user in the system. When one service wishes to talk to another service, the auth server will be asked for the public key of the destination service so that only the intended recipient of a message can read the message.

## The File Server
Can be any number of File Servers in the system. The more File Servers there are, the more resilliant to failure the system is. File Servers hold files in the system. Files are replicated across more than one File Server to keep system stability. Only a single File Server can be the holder of the write version of a file while every other File Server can hold a read version of a file.

## The Directory Server
Clients do not know where the File Servers are. They must ask the Directory Server which can act as a load balancer for the system. The Directory Server relays information between Client and File Server and controls the communication between File Servers as well as replication.

## Features
1. Distributed Transparent File Access (the system)
2. Security Service (Auth Server)
3. Directory Service (Directory Server)
4. Replication (Directory Server and File Server)
5. Caching (Client)
6. Transactions (the system)
7. Lock Service (Directory Server)
8. Election for master file server (Directory Server and File Server)

## Languages
1. The client is written in Haskell
2. All other servers are written in NodeJS
3. Bash scripts are spread across the project to build and test the services
4. Dockerfiles are used to put the services into Docker containers

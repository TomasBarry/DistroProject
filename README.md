# CS4032 Distributed Systems Project

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

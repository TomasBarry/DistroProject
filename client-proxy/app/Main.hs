module Main where

import System.Environment (getArgs)
import qualified Network.Socket as Socket
import qualified Network.Socket.ByteString as BS
import qualified Data.ByteString.Char8 as C
import qualified Data.ByteString as B


type Address = String
type Port = String
data Server = Server (Address, Port)


directoryServer :: Address -> Port -> Server
directoryServer ip port = Server (ip, port)


printUsageInstructions :: IO ()
printUsageInstructions = do
    Prelude.putStrLn "What is your command?"
    Prelude.putStrLn "You can either get or put a file"
    Prelude.putStrLn "GET:<FILE NAME>"
    Prelude.putStrLn "PUT:<FILE_NAME>:<FILE_CONTENTS>"


setupClientSocket :: String -> String -> IO Socket.Socket
setupClientSocket ip port = do
    addr:_ <- Socket.getAddrInfo Nothing (Just ip) (Just port)
    Socket.socket (Socket.addrFamily addr) (Socket.addrSocketType addr) (Socket.addrProtocol addr)


connectToRemoteSocket :: Socket.Socket -> String -> String -> IO ()
connectToRemoteSocket socket ip port = do
    let Server (a, p) = directoryServer ip port
    addr:_ <- Socket.getAddrInfo Nothing (Just a) (Just p)
    Socket.connect socket (Socket.addrAddress addr)

readSock :: Socket.Socket -> Int -> IO [B.ByteString] -> IO B.ByteString 
readSock _ 0 bytes = fmap B.concat bytes
readSock socket _ message = do
    msg <- BS.recv socket 4096
    readSock socket 0 $ message >>= (\p -> return(p ++ [msg]))


main :: IO ()
main = do
    [lip, lport, rip, rport] <- getArgs
    socket <- setupClientSocket lip lport
    connectToRemoteSocket socket rip rport
    printUsageInstructions
    putStrLn "Your command:"
    command <- getLine
    putStrLn command
    BS.sendAll socket $ C.pack command
    response <-  readSock socket 1 (return [])
    re <- return $ C.unpack response 
    writeFile "responsefile.txt" re
    Socket.close socket


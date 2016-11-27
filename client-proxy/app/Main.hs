module Main where

import System.Environment (getArgs)
import qualified Network.Socket as Socket
import qualified Network.Socket.ByteString as BS
import qualified Data.ByteString.Char8 as C

data Address = Address String
data Port = Port String
data Server = Server (Address, Port)


directoryServer :: String -> String -> Server
directoryServer ip port = Server (Address ip, Port port)


printUsageInstructions :: IO ()
printUsageInstructions = do
    Prelude.putStrLn "What is your command?"
    Prelude.putStrLn "You can either get or put a file"
    Prelude.putStrLn "GET <FILE NAME>"
    Prelude.putStrLn "PUT <FILE_NAME>"


setupClientSocket :: String -> String -> IO Socket.Socket
setupClientSocket ip port = do
    addr:_ <- Socket.getAddrInfo Nothing (Just ip) (Just port)
    Socket.socket (Socket.addrFamily addr) (Socket.addrSocketType addr) (Socket.addrProtocol addr)


connectToRemoteSocket :: Socket.Socket -> String -> String -> IO ()
connectToRemoteSocket socket ip port = do
    let Server (Address a, Port p) = directoryServer ip port
    addr:_ <- Socket.getAddrInfo Nothing (Just a) (Just p)
    Socket.connect socket (Socket.addrAddress addr)


main :: IO ()
main = do
    [lip, lport, rip, rport] <- getArgs
    socket <- setupClientSocket lip lport
    connectToRemoteSocket socket rip rport
    printUsageInstructions
    command <- getLine
    BS.sendAll socket $ C.pack command
    Socket.close socket


module Main where


import qualified Network.Socket as Socket
import qualified Network.Socket.ByteString as BS
import qualified Data.ByteString.Char8 as C

data Address = Address String
data Port = Port String
data Server = Server (Address, Port)


directoryServer :: Server
directoryServer = Server (Address "10.62.0.117", Port "3001")


printUsageInstructions :: IO ()
printUsageInstructions = do
    Prelude.putStrLn "What is your command?"
    Prelude.putStrLn "You can either get or put a file"
    Prelude.putStrLn "GET <FILE NAME>"
    Prelude.putStrLn "PUT <FILE_NAME>"


setupClientSocket :: IO Socket.Socket
setupClientSocket = do
    addr:_ <- Socket.getAddrInfo Nothing (Just "10.62.0.117") (Just "3002")
    Socket.socket (Socket.addrFamily addr) (Socket.addrSocketType addr) (Socket.addrProtocol addr)


connectToRemoteSocket :: Socket.Socket -> IO ()
connectToRemoteSocket socket = do
    let Server (Address a, Port p) = directoryServer
    addr:_ <- Socket.getAddrInfo Nothing (Just a) (Just p)
    Socket.connect socket (Socket.addrAddress addr)


main :: IO ()
main = do
    socket <- setupClientSocket
    connectToRemoteSocket socket
    printUsageInstructions
    command <- getLine
    BS.sendAll socket $ C.pack command
    Socket.close socket

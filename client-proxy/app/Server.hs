module Server (
    Server(..)
)

where

import Address
import Port

data Server = Server (Address, Port)

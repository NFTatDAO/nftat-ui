import './App.css'
import { useEffect, useState } from "react"
import { ChainId, DAppProvider } from "@usedapp/core"
import { Main } from "./components/Main"
import React from "react"
import { useEthers } from "@usedapp/core"



function App() {

  return (
    <DAppProvider config={{
      supportedChains: [ChainId.Rinkeby, ChainId.Polygon],
      notifications: {
        expirationPeriod: 1000,
        checkInterval: 1000
      }
    }}>
      <Main />
    </DAppProvider>
  )
}

export default App

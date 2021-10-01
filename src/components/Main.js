import { useEthers } from "@usedapp/core"
import { Navbar } from "./Navbar"
import { Container } from '@mui/material'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ChangeColor } from '../pages/ChangeColor'
import { Nftatpixels } from '../pages/Nftatpixels'
import { NftatVote } from '../pages/NftatVote'
import { ViewNftat } from '../pages/ViewNftat'
import { MoralisProvider } from 'react-moralis'


export const Main = () => {
    const { account } = useEthers()
    let isConnected = account !== undefined

    return (
        <BrowserRouter>
            <Navbar />
            <MoralisProvider appId={process.env.REACT_APP_MORALIS_APP_ID}
                serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}>
                <Container maxWidth="md">
                    <div className="container mt-2" style={{ marginTop: 40 }}>
                        {isConnected ?
                            <Switch>
                                <Route exact path="/">
                                    <ViewNftat />
                                </Route>
                                <Route exact path="/ViewNftat">
                                    <ViewNftat />
                                </Route>
                                <Route path="/ChangeColor">
                                    <ChangeColor />
                                </Route>
                                <Route path="/Nftatpixels">
                                    <Nftatpixels />
                                </Route>
                                <Route path="/NftatVote">
                                    <NftatVote />
                                </Route>
                            </Switch> : <div><div>Please connect your wallet to polygon or rinkeby. </div><div>Note: Rinkeby is... eehhhhhh at the moment. </div></div>}
                    </div>
                </Container>
            </MoralisProvider>
        </BrowserRouter>
    )
}

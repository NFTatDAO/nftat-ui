import { useEthers } from "@usedapp/core"
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from "react"
import { NFTatPixelList } from "../components/NFTatPixelList"
import helperConfig from "../helper-config.json"
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from 'react-moralis'
import networkMapping from "../chain-info/deployments/map.json"
import { utils, constants } from "ethers"


const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: "center",
        padding: 4,
    },
}))

export const ChangeColor = () => {
    const classes = useStyles()
    const Web3Api = useMoralisWeb3Api()
    const [openseaUrl, setOpenseaUrl] = useState(null)
    const { chainId, account } = useEthers()
    const networkName = chainId ? helperConfig[String(chainId)] : "dev"

    useEffect(() => {
        if (String(chainId) == "4") {
            setOpenseaUrl("https://testnets.opensea.io/assets/")
        } else {
            setOpenseaUrl("https://opensea.io/assets/matic/")
        }
    }, [chainId])

    const nftatPixelAddress = chainId ? networkMapping[String(chainId)]["NFTatPixel"][0] : constants.AddressZero


    const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(Web3Api.account.getNFTsForContract,
        { chain: networkName, address: account, token_address: nftatPixelAddress }
    )
    // console.log(data)
    return (
        <div>
            <h1 className={classes.title}>Change Color</h1>
            <p>Here, you can change the color of the pixels that you own. </p>
            <p>"transparent" will make it transparent. If you're using the background pixel, "grayscale" will make the whole tattoo grayscale. </p>
            {data ? <NFTatPixelList nftpixelData={data} openseaUrl={openseaUrl} nftatpixelAddress={nftatPixelAddress} /> : <div>Loading...</div>}
        </div >
    )
}

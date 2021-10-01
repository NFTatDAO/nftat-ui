import { useEthers } from "@usedapp/core"
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from "react"
import networkMapping from "../chain-info/deployments/map.json"
import { utils, constants } from "ethers"
import { Box, ImageList, ImageListItem, Input, CircularProgress, Button } from '@mui/material'
import opensea from '../img/opensea.png'



const useStyles = makeStyles((theme) => ({
    pixelImg: {
        textAlign: "center",
        padding: 4,
        cursor: "pointer"
    }
}))

export const Nftatpixels = () => {
    const { chainId, account } = useEthers()
    const classes = useStyles()
    const [openseaUrl, setOpenseaUrl] = useState(null)


    useEffect(() => {
        if (String(chainId) == "4") {
            setOpenseaUrl("https://testnets.opensea.io/collection/nftatpixel-v3?search[sortAscending]=true&search[sortBy]=CREATED_DATE")
        } else {
            setOpenseaUrl("https://opensea.io/collection/nftatpixel?search[sortAscending]=true&search[sortBy]=CREATED_DATE")
        }
    }, [chainId])

    const nftatPixelAddress = chainId ? networkMapping[String(chainId)]["NFTatPixel"][0] : constants.AddressZero

    return (
        <div>
            <h1>View all the Pixels on Opensea!</h1>
            <Box className={classes.title}>
                <a href={`${openseaUrl}`}
                    target="_blank" rel="noreferrer">
                    <Button
                        sx={{ fontSize: 32 }}
                        color="secondary"
                        variant='contained'>
                        View on Opensea! &nbsp;
                        <img src={opensea} alt="" className={classes.openseaImg} />
                    </Button>
                </a>
            </Box >
        </div>
    )
}

import { useEthers } from "@usedapp/core"
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from "react"
import networkMapping from "../chain-info/deployments/map.json"
import { utils, constants } from "ethers"
import { Box, ImageList, ImageListItem, Input, CircularProgress, Button } from '@mui/material'
import snapshot from '../img/snapshot.jpeg'



const useStyles = makeStyles((theme) => ({
    pixelImg: {
        textAlign: "center",
        padding: 4,
        cursor: "pointer"
    }
}))

export const NftatVote = () => {
    const { chainId, account } = useEthers()
    const classes = useStyles()
    const snapshotURL = "https://snapshot.org/#/nftat.eth"

    const NFTatTokenAddress = chainId ? networkMapping[String(chainId)]["NFTatToken"][0] : constants.AddressZero


    return (
        <div>
            <h1>Vote!</h1>
            <p>Did Patrick actually stake? Yes? No? Vote on whether or not he did to give him his stake back!</p>
            <p> NOTE: This is only for mainnets at the moment. </p>
            <p> Address of governance token: <a href={`https://polygonscan.com/address/${NFTatTokenAddress}`}>{NFTatTokenAddress}</a></p>
            <Box className={classes.title}>
                <a href={`${snapshotURL}`}
                    target="_blank" rel="noreferrer">
                    <Button
                        sx={{ fontSize: 32 }}
                        color="secondary"
                        variant='contained'>
                        Bring me to snapshot voting! &nbsp;
                        <img src={snapshot} alt="" className={classes.openseaImg} />
                    </Button>
                </a>
            </Box >
        </div>
    )
}

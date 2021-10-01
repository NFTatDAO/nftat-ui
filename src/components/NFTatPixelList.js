import { Box, ImageList, ImageListItem, Input, CircularProgress } from '@mui/material'
import { useEthers } from "@usedapp/core"
import { makeStyles } from '@mui/styles'
import { ethers } from "ethers"
import { Contract } from "@ethersproject/contracts"
import NFTatPixel from "../chain-info/contracts/NFTatPixel.json"
import { useEffect, useState } from "react"
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import InfoIcon from '@mui/icons-material/Info'
import { Button } from '@mui/material'
import { useChangeColor } from "../hooks"
import { LocalConvenienceStoreOutlined } from '@mui/icons-material'




const useStyles = makeStyles((theme) => ({
    pixelImg: {
        textAlign: "center",
        padding: 4,
        cursor: "pointer"
    }
}))

function refreshPage() {
    window.location.reload(false)
}

export const NFTatPixelList = ({ nftpixelData, openseaUrl, nftatpixelAddress }) => {
    const { chainId, account } = useEthers()
    const classes = useStyles()
    const { abi } = NFTatPixel
    const [pixelsList, updatePixelsList] = useState([])
    const [color, setColor] = useState("")

    useEffect(() => {
        const getPixelList = async (address, abi) => {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const nftatPixel = new Contract(address, abi, provider)
            let listOfPixels = []
            for (let i = 0; i < nftpixelData.result.length; i++) {
                console.log(nftpixelData.result[i])
                const tokenURI = nftpixelData.result[i]["token_uri"]
                let tokenMetadata = nftpixelData.result[i]["metadata"]
                const tokenMetadataJson = JSON.parse(tokenMetadata)
                const image = tokenMetadataJson["image"]
                console.log(tokenMetadataJson)
                listOfPixels.push({ "image": image, "token_id": nftpixelData.result[i]["token_id"], "xLocation": tokenMetadataJson["attributes"][0]["value"], "yLocation": tokenMetadataJson["attributes"][1]["value"] })
            }
            updatePixelsList(listOfPixels)
        }
        getPixelList(nftatpixelAddress, abi)
    }, [chainId, account, nftpixelData, abi, nftatpixelAddress])

    const { changeColor, changeColorState } = useChangeColor(nftatpixelAddress)
    const isMining = changeColorState.status === "Mining"

    const [txSuccess, setTxSuccess] = useState(false)
    useEffect(() => {
        if (changeColorState.status === true) {
            setTxSuccess(true)
            refreshPage()
        }
    }, [changeColorState.status, changeColorState, isMining])

    const handleInputChange = (event) => {
        const newColor = event.target.value === "" ? "" : event.target.value
        setColor(newColor)
        console.log(newColor)
    }

    const handleChangeSubmit = (token_id) => {
        return changeColor(token_id, color)
    }


    return (
        <div>
            <Input
                onChange={handleInputChange}
                placeholder="new color or hex color. ie: #fcba03 or blue"
                fullWidth={true}
                className={classes.input}
                type="string"
            />
            {isMining ? <div><CircularProgress size={26} />Changing!</div> : ""}
            {
                pixelsList.length && nftpixelData.result.length > 0 ?
                    <ImageList cols={3} rowHeight={270}>
                        {pixelsList.map(pixel => (
                            // <a href={`${openseaUrl}${String(nftatpixelAddress)}/${pixel.token_id}`} target="_blank" rel="noreferrer">
                            <ImageListItem className={classes.pixelImg} key={pixel.token_id} sx={{ padding: 1, }} onClick={() => handleChangeSubmit(pixel.token_id)}>
                                <img
                                    src={`${pixel.image}`}
                                    alt="nftatpixel"
                                    loading="lazy"
                                    key={pixel.token_id} />
                                <ImageListItemBar
                                    title={`Token ID: ${pixel.token_id}, X: ${pixel.xLocation}, Y: ${pixel.yLocation}`}
                                    subtitle="Click Me to Change Color"
                                    position="bottom"
                                    actionIcon={
                                        <IconButton
                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                            aria-label={`Change Color`}
                                        >
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                                {/* <Button color="primary" variant="contained">Hi</Button> */}
                            </ImageListItem>
                            // </a>
                        ))}
                    </ImageList >
                    : nftpixelData.result.length > 0 ? <div>Loading...</div> : <Box>No pixels found for this address. <br /> Maybe hit refresh?</Box>
            }
        </div >
    )

}

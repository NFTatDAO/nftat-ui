import NFTatPixel from "../chain-info/contracts/NFTatPixel.json"
import networkMapping from "../chain-info/deployments/map.json"
import React, { useState, useEffect } from "react"
import { utils } from "ethers"
import { Contract } from "@ethersproject/contracts"
import { useContractFunction, useEthers } from "@usedapp/core"


export const useChangeColor = (nftatPixelAddress) => {
    const { abi } = NFTatPixel
    const nftatPixelnterface = new utils.Interface(abi)

    const contract = new Contract(
        nftatPixelAddress,
        nftatPixelnterface
    )

    const { send: changeColor, state: changeColorState } =
        useContractFunction(contract, "changeColor", {
            transactionName: "ChangeColor",
        })

    // const changeColor = async (token_id, color) => {
    //     try {
    //         setChangeColorState({ status: "Mining" })
    //         let tx = await contract.methods.changeColor(token_id, color).send({ from: web3.eth.currentProvider.selectedAddress })
    //         setChangeColorState({ status: tx.status })
    //         console.log(tx)
    //     } catch (e) {
    //         setChangeColorState({ status: null })
    //         console.log(e)
    //     }
    // }
    return { changeColor, changeColorState }
}

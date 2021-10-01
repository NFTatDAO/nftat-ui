import { useEthers } from "@usedapp/core"
import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { NavLink } from "react-router-dom"
import React, { useState } from "react"
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import banner from '../img/banner.png'

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 15,
        display: "flex",
        justifyContent: "flex-end",
        gap: 1
    },
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        padding: 15,
        backgroundImage: `url(${banner})`,
        alignItems: "center",
        fontSize: "1.2rem",
    },
    navbarText: {
        textDecoration: "none"
    }
}))

export const Navbar = () => {
    const classes = useStyles()
    const { account, activateBrowserWallet } = useEthers()
    const isConnected = account !== undefined


    return (
        <nav
            role="navigation"
            aria-label="main navigation">
            <AppBar position="static">
                <Toolbar className={classes.navbar}>
                    <NavLink underline="hover"
                        activeClassName="is-active"
                        to="/ViewNftat"
                        className={classes.navbarText}
                        activeStyle={{
                            fontWeight: "bold",
                            color: "black"
                        }}>
                        NFTat DAO
                    </NavLink>

                    <NavLink
                        activeClassName="is-active"
                        underline="hover"
                        to="/ChangeColor"
                        className={classes.navbarText}
                        activeStyle={{
                            fontWeight: "bold",
                            color: "black"
                        }}
                    >
                        Change NFTatPixel Color
                    </NavLink>

                    <NavLink
                        activeClassName="is-active"
                        underline="hover"
                        to="/Nftatpixels"
                        className={classes.navbarText}
                        activeStyle={{
                            fontWeight: "bold",
                            color: "black"
                        }}
                    >
                        NFTat Pixels
                    </NavLink>

                    <NavLink
                        activeClassName="is-active"
                        underline="hover"
                        to="/NFTatVote"
                        className={classes.navbarText}
                        activeStyle={{
                            fontWeight: "bold",
                            color: "black"
                        }}
                    >
                        NFTat Vote
                    </NavLink>
                    <div className={classes.container}>
                        {isConnected ? (
                            <>
                                <Button color="primary" variant="contained">
                                    {`${account?.slice(0, 4)}...${account?.slice(-3)}`}
                                </Button>
                            </>
                        ) : (
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => activateBrowserWallet()}
                            >
                                Connect
                            </Button>
                        )}
                    </div>
                </Toolbar>
            </AppBar>




        </nav>
    )
}

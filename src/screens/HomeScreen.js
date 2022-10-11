import { CatchingPokemon, Search } from "@mui/icons-material";
import { Grid, IconButton, InputBase, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { useState } from "react";
import styled from "styled-components";

const ItemHome = styled(Paper)(({ theme }) => ({
    border: "none",
    outline: "none",
    width: "100%",
    height: "9rem",
    display: "flex",
    alignItems: "flex-end",
    backgroundColor: "#5dbe62",
    borderRadius: "1.2rem",
    padding: "1rem",
}));

const TitleCard = styled(Typography)(({ theme }) => ({
    fontSize: "2.4rem !important",
    color: "#ffffff",
    fontWeight: "800 !important",
}));

export default function HomeScreen() {
    const[pokemonSearched, setPokemonSearched]=useState("");
    const navigate = useNavigate();
    const searchPokemonHandler = ()=>{
        console.log(pokemonSearched);
        navigate(`/search-pokemon:${pokemonSearched}`);
    }
    return (
        <Container
            sx={{ backgroundColor: "#424242", height: "100vh", minWidth: "100vw", display:"flex", justifyContent:"center", alignItems:"flex-start" }}
        >
            <Grid
                container
                spacing={2}
                sx={{ maxWidth: "1000px" }}
            >
                <Grid item xs={12} justifySelf="center">
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 600,
                            color: "#ffffff",
                            margin:"2rem",
                        }}
                    >
                        What are you looking for?
                    </Typography>

                    <Paper
                        onSubmit={(e)=>e.preventDefault}
                        elevation={4}
                        
                        sx={{
                            borderRadius: "3rem",
                            padding: ".8rem .8rem",
                            display: "flex",
                            color: "#ffff",
                            backgroundColor: "#212121",
                            marginBottom:"2rem",
                        }}
                    >
                        <IconButton color="inherit" size="medium">
                            <CatchingPokemon />
                        </IconButton>
                        <InputBase
                            value={pokemonSearched}
                            onChange={(e)=>{setPokemonSearched(e.target.value)}}
                            placeholder="Search pokemons, items e etc"
                            fullWidth
                            sx={{ fontSize: "1.4rem", color: "#ffffff" }}
                        />
                        <IconButton type="button" color="inherit" onClick={searchPokemonHandler}>
                            <Search />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={12} justifySelf="center">
                    <ItemHome
                        elevation={6}
                        component="button"
                        sx={{ backgroundColor: "#5dbe62" }}
                    >
                        <TitleCard>Pokemon</TitleCard>
                    </ItemHome>
                </Grid>
                <Grid item xs={6}>
                    <ItemHome
                        elevation={6}
                        component="button"
                        sx={{ backgroundColor: "#f7776a" }}
                    >
                        <TitleCard>Items</TitleCard>
                    </ItemHome>
                </Grid>
                <Grid item xs={6}>
                    <ItemHome
                        elevation={6}
                        component="button"
                        sx={{ backgroundColor: "#58a9f4" }}
                    >
                        <TitleCard>Moves</TitleCard>
                    </ItemHome>
                </Grid>
                <Grid item xs={6}>
                    <ItemHome
                        elevation={6}
                        component="button"
                        sx={{ backgroundColor: "#ffce4b" }}
                    >
                        <TitleCard>Types</TitleCard>
                    </ItemHome>
                </Grid>
                <Grid item xs={6}>
                    <ItemHome
                        elevation={6}
                        component="button"
                        sx={{ backgroundColor: "#b862cf" }}
                    >
                        <TitleCard>Favorite</TitleCard>
                    </ItemHome>
                </Grid>
            </Grid>
        </Container>
    );
}

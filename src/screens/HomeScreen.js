import { CatchingPokemon, Search } from "@mui/icons-material";
import { Grid, IconButton, InputBase, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";

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
    /*const[pokemonSearched, setPokemonSearched]=useState("");
    const navigate = useNavigate();
    const searchPokemonHandler = ()=>{
        console.log(pokemonSearched);
        navigate(`/search-pokemon:${pokemonSearched}`);
    }*/
    return (
        <Container
            sx={{ backgroundColor: "#29304f", height: "100vh", minWidth: "100vw", display:"flex", justifyContent:"center", alignItems:"center" }}
        >
            <Grid
                container
                spacing={2}
                sx={{ maxWidth: "1000px" }}
            >
                <Grid item xs={12} justifySelf="center">
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 600,
                            color: "#ffffff",
                            margin:"2rem",
                        }}
                    >
                        What Pokémon are you looking for?
                    </Typography>
                    <SearchBar/>
                </Grid>
                
            </Grid>
        </Container>
    );
}

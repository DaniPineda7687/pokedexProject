import { CatchingPokemon, Search } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function SearchBar(){
    const[pokemonSearched, setPokemonSearched]=useState("");
    const navigate = useNavigate();
    const searchPokemonHandler = ()=>{
        console.log(pokemonSearched);
        if(pokemonSearched!==""){
            navigate(`/search-pokemon:${pokemonSearched}`);
        }else{
            toast.error("You must enter a query",{
                autoClose:2000,
            });
            return;
        }
    }
    return(
        <Paper
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
                placeholder="Search Pokémon "
                fullWidth
                sx={{ fontSize: "1.4rem", color: "#ffffff" }}
                />
            <IconButton type="button" color="inherit" onClick={searchPokemonHandler}>
                <Search />
            </IconButton>
        </Paper>
    );
}
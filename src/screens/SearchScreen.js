import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, Skeleton, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import { Box } from "@mui/system";

export default function SearchScreen(){

    const pokemonFilter = (pokemonArr, wordSearch)=>{
        const filter = pokemonArr.filter(item => item.name.startsWith(wordSearch))  
        return filter;
    }

    const api = axios.create({
        baseURL:"https://pokeapi.co/api/v2/",
    })
    
   
    const {name} = useParams();
    const [pokemons, setPokemons]=useState([]);
    const [loadState, setLoadState]=useState(true);
    const word = name.slice(1).toLowerCase();
    
    const getAllDataPokemon = async(pokemonSelected)=>{
        const completeData = Promise.all(pokemonSelected.map(async(item)=>{
            const {data} = await axios.get(item.url);
            return data;
        }))
        return completeData;
    }
    const transformName = (name)=>{
        const name1 = name.replaceAll("-"," ");
        const nameFormatter = name1.charAt(0).toUpperCase()+name1.slice(1);
        return nameFormatter;
    }
    useEffect(()=>{
        const getInfoPokemon =async(word)=>{
            setLoadState(true);
            const {data} = await api.get("pokemon/");
            let filtered = pokemonFilter(data.results,word);
            let currentURL = data.next;
            while(currentURL!=null){
                const{data:data2}=await api.get(currentURL);
                const filtered2 = pokemonFilter(data2.results,word);
                if(filtered2.length!==0){
                    filtered = filtered.concat(filtered2);
                }
                currentURL=data2.next;
            }
            const allInfo = await getAllDataPokemon(filtered);
            return allInfo;
        }
        const results = getInfoPokemon(word)
        .then(res => {
            setPokemons(res);
            setLoadState(false);
        })
        .catch(err=>console.log(err));   
    },[name])
    console.log(pokemons);
    return (
        <Box p={2} sx={{display:"flex",flexDirection:"column",alignItems:"center",backgroundColor: "#29304f",height:"max-content", minHeight:"100vh"}}>
            <SearchBar/>
            <Grid container spacing={3} justifyContent="center" mt={.5} mb={2}>
                {
                    
                    pokemons.length!==0 && loadState===false
                    ?
                    pokemons.map(item=>{
                        if(item.sprites.other.home.front_default!=null){
                            return(
                                <Grid item sx={6}>
                                    <Card sx={{maxWidth:"250px", width:"150px", height:"300px",backgroundColor:"#353d64", borderRadius:"20px"}}>
                                        <CardActionArea>    
                                            <CardMedia
                                            component="img"
                                            image={`${item.sprites.other.home.front_default}`}
                                            alt={`${item.name}`}
                                            height="150px"
                                            loading="lazy"
                                            />
                                            <CardContent>
                                                <Typography variant="subtitle1" sx={{
                                                    textAlign:"center",
                                                    fontSize:"1.2rem",
                                                    color:"#ffffff"
                                                }}>
                                                    N°{item.order}
                                                </Typography>
                                                <Typography variant="h5" sx={{
                                                    textAlign:"center",
                                                    fontSize:"2rem",
                                                    fontWeight:"900",
                                                    color:"#ffffff"
                                                }}>
                                                    {transformName(item.name)}
                                                </Typography>
                                            </CardContent>
                                            <Box sx={{display:"flex",justifyContent:"center",gap:"10px"}}>
                                                {
                                                    item.types.map(item=>{
                                                        return(
                                                            <CardMedia
                                                            component="img"
                                                            image={`resources/icons/${item.type.name}__type.png`}
                                                            alt={`${item.type.name}`}
                                                            loading="lazy"
                                                            sx={{width:"25px"}}
                                                            />
                                                        );
                                                    })
                                                }
                                            </Box>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        }
                    })
                    :
                    loadState===true
                    ?
                    <Grid container spacing={3} justifyContent="center" mt={.5} mb={2} m={"0 auto"}>
                        <Grid item sx={6}>
                            <Skeleton variant="rounded" width={"150px"} maxWidth={"250px"} height={"250px"} />
                        </Grid>
                        <Grid item sx={6}>
                            <Skeleton variant="rounded" width={"150px"} maxWidth={"250px"} height={"250px"} />
                        </Grid>
                    </Grid>
                    :
                    <Typography variant="h4" color={"#ffffff"}>Not matches found</Typography>
                }
            </Grid>
        </Box>    
    );
}
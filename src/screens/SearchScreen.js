import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

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
    const word = name.slice(1).toLowerCase();

    useEffect(()=>{
        const getInfoPokemon =async(word)=>{
            const {data} = await api.get("pokemon/");
            let filtered = pokemonFilter(data.results,word);
            let currentURL = data.next;
            while(currentURL!=null){
                const{data:data2}=await api.get(currentURL);
                const filtered2 = pokemonFilter(data2.results,word);
                if(filtered2.length!==0){
                    console.log(filtered2)
                    filtered= filtered.concat(filtered2);
                }
                currentURL=data2.next;
            }
            return filtered;
        }
        const results = getInfoPokemon(word)
        .then(res => setPokemons(res))
        .catch(err=>console.log(err));
        
    },[])
    console.log(name.slice(1));
    return (
        <div>
            {
                pokemons.map(item=><p>{item.name}</p>)
            }
            
        </div>    
    );
}
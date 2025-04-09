import { cloneDiv, searchBar, listSearch } from "./component.js"

/**
 * Entry point 
 */

function main() {

/**
 * Requete HTTP pour avoir la liste des pokemons
 */
fetch("https://pokebuildapi.fr/api/v1/pokemon/")
.then(response=>response.json()) //Promesse
.then(pokemons=>{
    // console.log("All Pokemons", pokemons);

    // barre de chargement
    const loadingTag = document.querySelector(".loading");
    loadingTag.remove();
    pokemons.forEach(pokemon=>{
        // console.log(pokemon);


        cloneDiv(pokemon);
	});
})
.catch((error)=>{
    console.error(error.message);
});

/* Appel de la fonction searchbBar */
searchBar();

/* Appel de la fonction listSearch */
listSearch ();

};

main();
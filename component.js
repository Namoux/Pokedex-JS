
/** Fonction qui clone un element pour l'affichage des pokemons */
export function cloneDiv(div) {

    const scrollcase = document.querySelector(".case");
    const template = document.querySelector(".listPokemon");
    
    const cloneTemplate = template.content.cloneNode(true);
    
    // On remplit le champ ID 
    const ID = cloneTemplate.querySelector(".Pokedex>p");
    ID.textContent = div.pokedexId;
    
    // On remplit le champ nom du Pokemon
    const namePokemon = cloneTemplate.querySelector(".Pokedex>h2");
    namePokemon.textContent = div.name;
    
    // On remplit la photo du pokemon
    const imgPokemon = cloneTemplate.querySelector(".Pokedex>img");
    imgPokemon.setAttribute("src", div.image);
    
    // Chaque clique sur la vignette du pokemon affichera sa présentation
    const vignette = cloneTemplate.querySelector(".Pokedex");
    vignette.addEventListener("click", () => {
        IdentityPokemon(div);
        StatsPokemon(div);
        TypePokemon(div);
        EvolutionPokemon(div);
        AppearDivPokemon();
    });

    scrollcase.appendChild(cloneTemplate);

};

/** Fonction qui remplit l'identité du pokemon sur la page de presentation */
function IdentityPokemon(div) {

    // On remplit le champ ID
    const idPlanPokemon = document.querySelector("#pokedexId");
    idPlanPokemon.textContent = div.pokedexId;

    // On remplit la photo du pokemon
    const imgPlanPokemon = document.querySelector(".identité>img");
    imgPlanPokemon.setAttribute("src", div.image);
    
    // On remplit le champ nom du Pokemon
    const namePlanPokemon = document.querySelector("#namePokemon");
    namePlanPokemon.textContent = div.name;
};

/** Fonction qui remplit les stats du pokemon sur la page de presentation */
function StatsPokemon (div) {


    const stats = div.stats;
    // console.log("stats", stats);
    
    // On remplit ses HP
    const HPdiv = document.querySelector("#HP");
    HPdiv.textContent = stats.HP;
    
    // On remplit son attaque
    const Attackdiv = document.querySelector("#attack");
    Attackdiv.textContent = stats.attack;
    
    // On remplit sa defense
    const Defensediv = document.querySelector("#defense");
    Defensediv.textContent = stats.defense;
    
    // On remplit sa spéciale attaque
    const Sattackdiv = document.querySelector("#Sattack");
    Sattackdiv.textContent = stats.special_attack;
    
    // On remplit sa spéciale defense
    const Sdefensediv = document.querySelector("#Sdefense");
    Sdefensediv.textContent = stats.special_defense;
    
    // On remplit sa vitesse
    const Speeddiv = document.querySelector("#speed");
    Speeddiv.textContent = stats.speed;
};

/** Fonction qui remplit le type du pokemon sur la page de presentation */
function TypePokemon (div) {
    const types = div.apiTypes;
    // console.log(types);

    const typeDIV = document.querySelector(".types");
    const typesIMG = document.querySelectorAll(".types img");
    types.forEach((type)=>{
        
        // On supprime l'element dernier
        if (typesIMG.length != 0) {
            typesIMG.forEach((typeIMG)=>{
                typeIMG.remove();
            });
        }
        
        // On rajoute le nouvel élément
        const imgTypes = document.createElement("img");
        imgTypes.setAttribute("src", type.image);
        typeDIV.appendChild(imgTypes);
    });
};

/** Fonction qui remplit les evolutions du pokemon sur la page de presentation */
function EvolutionPokemon (div) {
    
    // On supprime l'element dernier si il y a
    const evolutionDIVALL = document.querySelectorAll(".PokemonEvolution");
    evolutionDIVALL.forEach((evolution)=>{
        evolution.remove();
    });
    
    // On recupere le tableau d'evolution
    const evolutions = div.apiEvolutions;
    console.log("tableau d'evolution" , evolutions);
    
    const scrollcase1 = document.querySelector(".case1");
    const template1 = document.querySelector(".EvolutionPokemon");
    
        // Si un pokemon n'a pas d'evolution, on affiche la balise pas d'evolution
    if (evolutions.length == 0) {
        scrollcase1.classList.remove("evoli");
        const cloneTemplate1 = template1.content.cloneNode(true);
        const namePokemon = cloneTemplate1.querySelector(".PokemonEvolution>h2");
        namePokemon.textContent = ("Pas d'évolution");
        
        // Barre de chargement pour l'image
        const loadingTag = cloneTemplate1.querySelector(".loading1");
        const imgPokemon = cloneTemplate1.querySelector(".PokemonEvolution>img");
        
        imgPokemon.remove();
        loadingTag.remove();
        scrollcase1.appendChild(cloneTemplate1); 

        // Si il a une evolution, on affiche le pokemon evolué
    } else if (evolutions.length > 0) {

        evolutions.forEach((evolution) =>{
            
            console.log(evolution);
            
            // On clone la balise et affiche la balise avec le pokémon evolué dedans
            scrollcase1.classList.remove("evoli");
            const cloneTemplate1 = template1.content.cloneNode(true);
            
            // On remplit le champ ID
            const ID = cloneTemplate1.querySelector(".PokemonEvolution>p");
            ID.textContent = evolution.pokedexId;
            console.log(evolution.pokedexId);
            
            // On remplit le champ nom du pokemon
            const namePokemon = cloneTemplate1.querySelector(".PokemonEvolution>h2");
            namePokemon.textContent = evolution.name;
            console.log(evolution.name);
            
            const loadingTag = cloneTemplate1.querySelector(".loading1");
            const imgPokemon = cloneTemplate1.querySelector(".PokemonEvolution>img");
            const evolutionDIV = cloneTemplate1.querySelector(".PokemonEvolution");

            // Requete HTTP qui nous servira a recuperer l'image du pokemon evolué
            fetch("https://pokebuildapi.fr/api/v1/pokemon/")
            .then(response=>response.json())
            .then(pokemons=>{
                // Barre de chargement
                loadingTag.remove();

                // On recherche le pokemmon par son ID
                for (let i = 0; i < pokemons.length; i++) {

                    if (pokemons[i].pokedexId === evolution.pokedexId) {
                        
                        // On remplit le champ photo du pokemon
                        imgPokemon.setAttribute("src", pokemons[i].image);
                       
                        // Ecouteur d'evenement qui renvoit sur le pokemon evolué
                        evolutionDIV.addEventListener("click", () => {
                            IdentityPokemon(pokemons[i]);
                            StatsPokemon(pokemons[i]);
                            TypePokemon(pokemons[i]);
                            EvolutionPokemon(pokemons[i]);
                        });
                    }
                };
                
            });
            
            // Si le pokemon a plusieurs choix d'evolution, on change la class CSS de la balise
            if (evolutions.length > 2) {
                scrollcase1.classList.add("evoli");
            };

            scrollcase1.appendChild(cloneTemplate1); 
        });
    }
};

/** Fonction qui permet la recherche du pokemon par mot clé */
export function searchBar () {
    const form = document.querySelector("form");

    // Ecouteur d'evenement sur le form
    form.addEventListener("submit", (event) => {
        // Evite le rechargement de la page
        event.preventDefault(); 
        const formData = new FormData(form);

        // Requete HTTP pour y rechercher le pokemon + le mot tapé dans la barre de recherche
        fetch("https://pokebuildapi.fr/api/v1/pokemon/"+formData.get("recherche"))
        .then(response => response.json())
        .then(pokemon => {
            // console.log(pokemon);
            IdentityPokemon(pokemon);
            StatsPokemon(pokemon);
            TypePokemon(pokemon);
            EvolutionPokemon(pokemon);
            AppearDivPokemon();
        })
        .catch(err=>console.warn(err.message));
        // Réinitialiser les champs de saisie titre et description
        document.querySelector("#search").value = ""; 
    });   
};

/** Fonction qui permet de lister les pokemons selon ce que l'on tape sur la barre de recherche */
export function listSearch () {
    const inputSearch = document.querySelector("#search");
    const listSearch = document.querySelector(".listSearch");
    
    // requete HTTP pour avoir les pokemons
    fetch("https://pokebuildapi.fr/api/v1/pokemon/")
    .then(response => response.json())
    .then(pokemons => {
        pokemons.forEach(pokemon=>{ 

            // Pas de différence entre majuscule ou minuscule
            const NamePokemon = pokemon.name;
            const namePokemon = NamePokemon.toUpperCase();
            
            // Avant la tape du clavier, on supprime la balise pour pouvoir la mettre a jour ensuite
            inputSearch.addEventListener("beforeinput", () => {
                const DIVPokemonFounds = document.querySelectorAll(".PokemonFound");
                DIVPokemonFounds.forEach((pokemonFound) => {
                    pokemonFound.remove();
                    console.log("List search's div removed");
                });
            });

            // Ecouteur d'evenement sur la barre de recherche
            inputSearch.addEventListener("input", (event) => {

                // On recupere la valeur de l'input peu si c'est une majuscule ou minuscule
                const userInput = event.target.value;
                const InputUser = userInput.toUpperCase();
                
                // On affiche les pokemons commencant par la lettre tapée dans l'input
                if (namePokemon.startsWith(InputUser) == true) {
                    console.log(namePokemon);
                    
                    // On clone la balise
                    const template = document.querySelector(".SearchPokemon");
                    
                    const cloneTemplate = template.content.cloneNode(true);
                    
                    // On remplit le champ nom du pokemon
                    const PokemonDIVName = cloneTemplate.querySelector(".PokemonFound>p");
                    PokemonDIVName.textContent = namePokemon;
                    
                    // Ecouteur d'evenement sur le nom du pokemon 
                    PokemonDIVName.addEventListener("click", () => {
                        IdentityPokemon(pokemon);
                        StatsPokemon(pokemon);
                        TypePokemon(pokemon);
                        EvolutionPokemon(pokemon);
                        AppearDivPokemon();
                        
                        // On supprime la balise
                        const DIVPokemonFounds = document.querySelectorAll(".PokemonFound");
                        DIVPokemonFounds.forEach((pokemonFound) => {
                            pokemonFound.remove();
                            console.log("List search's div removed");
                        });
                        
                        // on réinitialise les champs de saisie titre et description
                        document.querySelector("#search").value = ""; 
                    });

                    listSearch.appendChild(cloneTemplate);
                };

            });
        });
})
.catch(err=>console.warn(err.message));
    
};

/** Fonction qui affiche la presentation du pokemon */
function AppearDivPokemon () {
    const planPokemon = document.querySelector(".PlanPokemon");
    const NoPokemon = document.querySelector(".NoPokemon");

    // On change la class CSS 
    planPokemon.classList.add("appear");
    NoPokemon.classList.add("disappear");
};
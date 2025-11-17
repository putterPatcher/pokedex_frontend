export const backend_url = "https://pokidex-server.onrender.com"
export const base_urls = {
    pokedex: "/pokidex",
    user: "/user",
    auth: "/auth"
}

export const pokedex_urls = {
    pokemon: (id) => { return "/pokimon/" + id },
    pokedex: "/pokidex",
    add_pokemon: "/add_pokimon",
    filter_pokemon: "/filter_pokimon",
}

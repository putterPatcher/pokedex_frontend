import { backend_url, base_urls, pokedex_urls } from './paths'
import { json_header } from './request_helpers'

export const getPokedex = async () => {
    const url = backend_url + base_urls.pokedex + pokedex_urls.pokedex
    const response = await fetch(url, {
        method: "GET",
    })
    const data = await response.json()
    return data
} 

export const filterPokemon = async (data) => {
    let url = backend_url + base_urls.pokedex + pokedex_urls.filter_pokemon + "?"
    for (const [i, j] of Object.entries(data)) {
        if (i == 'name' && i.length != 0) {
            url += `name=${j}&`
        }
        else if (i == 'weight' && j.min != "" && j.max != "") {
            url += `weight=${j.min}&weight=${j.max}`
        }
        else if (i == 'height' && j.min != "" && j.max != "") {
            url += `height=${j.min}&height=${j.max}`
        } 
        else if (i == 'candy_counts' && j.min != "" && j.max != "") {
            url += `candy_counts=${j.min}&candy_counts=${j.max}`
        } 
        else if (i == 'spawn_chance' && j.min != "" && j.max != "") {
            url += `spawn_chance=${j.min}&spawn_chance=${j.max}`
        } 
        else if (i == 'avg_spawns' && j.min != "" && j.max != "") {
            url += `avg_spawns=${j.min}&avg_spawns=${j.max}`
        } 
    }
    const response = await fetch(url, {
        method: "GET",
    })
    const data1 = await response.json()
    return data1
}

export const getPokemon = async (id) => {
    const url = backend_url + base_urls.pokedex + pokedex_urls.pokemon + "/" + id
    const response = await fetch(url, {
        method: "GET"
    })
    const data = await response.json()
    return data
}

export const addPokemon = async (data) => {
    const url = backend_url + base_urls.pokedex + pokedex_urls.add_pokemon
    const response = await fetch(url, {
        headers: json_header(),
        method: "POST",
        body: JSON.stringify(data)
    })
    const res = response.json()
    return res
}
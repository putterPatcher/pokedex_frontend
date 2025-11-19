import { backend_url, base_urls, user_urls } from "./paths"
import { json_header } from "./request_helpers"

export const getDetails = async () => {
    const url = backend_url + base_urls.user + user_urls.details
    const jwt = localStorage.getItem('jwt')
    const response = await fetch(url, {
        headers: json_header(),
        method: "POST",
        body: JSON.stringify({ jwt })
    })
    const res = await response.json()
    return res
}

export const getCollection = async () => {
    const url = backend_url + base_urls.user + user_urls.collection
    const jwt = localStorage.getItem('jwt')
    const response = await fetch(url, {
        headers: json_header(),
        method: "POST",
        body: JSON.stringify({ jwt })
    })
    const res = await response.json()
    return res
}

export const editPokemon = async (data) => {
    const url = backend_url + base_urls.user + user_urls.edit_pokemon
    const response = await fetch(url, {
        headers: json_header(),
        method: "PATCH",
        body: JSON.stringify(data)
    })
    const res = await response.json()
    return res
}

export const deletePokemon = async (data) => {
    const url = backend_url + base_urls.user + user_urls.delete_pokemon
    const response = await fetch(url, {
        headers: json_header(),
        method: "DELETE",
        body: JSON.stringify(data)
    })
    const res = await response.json()
    return res
}

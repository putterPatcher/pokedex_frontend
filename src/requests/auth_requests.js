import { backend_url, base_urls, auth_urls } from "./paths";
import { json_header } from "./request_helpers";

export const signup = async (data) => {
    const url = backend_url + base_urls.auth + auth_urls.signup
    const response = await fetch(url, {
        headers: json_header(),
        method: "POST",
        body: JSON.stringify(data)
    })
    const res = await response.json()
    return res   
}

export const login = async (data) => {
    const url = backend_url + base_urls.auth + auth_urls.login
    const response = await fetch(url, {
        headers: json_header(),
        method: "POST",
        body: JSON.stringify(data)
    })
    const res = await response.json()
    return res
};

export const logout = async (data) => {
    const url = backend_url + base_urls.auth + auth_urls.logout
    const response = await fetch(url, {
        headers: json_header(),
        method: "POST",
        body: JSON.stringify(data)
    })
    const res = await response.json()
    return res
}
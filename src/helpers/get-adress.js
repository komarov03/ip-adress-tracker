export async function getAdress(ip) {
    const response = await fetch(`
        https://ipgeolocation.abstractapi.com/v1/?api_key=4a49289584fe45d088e28556cf29bb6c&ip_address=${ip}`);
    return await response.json();
}

import axios from "axios";

export async function fetchToken(authUrl: string, username: string, password: string) {
    const params = new URLSearchParams();
    params.append("client_id", "registry-frontend");
    params.append("username", username);
    params.append("password", password);
    params.append("grant_type", "password");

    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
        },
    };

    const result = await axios
        .post(authUrl, params, config)
        .catch((e) => e);
    return result;
}
import apiInstance from "../apiInstance";

// send login request
export async function login(user) {
    try {
        const response = await apiInstance.post("/login", user);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}
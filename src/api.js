import axios from "axios";
export const API_URL = "/clientes";

export function POST_USER(body) {
	const response = axios.post(`${API_URL}`, body, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
}

export function GET_USERS() {
	return axios.get(`${API_URL}`);
}

export function GET_USER(userId) {
	return axios.get(`${API_URL}/${userId}`);
}

export function UPDATE_USER(userId, newData) {
	return axios.patch(
		`${API_URL}/${userId}`,
		{ data: newData },
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
}

export function DELETE_USER(userId) {
	return axios.delete(`${API_URL}/${userId}`);
}

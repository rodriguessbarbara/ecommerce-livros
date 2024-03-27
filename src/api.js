import axios from "axios";
export const API_URL = "jdbc:postgresql://localhost:5432/ecommerce";

export function POST_USER(body) {
	const response = axios.post(`${API_URL}`, body, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
}

export function GET_USER() {
	return axios.get(`${API_URL}/api/users`);
}

export function UPDATE_USER_ALL(userId, userData) {
	return axios.put(`${API_URL}/api/users/${userId}`, userData, {
		headers: {
			"Content-Type": "application/json",
		},
	});
}

export function UPDATE_USER_DATA(userId, newData) {
	return axios.patch(
		`${API_URL}/api/users/${userId}`,
		{ data: newData },
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
}

export function DELETE_USER(userId) {
	return axios.delete(`${API_URL}/api/users/${userId}`);
}

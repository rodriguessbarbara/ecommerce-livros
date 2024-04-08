import axios from "axios";

const clientesAPI = axios.create({ baseURL: "http://localhost:8000/clientes" });

async function POST_USER(body) {
	const response = await clientesAPI.post("/", body, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
}

async function CHECK_USER(body) {
	const response = await clientesAPI.post("/login", body, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
}

async function GET_USERS() {
	const response = await clientesAPI.get("/");
	return response;
}

async function GET_USER(userId) {
	const response = await clientesAPI.get(`/${userId}`);
	return response;
}

async function UPDATE_USER(userId, newData) {
	const response = await clientesAPI.patch(`/${userId}`, newData, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
}

async function DELETE_USER(userId) {
	const response = await clientesAPI.delete(`/${userId}`);
	return response;
}

export { GET_USERS, GET_USER, POST_USER, UPDATE_USER, DELETE_USER, CHECK_USER };

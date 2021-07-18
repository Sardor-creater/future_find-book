import axios from "axios";

const instance = axios.create({
	baseURL: 'https://www.googleapis.com/books/v1'
});

export const getInfo = async (page, query, category, sort) => {
	const res = await instance.get(`/volumes?q=${query}${category ? `+subject:${category}` : ''}&maxResults=30&startIndex=${page*30}&orderBy=${sort}`);
	console.log(res);
	return res
};
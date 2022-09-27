import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

export default class AdapterService {
	private reqClient: AxiosInstance;

	constructor() {
		this.reqClient = axios.create({
			baseURL: "https://api.spotify.com/v1",
			headers: {
				"Content-Type": "application/json",
			},
		});

		this.reqClient.interceptors.request.use(async (req) => {
			const session = await getSession();
			req.headers!["Authorization"] = `Bearer ${session?.accessToken}`;
			return req;
		});
	}

	public setAccessToken(token: string) {
		this.reqClient.defaults.headers.common[
			"Authorization"
		] = `Bearer ${token}`;
	}

	public async sendGetRequest<T>(
		url: string,
		params?: Record<string, any>
	): Promise<T> {
		const response = await this.reqClient.get(url, {
			params,
		});
		return response.data;
	}

	public async sendPostRequest<T>(
		url: string,
		data: any,
		config?: AxiosRequestConfig
	): Promise<T> {
		const response = await this.reqClient.post(url, data, config);
		return response.data;
	}

	public async sendPutRequest<T>(url: string, data: any): Promise<T> {
		const response = await this.reqClient.put(url, data);
		return response.data;
	}

	public async sendDeleteRequest<T>(url: string): Promise<T> {
		const response = await this.reqClient.delete(url);
		return response.data;
	}
}

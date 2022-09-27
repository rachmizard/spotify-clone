declare type ReqTokenPayload = {
	client_id: string;
	client_secret: string;
	grant_type: string;
	refresh_token: string;
};

declare type GetParams = {
	limit?: number;
	offset?: number;
	page?: number;
};

export interface DbConfig {
	user: string;
	password: string;
	host: string;
	port: string;
	database: string;
}

export interface UserEntries {
	id?: string;
	name: string;
	lastName: string;
	email: string;
	phone: string;
	password: string;
	imageUrl: string;
}


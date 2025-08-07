import { randomBytes } from "crypto";

// Generate random id
export function generateId(length = 7) {
    let id = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    const bytes = randomBytes(length); 
	for (let i = 0; i < length; i++) {
        id += characters[bytes[i]%characters.length];
	}
	return id;
}

// Generate database id
export function generateDbId() {
    const year = new Date().getFullYear();
    return (`${year}/${generateId(7)}`);
}
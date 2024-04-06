import fs from "fs";

/**
 * Crea una colección de usuario.
 * @param user - El usuario.
 * @returns La ruta de la colección del usuario.
 */
function createUserCollection(user: unknown): string {
	fs.mkdirSync(`collections/${ user }`);
	return `collections/${ user }`;
}

/**
 * Obtiene la colección de usuario.
 * @param user - El usuario.
 * @returns La ruta de la colección del usuario. Si no existe, la crea.
 */
export function getUserCollection(user: unknown): string {
	if (fs.existsSync(`collections/${ user }`)) 
		return `collections/${ user }`;
	else return createUserCollection(user);
}

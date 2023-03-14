import { FastifyInstance } from "fastify";
import UserController from "../controllers/user.controller";

const controller = new UserController();

export default async function userRoutes(app: FastifyInstance) {
	app.post<{ Body: { id: string; name: string; image?: string } }>(
		"/signup",
		controller.signup,
	);
	app.post<{ Body: { id: string } }>("/login", controller.login);
	app.post<{ Body: { token: string } }>("/logout", controller.logout);
}

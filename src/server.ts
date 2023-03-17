import fastify from "fastify";
import cors from "@fastify/cors";
import config from "./config";
import userRoutes from "./app/routes/user.routes";

const app = fastify();

const start = async () => {
	try {
		app.register(cors, { origin: config.CLIENT_URL! });
		app.register(userRoutes);
		app.listen({ port: Number(config.PORT!) }, () => {
			console.log("Server on port", config.PORT!);
		});
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
start();

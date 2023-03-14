import fastify from "fastify";
import cors from "@fastify/cors";
import config from "./config";
import userRoutes from "./app/routes/user.routes";

const app = fastify();

app.register(cors, { origin: config.CLIENT_URL! });
app.register(userRoutes);

app.listen({ port: Number(config.PORT!) }, () => {
	console.log("Server on port", config.PORT!);
});

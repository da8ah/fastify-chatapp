import { FastifyReply, FastifyRequest } from "fastify";
import { StreamChat } from "stream-chat";
import config from "../../config";

const streamChat = StreamChat.getInstance(
	config.streamChatAPIKey!,
	config.streamChatSecKey!,
);

export default class UserController {
	private TOKEN_USER_ID_MAP = new Map<string, string>();

	public async signup(
		req: FastifyRequest<{ Body: { id: string; name: string; image?: string } }>,
		res: FastifyReply,
	) {
		const { id, name, image } = req.body;
		if (id == null || id === "" || name == null || name === "")
			res.status(400).send();

		const result = await streamChat.queryUsers({ id });
		if (result.users.length > 0) res.status(303).send();

		await streamChat.upsertUser({ id, name, image });
	}

	public async login(
		req: FastifyRequest<{ Body: { id: string } }>,
		res: FastifyReply,
	) {
		const { id } = req.body;
		if (id == null || id === "") res.status(400).send();

		const {
			users: [user],
		} = await streamChat.queryUsers({ id });
		if (user == null) return res.status(401).send();

		const token = streamChat.createToken(id);
		this.TOKEN_USER_ID_MAP.set(token, user.id);

		return {
			token,
			user: { id: user.id, name: user.name, image: user.image },
		};
	}

	public async logout(
		req: FastifyRequest<{ Body: { token: string } }>,
		res: FastifyReply,
	) {
		const token = req.body.token;
		if (token == null || token === "") return res.status(400).send();

		const id = this.TOKEN_USER_ID_MAP.get(token);
		if (id == null) return res.status(400).send();

		await streamChat.revokeUserToken(id, new Date());
		this.TOKEN_USER_ID_MAP.delete(token);
	}
}

import { config } from "dotenv";

config();

export default {
	PORT: process.env.PORT || 5000,
	CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
	streamChatAPIKey: process.env.STREAM_API_KEY,
	streamChatSecKey: process.env.STREAM_SEC_KEY,
};

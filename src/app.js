import express from "express";
import cors from "cors";
import userAuthRouter from "./routes/auth.route.js";
import adminAuthRouter from "./routes/admin/admin.auth.route.js";
import categoryRouter from "./routes/admin/category.route.js";
import subcategoryRouter from "./routes/admin/subcategory.route.js";
import brandRouter from "./routes/admin/brand.route.js";
import productRouter from "./routes/admin/products.route.js";
import homeRouter from "./routes/home.route.js";

// initialize express app
const app = express();

// define cors options
const defaultOrigins = [
	"http://localhost:5173",
	"https://shopifynest.vercel.app",
];

const allowedOrigins = (process.env.CLIENT_ORIGINS || "")
	.split(",")
	.map((origin) => origin.trim())
	.filter(Boolean);

const allowedOriginPatterns = (process.env.CLIENT_ORIGIN_PATTERNS || "")
	.split(",")
	.map((pattern) => pattern.trim())
	.filter(Boolean)
	.map((pattern) => new RegExp(pattern));

const localDevOriginPatterns = [
	/^http:\/\/localhost:\d+$/,
	/^http:\/\/127\.0\.0\.1:\d+$/,
];

app.use(
	cors({
		origin: (origin, callback) => {
			const isAllowed =
				!origin ||
				allowedOrigins.includes(origin) ||
				defaultOrigins.includes(origin) ||
				localDevOriginPatterns.some((pattern) => pattern.test(origin)) ||
				allowedOriginPatterns.some((pattern) => pattern.test(origin));
			if (isAllowed) {
				return callback(null, true);
			}
			return callback(new Error(`CORS blocked: ${origin}`));
		},
		credentials: true,
	})
);

// define express to accept 20kb json payloads
app.use(express.json({ limit: "20kb" }));

// define urlencoded to accept 20kb payloads
app.use(express.urlencoded({ limit: "20kb" }));
app.use(express.static("public"));

// Global error handling middleware
app.use((err, req, res, next) => {
	if (err?.message?.startsWith("CORS blocked:")) {
		return res.status(403).json({
			success: false,
			message: err.message,
			data: {},
		});
	}

	return res.status(500).json({
		success: false,
		message: err.message || "Internal server error",
		data: {},
	});
});


// user authentication routes
app.use("/api/v1/auth", userAuthRouter);

// Admin authentication routes
app.use("/api/v1/admin/auth", adminAuthRouter);

// Admin category routes
app.use("/api/v1/admin/categories", categoryRouter);

// Admin subcategory routes
app.use("/api/v1/admin/sub-categories", subcategoryRouter);

// Admin Brand routes
app.use("/api/v1/admin/brands", brandRouter);

// Admin Product routes
app.use("/api/v1/admin/products", productRouter);

// Frontend home page routes
app.use("/api/v1/home", homeRouter);





export default app;

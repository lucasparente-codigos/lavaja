import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes";
import companyRoutes from "./routes/companyRoutes";
import authRoutes from "./routes/authRoutes";
import { openDb } from "./database";

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Middleware de segurança
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: {
    success: false,
    error: "Muitas tentativas, tente novamente em 15 minutos"
  }
});
app.use(limiter);

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rota de saúde
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API LavaJá funcionando",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development"
  });
});

// Rotas da API
app.use("/api/users", userRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/auth", authRoutes);

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
openDb().then(() => {
  app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("❌ Erro ao conectar com o banco de dados:", err);
  process.exit(1);
});

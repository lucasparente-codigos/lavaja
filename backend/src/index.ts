import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota simples de teste
app.get("/", (req, res) => {
  res.send("API LavaJá funcionando");
});

// Rota de cadastro de usuário
app.post("/api/users/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "E-mail já cadastrado" });
    }

    const user = await prisma.user.create({
      data: { name, email, password },
    });

    res.status(201).json({ message: "Usuário registrado com sucesso", user });
  } catch (err) {
    console.error("Erro ao registrar usuário:", err);
    res.status(500).json({ message: "Erro interno ao registrar usuário" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

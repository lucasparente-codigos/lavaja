import React, { useState } from "react";
import { FormContainer, Card, InputField, Button, Checkbox } from "../components";

type UserType = "user" | "company";

interface ApiResponse {
  success: boolean;
  message: string;
}

export const RegisterPage: React.FC = () => {
  const [userType, setUserType] = useState<UserType>("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; terms?: string }>({});
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [apiMessageType, setApiMessageType] = useState<"success" | "error" | "info">("info");


  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name) newErrors.name = "Campo obrigatório";
    if (!email.includes("@")) newErrors.email = "E-mail inválido";
    if (password.length < 6) newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    if (!terms) newErrors.terms = "Você deve aceitar os termos";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
  if (!validate()) return;

  setLoading(true);
  setApiMessage("");
  setApiMessageType("info");

  const endpoint = userType === "user" ? "http://localhost:5000/api/register/user" : "http://localhost:5000/api/register/company";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      setApiMessage("Cadastro realizado com sucesso!");
      setApiMessageType("success");
      setName("");
      setEmail("");
      setPassword("");
      setTerms(false);
    } else {
      setApiMessage(data.message || "Erro ao cadastrar");
      setApiMessageType("error");
    }
  } catch (error) {
    console.error(error);
    setApiMessage("Erro de conexão com a API");
    setApiMessageType("error");
  } finally {
    setLoading(false);
  }
};


  return (
    <FormContainer>
      <Card>
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro LavaJá</h2>

        {/* Switch Usuário / Empresa */}
        <div className="flex justify-center mb-6 space-x-2">
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              userType === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setUserType("user")}
          >
            Usuário
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              userType === "company" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setUserType("company")}
          >
            Empresa
          </button>
        </div>

        {/* Formulário */}
        <div className="flex flex-col space-y-4">
          <InputField label="Nome" placeholder="Digite seu nome" value={name} onChange={setName} error={errors.name} />
          <InputField label="E-mail" type="email" placeholder="Digite seu e-mail" value={email} onChange={setEmail} error={errors.email} />
          <InputField label="Senha" type="password" placeholder="Digite sua senha" value={password} onChange={setPassword} error={errors.password} />
          <Checkbox label="Aceito os termos" checked={terms} onChange={setTerms} />
          {errors.terms && <span className="text-red-500 text-sm">{errors.terms}</span>}

          <Button onClick={handleSubmit} primary>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>

          {apiMessage && <span className="text-center mt-2 text-green-600">{apiMessage}</span>}
        </div>
      </Card>
    </FormContainer>
  );
};


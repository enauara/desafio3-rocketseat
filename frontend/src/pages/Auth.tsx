import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../services/graphql";
import { useAuth } from "../contexts/AuthContext";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginMutation, { loading: loginLoading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      login(data.login.token, data.login.user);
      navigate("/dashboard");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const [signupMutation, { loading: signupLoading }] = useMutation(
    SIGNUP_MUTATION,
    {
      onCompleted: (data) => {
        login(data.signup.token, data.signup.user);
        navigate("/dashboard");
      },
      onError: (err) => {
        setError(err.message);
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      loginMutation({
        variables: { email, password },
      });
    } else {
      signupMutation({
        variables: { email, name, password },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">$</span>
          </div>
          <span className="text-2xl font-bold text-green-600">FINANCE</span>
        </div>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-2">
          {isLogin ? "Fazer login" : "Criar conta"}
        </h1>
        <p className="text-center text-gray-600 mb-6">
          {isLogin
            ? "Entre na sua conta para continuar"
            : "Crie sua conta para começar"}
        </p>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mail
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">✉</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mail@exemplo.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? "👁" : "👁‍🗨"}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-600"
                />
                <span className="ml-2 text-sm text-gray-700">Lembrar-me</span>
              </label>
              <a
                href="#"
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Recuperar senha
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={loginLoading || signupLoading}
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {isLogin ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">ou</span>
          </div>
        </div>

        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">
            {isLogin ? "Ainda não tem uma conta?" : "Já tem uma conta?"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
            setEmail("");
            setName("");
            setPassword("");
          }}
          className="w-full border-2 border-green-600 text-green-600 font-semibold py-2 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
        >
          {isLogin ? "👤" : "🔙"} {isLogin ? "Criar conta" : "Fazer login"}
        </button>
      </div>
    </div>
  );
};

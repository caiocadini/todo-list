// pages/api/signup.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Obtenha os dados do corpo da solicitação
      const { id, password } = req.body;

      // Consulte se o usuário já existe na URL
      const response = await fetch(`http://localhost:3001/todos/${id}`);
      
      if (response.ok) {
        console.log(`Usuário ${id} já existe.`);
        res.status(400).json({ success: false, message: "Usuário já existe" });
        return;
      }

      // Criptografe a senha antes de armazená-la
      const hashedPassword = await bcrypt.hash(password, 10);

      // Se o usuário não existir, faça o cadastro com a senha criptografada
      const createUserResponse = await fetch("http://localhost:3001/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          password: hashedPassword,
          todo: [],
        }),
      });

      if (createUserResponse.ok) {
        console.log("Cadastro realizado com sucesso!");
        const token = jwt.sign({ id }, 'sua-chave-secreta', { expiresIn: '1h' });
        res.status(200).json({ success: true, message: "Cadastro realizado com sucesso!",token: token });
      } else {
        console.error("Erro ao cadastrar usuário.");
        res.status(500).json({ success: false, message: "Erro ao cadastrar usuário." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Erro interno do servidor" });
    }
  } else if (req.method === 'GET') {
    try {
      // Obtenha os dados do corpo da solicitação
      const { id, password } = req.query;
        console.log(id, password);
      // Consulte se o usuário existe na URL
      const response = await fetch(`http://localhost:3001/todos/${id}`);

      if (!response.ok) {
        console.log(`Usuário ${id} não encontrado.`);
        res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        return;
      }

      const userData = await response.json();

      // Compare a senha fornecida com a senha criptografada armazenada no servidor
      const passwordMatch = await bcrypt.compare(password, userData.password);

      if (passwordMatch) {
        console.log('Login realizado com sucesso!');
        const token = jwt.sign({ id }, 'sua-chave-secreta', { expiresIn: '1h' });
        res.status(200).json({ success: true, message: 'Login realizado com sucesso!',token: token });
      } else {
        console.error('Senha incorreta.');
        res.status(401).json({ success: false, message: 'Senha incorreta' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Método não permitido' });
  }

}

## Installation 
Certifique-se de ter o ambiente configurado corretamente. Você precisará de PHP8.1, compositor e Node.js.

1. Baixe o projeto
2. Copie `.env.example` para `.env` e configurar credenciais de banco de dados
3. Navegue até o diretório raiz do projeto usando o terminal
4. Rode o comando `composer install`
5. Defina a chave de criptografia executando `php artisan key:generate --ansi`
6. Rode o migrations `php artisan migrate --seed`
7. Inicie o servidor local executando `php artisan serve`
8. Abra o novo terminal e navegue até a past `react` 
9. Copie `react/.env.example` para `.env` e ajuste o parâmetro `VITE_API_BASE_URL` 
9. Rode o comando `npm install`
10. Rode o comando `npm run dev` para iniciar o servidor vite para React


## Api
Listagem de usuários
http://localhost:8000/api/users

Verificar cpf no react
http://localhost:8000/api/check/"cpf"

## Descrição do Teste

Teste para vaga de desenvolvedor iP4y
Criar tela com formulário, contendo os campos:
- CPF
- Nome
- Sobrenome
- Data de nascimento
- E-mail
- Gênero
Tela deve ter os seguintes botões:
- Inserir
- Recomeçar
Criar banco de dados para armazenar as informações do formulário.
Criar no backend métodos para receber as informações do formulário e armazenar no
banco de dados.
Validações:
- Todos os campos são obrigatórios
- CPF: Deve ser um CPF válido
- Data de nascimento: Deve ser uma data válida
- E-Mail: deve ser um formato válido
- Não permitir cadastro se houver registro com o mesmo CPF inserido na tabela
Criar tela listando todos os registros inseridos.
- Criar opção para alteração de informações.
- Criar opção para exclusão de registro.
- Criar opção para envio de todas as informações para API.
Apenas simular envio de todas as informações, em json, para o endpoint
“https://api-teste.ip4y.com.br/cadastro”, utilizando o método POST.
Diferenciais:
- Back desenvolvido com o framework Laravel.
- App em react native com as mesmas funcionalidades descritas acima.
Compartilhar link do projeto no github para podermos avaliar.
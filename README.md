Lorenzo Marzola Begnozzi 23067179-2
Postman: https://web.postman.co/df1cd138-7e59-495f-8875-21ec874792b7

# 📚 Microsserviços para Reserva de Livros

Este projeto é composto por dois microsserviços independentes que se comunicam via REST:

- **📘 book-service** – Responsável pelo gerenciamento dos livros
- **📕 reservation-service** – Responsável pelas reservas de livros feitas por usuários

Cada serviço possui seu próprio banco de dados e conjunto de endpoints.

---

## 🔧 Tecnologias Utilizadas

- Node.js
- Express.js
- Banco de dados (simulado com array ou banco real, como MongoDB ou PostgreSQL)
- REST APIs
- Comunicação HTTP entre microsserviços

---

## 📘 book-service – Gerenciamento de Livros

### ✅ Responsabilidades
- Cadastrar novos livros
- Atualizar dados de livros
- Listar livros disponíveis
- Alterar o status de disponibilidade dos livros (`disponível` ou `reservado`)

### 🔗 Endpoints

| Método | Rota                        | Descrição                              |
|--------|-----------------------------|----------------------------------------|
| POST   | `/books`                    | Cadastrar novo livro                   |
| GET    | `/books`                    | Listar todos os livros                 |
| GET    | `/books/{id}`               | Detalhar um livro                      |
| PUT    | `/books/{id}`               | Atualizar informações do livro         |
| PATCH  | `/books/{id}/status`        | Atualizar disponibilidade do livro     |

---

## 📕 reservation-service – Gerenciamento de Reservas

### ✅ Responsabilidades
- Criar novas reservas de livros disponíveis
- Cancelar reservas
- Listar reservas por usuário

### 🔗 Endpoints

| Método | Rota                                 | Descrição                        |
|--------|--------------------------------------|----------------------------------|
| POST   | `/reservations`                      | Criar nova reserva               |
| GET    | `/reservations/user/{userId}`        | Listar reservas por usuário      |
| DELETE | `/reservations/{id}`                 | Cancelar reserva                 |

---

## 🔍 Roteiro de Testes Manuais

### 📘 book-service

#### 1. Criar livros
```http
POST http://localhost:3001/books
Content-Type: application/json

{
  "titulo": "Livro A",
  "autor": "Autor A"
}
```

#### 2. Listar todos os livros
```http
GET http://localhost:3001/books
```

#### 3. Buscar um livro específico
```http
GET http://localhost:3001/books/1
```

#### 4. Atualizar dados de um livro
```http
PUT http://localhost:3001/books/1
Content-Type: application/json

{
  "titulo": "Livro A (editado)",
  "autor": "Autor A (editado)"
}
```

#### 5. Atualizar o status do livro
```http
PATCH http://localhost:3001/books/1/status
Content-Type: application/json

{
  "status": "reservado"
}
```

---

### 📕 reservation-service

#### 1. Criar reserva (para livro disponível)
```http
POST http://localhost:3002/reservations
Content-Type: application/json

{
  "userId": 123,
  "bookId": 1
}
```
🔁 **Esperado:** Status 201 – reserva criada e livro com status `"reservado"`.

#### 2. Criar reserva para livro já reservado
```http
POST http://localhost:3002/reservations
Content-Type: application/json

{
  "userId": 456,
  "bookId": 1
}
```
🔁 **Esperado:** Erro 400 – “Livro não está disponível”.

#### 3. Listar reservas por usuário
```http
GET http://localhost:3002/reservations/user/123
```

#### 4. Cancelar uma reserva
```http
DELETE http://localhost:3002/reservations/1
```
🔁 **Esperado:** Reserva removida e status do livro alterado para `"disponível"`.

---

## 🧪 Como Testar

1. Inicie ambos os serviços (`book-service` e `reservation-service`)
2. Use uma ferramenta como **Postman**, **Insomnia** ou **Thunder Client**
3. Siga o roteiro acima para validar todos os fluxos manualmente

---

## 📂 Estrutura do Projeto (sugestão)

```
/book-service
  └── index.js
  └── routes/
  └── controllers/
  └── db.js

/reservation-service
  └── index.js
  └── routes/
  └── controllers/
  └── db.js
```

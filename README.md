---

# 📚 Bookinsert App

Bem-vindo ao Bookinsert App, uma aplicação completa para cadastro, listagem, edição e exclusão de livros, com backend em Java Spring Boot, banco de dados relacional e frontend web moderno em HTML, CSS e JavaScript puro.

## 📋 Sobre o Projeto

O Bookinsert App permite aos usuários gerenciar uma lista de livros, armazenando informações como nome, autor e imagem/status de leitura. O backend foi desenvolvido em Spring Boot, utilizando arquitetura MVC e persistência via Spring Data JPA com banco de dados relacional (MySQL). O frontend é uma SPA (Single Page Application) responsiva, sem frameworks, consumindo a API REST do backend.

## 🚀 Tecnologias Utilizadas

### Backend

- **Java 21**
- **Spring Boot 3**
- **Spring Data JPA / Hibernate**
- **MySQL**
- **Maven**

### Frontend

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **Boxicons (ícones)**

## 🛠️ Estrutura do Projeto

### Backend (Java Spring Boot)

O backend segue uma arquitetura MVC com separação clara de responsabilidades:

- **Entidade:**  
  - `BookinsertModel`: representa o livro, com campos `id` (UUID, chave primária), `nome`, `autor` e `imagemUrl`.
- **DTO:**  
  - `TestedDto`: objeto de transferência de dados para criação/atualização de livros.
- **Repositório:**  
  - `BookRepository`: interface JPA para acesso aos dados dos livros.
- **Controlador:**  
  - `BookController`: expõe endpoints REST para CRUD de livros (`/book/livro`).

#### Endpoints REST

- `GET /book/livro` — Lista todos os livros
- `POST /book/livro` — Cadastra um novo livro
- `PUT /book/livro/{id}` — Atualiza um livro existente
- `DELETE /book/livro/{id}` — Remove um livro

#### Banco de Dados

- **MySQL**: utilizado para persistência dos dados.
- Configuração via `src/main/resources/application.properties`.

### Frontend (HTML, CSS, JS)

O frontend está localizado em `src/main/resources/static/` e é composto por:

- **index.html**: Estrutura da interface, com tabela de livros, modal para cadastro/edição e seleção de imagens/status.
- **style.css**: Estilos modernos e responsivos.
- **script.js**: Lógica de interação, manipulação do DOM e integração com a API REST do backend.

#### Funcionalidades do Frontend

- Listagem dinâmica dos livros cadastrados.
- Cadastro de novos livros com nome, autor e seleção de imagem/status (Ler, Lendo, Lido).
- Edição e exclusão de livros existentes.
- Modal para formulário de cadastro/edição.
- Consumo da API REST do backend via `fetch`.
- Atualização automática da tabela após operações de CRUD.

#### Exemplo de Fluxo

1. Usuário clica em "Adicionar" e preenche o formulário no modal.
2. Seleciona uma das três imagens, que representam o status do livro.
3. Ao salvar, o frontend envia os dados para o backend via API REST.
4. A tabela é atualizada automaticamente com o novo livro.
5. É possível editar ou excluir livros diretamente pela interface.

## 🔄 Integração Frontend-Backend

- **Comunicação:** Requisições HTTP via `fetch`, com URL base `http://localhost:8080/book`.
- **Adaptação de Dados:** O frontend envia e recebe objetos JSON compatíveis com o backend.

## 📦 Pré-requisitos

### Backend

- Java 21+
- Maven
- Banco de dados compatível com JPA (ex.: MySQL, PostgreSQL)
- IDE recomendada: IntelliJ IDEA ou Eclipse

### Frontend

- Navegador moderno (Chrome, Firefox, Edge, etc.)

## ▶️ Como Executar

### Backend

1. Clone o repositório.
2. Configure o banco de dados no arquivo `src/main/resources/application.properties`.
3. Execute o comando:
   ```
   ./mvnw spring-boot:run
   ```
4. O backend estará disponível em `http://localhost:8080`.

### Frontend

1. Após iniciar o backend, acesse `http://localhost:8080` no navegador.
2. Utilize a interface web para gerenciar os livros.

---

Se for da escolha do usuário, ele pode apenas trocar a URL do front-end para a URL da hospedagem do banco, desde que a API esteja devidamente exposta e configurada para aceitar requisições externas.

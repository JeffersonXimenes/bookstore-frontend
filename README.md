# Bookstore

Esta aplicação simula uma livraria online com autenticação, listagem e detalhamento de livros, seguindo uma lógica de negócio simples e focada no usuário autenticado.

# Como rodar o projeto?

**Requisitos**

Para rodar a aplicação do frontend
- [Node JS 18+]([https://www.oracle.com/java/technologies/javase/jdk22-archive-downloads.html](https://nodejs.org/pt))

1. Clonar o repositório:

Abra o terminal do Windows e digite o comando abaixo:

```bash
git clone https://github.com/JeffersonXimenes/bookstore-frontend.git
```

Ou, caso não tenha o Git instalado em sua máquina, é possível fazer o download do arquivo ZIP da seguinte maneira:

![image](https://github.com/user-attachments/assets/a9532999-98a8-4a26-9114-42f7869056d2)

Após o download do ZIP, o arquivo deve ser extraído em algum diretório do seu computador.

2. Navegar até o diretório do projeto

```bash
cd bookstore-frontend
```

3. Rodar o comando abaixo para instalar as dependências utilizadas no projeto

```bash
npm install
```

4. Após instalar todas as dependências, inicie a aplicação utilizando o comando abaixo:

```bash
ng serve
```

5. Pronto! Se todos os passos anteriores tiverem sido realizados corretamente, você deverá obter a saída abaixo no console:

![image](https://github.com/user-attachments/assets/b483589c-e628-4a66-9d0a-fa4d01718c99)

Para rodar a aplicação do backend
- [JDK 21 ou superior](https://www.oracle.com/java/technologies/javase/jdk22-archive-downloads.html).
- [Docker](https://www.docker.com/get-started/)
- [Git](https://git-scm.com/downloads)
- [Postman](https://www.postman.com/downloads/?%3Bpreview=true)

**Repositório:**
https://github.com/JeffersonXimenes/bookstore-backend

---
# I. Lógica de Negócio

### **1. Registro e autenticação (login/logout)**
**Objetivo:** Permitir que apenas usuários autenticados acessem a listagem de livros.

**Como funciona**
- O usuário se registra com um nome, e-mail e senha.
- Após o login, o backend retorna um token JWT e o tipo de autenticação (por exemplo, "Bearer ").
- Esses dados são armazenados localmente no navegador (via localStorage) pela AuthService.

**Regras de negócio**
- Sem token válido, o usuário não pode acessar a tela de listagem (/home).
- O token é usado em todas as requisições via Authorization header.
- O logout limpa todos os dados do usuário no localStorage.

**Serviço**

![image](https://github.com/user-attachments/assets/33913cf7-7b2f-43af-8698-669262a65eaf)

---

### **2. Listagem paginada de livros**
**Objetivo:** Exibir livros de forma eficiente, mesmo com muitos registros.

**Como funciona**
- A HomeComponent consome a API /books?page=X&size=Y, enviando o token no header.
- A resposta traz a lista de livros no body e metadados de paginação nos headers (como X-Total-Elements, X-Current-Page, X-Page-Size).
- O componente MatPaginator exibe os controles de navegação de página.

**Regras de negócio**
- O usuário visualiza livros 10 por vez (ajustável).
- A navegação de página dispara nova requisição à API.

**Serviço**

![image](https://github.com/user-attachments/assets/2c6dbf0b-c4ab-428a-861d-9cf79d45aaa8)

---

### **3. Visualização de Detalhes de um Livro**
**Objetivo:** Permitir que o usuário veja mais informações de um livro específico.

**Como funciona**
- Ao clicar em "detalhar", a HomeComponent faz uma requisição a /books/{id}.
- A resposta é exibida em um MatDialog (BookDetailDialogComponent).
- O modal exibe campos como título, autor, preço e outras descrições formatadas.

**Regras de negócio**
- A visualização dos detalhes é restrita a usuários autenticados.

**Serviço**

![image](https://github.com/user-attachments/assets/6f7c5001-0295-4ab1-a217-9ae1af8f60f8)

---

### **4. Autorização e Segurança**
**Objetivo:** Proteger recursos da API e restringir acesso não autorizado.

**Como funciona**
- A aplicação envia o token JWT em cada chamada ao backend.
- O backend valida o token e permite ou nega o acesso.

**Regras de negócio**
- Sem token → Sem acesso aos dados.
- O token precisa estar presente e válido para qualquer operação além de login e registro.

---

### **5. Resumo da Lógica de Negócio**

| Funcionalidade        | Requer Autenticação? | API Usada                       | Comportamento                                     |
|-----------------------|----------------------|----------------------------------|---------------------------------------------------|
| **Registrar**         | ❌                   | `POST /auth/register`           | Cria uma nova conta de usuário                    |
| **Login**             | ❌                   | `POST /auth/login`              | Gera token JWT e salva no armazenamento local     |
| **Ver lista de livros**| ✅                   | `GET /books?page=x&size=y`      | Retorna lista paginada de livros                  |
| **Ver detalhes**      | ✅                   | `GET /books/{id}`               | Exibe detalhes do livro em um modal (MatDialog)   |
| **Logout**            | ✅                   | —                                | Limpa token e redireciona para login              |


---

# II. Tecnologias Utilizadas
Frontend:
- Angular standalone components (14+)
- Angular Material (MatDialog, MatTable, MatPaginator)
- HttpClient com interceptação manual de JWT

Backend:
- Java 21 com Spring Boot
- Spring Security com JWT
- Spring Data com paginação

# III. Decisões Técnicas Tomadas

- Separação de URLs: classes BookUrls, InternalUrls e AuthUrls ajudam a manter o código limpo e reutilizável.
- Paginação Manual com Header: uso de headers customizados como X-Total-Elements para configurar o paginator com base no backend.
- Armazenamento de Token Local: AuthService cuida da persistência e recuperação do token de forma simples.
- Standalone Components: usado para manter componentes modulares e fáceis de testar.

# IV. Melhorias Futuras
- Guards de Rotas: para proteger rotas como /home apenas quando autenticado.
- Interceptor HTTP: para injetar o token automaticamente em todas as requisições.
- Lazy Loading de Módulos: dividir funcionalidades para carregamento sob demanda.
- Sistema de Notificações: feedback ao usuário para erros de rede ou login.
- Tratamento de Erros: centralizar com interceptor + snackbar.
- Implementar testes unitário.
- Melhoria na Segurança, como expiração de token e renovação automática (refresh token)

---

### Referências

- [Angular IO]([https://docs.spring.io/spring-boot/3.4.4/reference/using/devtools.html](https://angular.dev/))
- [Angular Material]([https://docs.spring.io/spring-boot/3.4.4/reference/web/servlet.html](https://material.angular.dev/))
- StackOverflow, GitHub Discussions)

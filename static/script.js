const modal = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const sId = document.querySelector("#m-id");
const sNome = document.querySelector("#m-nome");
const sAutor = document.querySelector("#m-autor");
const btnSalvar = document.querySelector("#btnSalvar");

let itens = [];
let id = undefined;
let selectedImageUrl = ""; // Variável para armazenar a URL da imagem selecionada

const API_URL = "http://localhost:8080/book";

// Abre o modal para edição ou criação
function openModal(edit = false, index = 0) {
  modal.classList.add("active");

  modal.onclick = (e) => {
    if (e.target.className.indexOf("modal-container") !== -1) {
      modal.classList.remove("active");
    }
  };

  if (edit) {
    const item = itens[index];
    sId.value = item.id;
    sNome.value = item.nome;
    sAutor.value = item.autor;
    selectedImageUrl = item.imagemUrl || "";
    id = index;
  } else {
    sId.value = "";
    sNome.value = "";
    sAutor.value = "";
    selectedImageUrl = "";
  }
}

// Mapeamento fixo de status por URL da imagem
const imageStatusMap = {
  "https://i.pinimg.com/736x/0c/2a/92/0c2a92eaae2837294786c49a40a4ce3a.jpg": "Ler",
  "https://i.pinimg.com/736x/17/32/67/173267eb2d0d1219c59fc3ddb2aab851.jpg": "Lendo",
  "https://i.pinimg.com/564x/b0/c5/69/b0c56970489304fbfa0caa67c6fc0022.jpg": "Lido"
};


// Função para selecionar uma imagem e garantir o status correto
function selectImage(img) {
  // Remover a classe "selected" de todas as imagens
  document.querySelectorAll(".image-selection img").forEach((image) => {
    image.classList.remove("selected");
  });

  // Marcar a imagem selecionada
  img.classList.add("selected");

  // Armazenar a URL da imagem selecionada
  selectedImageUrl = img.src;

  // Atualizar o texto de cada span para refletir o status fixo da imagem
  const allSpans = document.querySelectorAll(".image-selection .status");
  allSpans.forEach((span, index) => {
    const image = document.querySelectorAll(".image-selection img")[index];
    const imageUrl = image.src;
    
    // Atribuir o status fixo ao span correspondente
    span.textContent = imageStatusMap[imageUrl];
  });

  console.log("Imagem selecionada: ", selectedImageUrl);
}

// Insere um item na tabela
function insertItem(item, index) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>
        <div class="image-wrapper">
            <img src="${item.imagemUrl || ""}" alt="Imagem" style="width: 50px; height: auto;">
            <span class="status">${imageStatusMap[item.imagemUrl] || "Desconhecido"}</span>
        </div>
    </td>
    <td>${item.id}</td>
    <td>${item.nome}</td>
    <td>${item.autor}</td>
    <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
}

// Edita um item
function editItem(index) {
  openModal(true, index);
}

// Deleta um item
function deleteItem(index) {
  const livroId = itens[index].id;
  deletarLivro(livroId).then(() => loadItens());
}

// Manipula o evento de salvar
btnSalvar.onclick = (e) => {
  e.preventDefault();

  if (sId.value === "" || sNome.value === "" || sAutor.value === "" || selectedImageUrl === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const livro = {
    id: sId.value,
    nome: sNome.value,
    autor: sAutor.value,
    imagemUrl: selectedImageUrl, // Corrigido de "image" para "imagemUrl"
  };

  if (id !== undefined) {
    atualizarLivro(livro.id, livro).then(() => loadItens());
  } else {
    criarLivro(livro).then(() => loadItens());
  }

  modal.classList.remove("active");
  id = undefined;
  selectedImageUrl = "";
};

// Função para carregar itens do backend
async function loadItens() {
  try {
    const response = await fetch(`${API_URL}/livro`);
    if (response.ok) {
      itens = await response.json();
      tbody.innerHTML = "";
      itens.forEach((item, index) => insertItem(item, index));
    } else {
      console.error("Erro ao carregar livros:", response.statusText);
    }
  } catch (error) {
    console.error("Erro ao listar livros:", error);
  }
}

// Função para criar livro
async function criarLivro(livro) {
  try {
    const response = await fetch(`${API_URL}/criarlivro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: livro.nome,
        autor: livro.autor,
        imagemUrl: livro.imagemUrl, // Enviando imagemUrl para o backend
      }),
    });

    if (response.ok) {
      loadItens(); // Atualiza a lista de livros após criação
    } else {
      console.error("Erro ao criar livro:", response.statusText);
    }
  } catch (error) {
    console.error("Erro ao criar livro:", error);
  }
}

// Função para atualizar livro
async function atualizarLivro(id, livro) {
  try {
    const response = await fetch(`${API_URL}/atualizarlivro/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: livro.nome,
        autor: livro.autor,
        imagemUrl: livro.imagemUrl,
      }),
    });

    if (response.ok) {
      loadItens(); // Atualiza a lista de livros após atualização
    } else {
      console.error("Erro ao atualizar livro:", response.statusText);
    }
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
  }
}

// Função para deletar livro
async function deletarLivro(id) {
  try {
    const response = await fetch(`${API_URL}/deletarlivro/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      loadItens(); // Atualiza a lista de livros após exclusão
    } else {
      console.error("Erro ao deletar livro:", response.statusText);
    }
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
  }
}

// Carrega os livros ao inicializar a página
loadItens();

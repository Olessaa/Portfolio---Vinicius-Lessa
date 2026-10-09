// ============================================
// 1. MODO CLARO / ESCURO
// A escolha fica salva no navegador com localStorage.
// ============================================
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function updateThemeIcon() {
  themeIcon.textContent = document.body.classList.contains("light") ? "☾" : "☀";
}

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  const currentTheme = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("portfolio-theme", currentTheme);

  updateThemeIcon();
});

// ============================================
// 2. TEXT TYPING
// Interação JavaScript escolhida para o destaque inicial.
// ============================================
const typingText = document.getElementById("typingText");
const phrases = [
  "Criativo e responsável.",
  "Estudante de Tecnologia da Informação.",
  "Futuro desenvolvedor."
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeWriter() {
  const phrase = phrases[phraseIndex];

  if (!deleting) {
    typingText.textContent = phrase.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === phrase.length) {
      deleting = true;
      setTimeout(typeWriter, 1400);
      return;
    }
  } else {
    typingText.textContent = phrase.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeWriter, deleting ? 45 : 75);
}

typeWriter();

// ============================================
// 3. ANIMATE ON SCROLL
// Segunda interação JavaScript obrigatória.
// ============================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

// ============================================
// 4. MÁSCARA DE TELEFONE
// ============================================
const telefone = document.getElementById("telefone");

telefone.addEventListener("input", (event) => {
  let value = event.target.value.replace(/\D/g, "");

  if (value.length > 11) {
    value = value.slice(0, 11);
  }

  if (value.length > 10) {
    value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (value.length > 6) {
    value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
  } else if (value.length > 0) {
    value = value.replace(/^(\d*)/, "($1");
  }

  event.target.value = value;
});

// ============================================
// 5. VALIDAÇÃO DO FORMULÁRIO + MODAL
// ============================================
const form = document.getElementById("contactForm");
const modal = document.getElementById("successModal");
const modalClose = document.getElementById("modalClose");
const modalOk = document.getElementById("modalOk");

const fields = {
  nome: {
    input: document.getElementById("nome"),
    error: document.getElementById("nomeError")
  },
  telefone: {
    input: document.getElementById("telefone"),
    error: document.getElementById("telefoneError")
  },
  email: {
    input: document.getElementById("email"),
    error: document.getElementById("emailError")
  },
  mensagem: {
    input: document.getElementById("mensagem"),
    error: document.getElementById("mensagemError")
  }
};

function showError(field, message) {
  field.input.classList.add("invalid");
  field.error.textContent = message;
}

function clearError(field) {
  field.input.classList.remove("invalid");
  field.error.textContent = "";
}

function validateForm() {
  let valid = true;

  Object.values(fields).forEach(clearError);

  if (fields.nome.input.value.trim().length < 3) {
    showError(fields.nome, "Digite seu nome.");
    valid = false;
  }

  const phoneNumbers = fields.telefone.input.value.replace(/\D/g, "");

  if (phoneNumbers.length < 10) {
    showError(fields.telefone, "Digite um telefone válido.");
    valid = false;
  }

  const email = fields.email.input.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    showError(fields.email, "Digite um e-mail válido.");
    valid = false;
  }

  if (fields.mensagem.input.value.trim().length < 10) {
    showError(fields.mensagem, "Escreva uma mensagem com pelo menos 10 caracteres.");
    valid = false;
  }

  return valid;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  form.reset();
  Object.values(fields).forEach(clearError);
}

modalClose.addEventListener("click", closeModal);
modalOk.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});

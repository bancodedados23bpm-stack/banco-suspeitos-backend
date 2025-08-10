CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'leitor'
);

CREATE TABLE suspeitos (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  data_nascimento DATE NOT NULL,
  sexo TEXT,
  cpf TEXT,
  rg TEXT,
  nome_mae TEXT NOT NULL,
  apelido TEXT,
  artigo TEXT,
  endereco TEXT,
  carro TEXT,
  observacoes TEXT,
  etiquetas TEXT[]
);

CREATE TABLE fotos (
  id BIGSERIAL PRIMARY KEY,
  suspeito_id BIGINT REFERENCES suspeitos(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  data_upload TIMESTAMP DEFAULT now()
);

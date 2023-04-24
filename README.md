# desafio-protheus
Repositório do desafio protheus para a UNOESC-Joaçaba

**Criar tabelas no banco de dados(postgres):**

Base de dados: protheus

```sql
-- Criação da tabela 'acoes'
CREATE TABLE acoes (
  idacao SERIAL PRIMARY KEY,
  simbolo TEXT NOT NULL,
  nome TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criação da tabela 'cotacoes'
CREATE TABLE cotacoes (
  idcotacao SERIAL PRIMARY KEY,
  idacao INTEGER REFERENCES acoes (idacao),
  cotacao FLOAT,
  valormercado FLOAT,
  volumetransacoes FLOAT,
  moeda TEXT,
  data DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
```

**após clonar o repositório:**

```
 npm install
 ```
***Após clone, execute o código abaixo para popular o banco de dados consumindo a Api:***

```
node index
```
**Para rodar o servidor:**

```
node route
```
Obs: deixe o servidor rodando para poder vizualizar os dados na pagina web.

**Para rodar a pagina web**


```
npm run dev
```



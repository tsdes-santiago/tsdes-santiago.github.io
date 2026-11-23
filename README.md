# tsantiago.dev.br — Página pessoal de Tiago Santiago

Página pessoal estática (HTML + CSS + JS puro), publicada no **GitHub Pages** com o
domínio próprio **tsantiago.dev.br** (registro.br). Baseada no projeto
[PortfolioTransicao (DIO RiHappyFrontEnd)](https://github.com/tsdes-santiago/DIO_RiHappyFrontEnd/tree/main/PortfolioTransicao).

## Estrutura

```
.
├── CNAME                  # domínio próprio lido pelo GitHub Pages
├── .nojekyll              # desativa o build Jekyll (site 100% estático)
├── index.html             # página principal
├── 404.html               # página de erro personalizada
└── assets/
    ├── data/courses.json  # dados dos 39 cursos da DIO (fonte da seção Cursos)
    ├── images/            # foto de perfil, favicon e prévias dos certificados (.jpg)
    ├── scripts/scripts.js # temas dark/light + renderização dos cursos
    └── styles/            # reset.css, global.css (temas), styles.css (layout)
```

## Como atualizar os cursos

Adicione uma entrada em `assets/data/courses.json` dentro da categoria desejada
(`courses__IA`, `courses__dados`, `courses__backend`, `courses__frontend`,
`courses__cloud`):

```json
{
    "title": "Nome do Bootcamp",
    "code": "ABCD1234",
    "hours": 40,
    "date": "2026-12-01",
    "description": "Descrição do curso."
}
```

E coloque a prévia do certificado em `assets/images/ABCD1234.jpg`. O link do
certificado é gerado automaticamente para `https://hermes.dio.me/certificates/ABCD1234.pdf`.

Para gerar a prévia a partir do PDF do certificado:

```bash
pdftoppm -jpeg -scale-to 820 -jpegopt quality=72 ABCD1234.pdf assets/images/ABCD1234
```

## Testar localmente

```bash
cd Paginas_pessoal          # ou o nome da sua pasta
python3 -m http.server 8000
```

Abra <http://localhost:8000>. (Não abra com `file://`: o `fetch` do `courses.json`
exige um servidor local.)

## Publicar no GitHub Pages

1. Crie um repositório **público** chamado `tsdes-santiago.github.io` no GitHub
   (sem README, para começar vazio). Repositório de usuário publica direto na raiz
   e aceita domínio próprio.
2. No diretório deste site:

   ```bash
   git init
   git add .
   git commit -m "Site pessoal no GitHub Pages com domínio tsantiago.dev.br"
   git branch -M main
   git remote add origin https://github.com/tsdes-santiago/tsdes-santiago.github.io.git
   git push -u origin main
   ```

3. Em **Settings → Pages** do repositório, confirme que a origem é *Deploy from a
   branch / main* e que o GitHub detectou o domínio custom (`tsantiago.dev.br`)
   a partir do arquivo `CNAME`. Ative **Enforce HTTPS**.

## DNS no registro.br

No painel do registro.br, em **DNS → tsantiago.dev.br → Editar zona**, registre:

| Tipo  | Nome  | Conteúdo                |
|-------|-------|-------------------------|
| A     | @     | `185.199.108.153`       |
| A     | @     | `185.199.109.153`       |
| A     | @     | `185.199.110.153`       |
| A     | @     | `185.199.111.153`       |
| CNAME | www   | `tsdes-santiago.github.io` |

> Mantenha apenas um conjunto de registros apontando para o GitHub. Se já houver
> registros `A`/`CNAME` apontando para outro lugar (ex.: parking do registro.br),
> substitua-os.

Após a propagação (minutos a poucas horas), `https://tsantiago.dev.br` servirá o
site com certificado TLS emitido automaticamente pelo GitHub.

## Créditos

Layout e abordagem (temas dark/light, cards alternados, menu mobile fixo) do
desafio *Front-end do Zero* da DIO, de [Elidiana Andrade](https://github.com/elidianaandrade/dio-lab-portfolio).

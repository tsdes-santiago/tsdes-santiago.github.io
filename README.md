# tsantiago.dev.br — Página pessoal de Tiago Santiago

Página pessoal estática (HTML + CSS + JS puro), hospedada no **Cloudflare Pages**
com deploy automático a partir deste repositório GitHub e domínio próprio
**tsantiago.dev.br** (registro.br). Baseada no projeto
[PortfolioTransicao (DIO RiHappyFrontEnd)](https://github.com/tsdes-santiago/DIO_RiHappyFrontEnd/tree/main/PortfolioTransicao).

## Estrutura

```
.
├── index.html             # página principal
├── 404.html               # página de erro personalizada
└── assets/
    ├── data/courses.json  # dados dos 66 cursos da DIO (fonte da seção Cursos)
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

## Publicar (Cloudflare)

O site é publicado pelo **Cloudflare Pages/Workers**, conectado a este repositório:
cada `git push` na `main` gera um novo deploy automaticamente.

1. Conta gratuita em [cloudflare.com](https://dash.cloudflare.com)
2. **Workers & Pages → Create → Pages → Connect to Git** → repositório
   `tsdes-santiago/tsdes-santiago.github.io`, branch `main`
   - Framework preset: **None** · Build command: vazio · Output directory: `.`
3. **Custom domains**: adicionar `tsantiago.dev.br` e `www.tsantiago.dev.br`
   (o Cloudflare cria os registros DNS e emite o certificado TLS sozinho)

> O GitHub Pages foi **desativado** no repositório (Settings → Pages → Source: None);
> o repo existe apenas como fonte de código/versionamento.

## DNS (registro.br → Cloudflare)

O registro.br mantém o cadastro do domínio, mas os **nameservers apontam para o
Cloudflare** (painel do registro.br → *Alterar Servidores DNS*):

| Servidor 1                   | Servidor 2                    |
|------------------------------|-------------------------------|
| `autumn.ns.cloudflare.com`   | `tanner.ns.cloudflare.com`    |

Com isso, a zona DNS (`A`, `CNAME`, `TXT`...) é gerida no painel do Cloudflare —
inclusive os apontamentos do Pages, que ele configura automaticamente ao adicionar
o domínio custom. Após a delegação dos NS (até ~24h; na prática 1–2h),
`https://tsantiago.dev.br` serve o site com TLS válido.

## Créditos

Layout e abordagem (temas dark/light, cards alternados, menu mobile fixo) do
desafio *Front-end do Zero* da DIO, de [Elidiana Andrade](https://github.com/elidianaandrade/dio-lab-portfolio).

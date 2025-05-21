<p align="center">
  <a href="https://mercadobitcoin.github.io/dochub/" target="_blank" rel="noopener">
    <img src="public/images/logo.png" alt="DocHub Logo" height="70"/>
  </a>
</p>

DocHub é iniciativa que visa consolidar toda a documentação das APIs dos serviços da nossa empresa em um único repositório acessível e intuitivo. O objetivo é facilitar o acesso à informação, garantir que a documentação esteja sempre atualizada e promover a colaboração entre os usuários.

Com o DocHub, buscamos aprimorar a integração entre os serviços, aumentar a eficiência das equipes e fomentar um ambiente de aprendizado contínuo, tornando a comunicação e o desenvolvimento mais ágeis e eficazes.

## Adicionar documentação

Para adicionar uma nova documentação ao projeto, você deve editar o arquivo de `src/environments/docs.ts`. A inclusão é feita adicionando um objeto à lista de `items`. Veja um exemplo abaixo:

```json
{
  "id": 1,
  "name": "Hotwheels",
  "group": "BFF",
  "description": "Documentação da aplicação responsável por orquestrar as chamadas de serviços e fornecer uma API unificada, otimizada e padronizada para os clientes.",
  "tags": [
    "hotwheels",
    "bff"
  ],
  "reference": {
    "title": "Hotwheels",
    "type": "link",
    "source": "https://mercadobitcoin.github.io/hotwheels"
  },
  "actions": [
    {
      "name": "Chat Comunidade",
      "icon": "comments",
      "url": "https://chat.google.com/room/AAAAnBZgx9Y?cls=7"
    },
    {
      "name": "Chat Notificações",
      "icon": "bell",
      "url": "https://chat.google.com/room/AAAAiw-9upQ?cls=7"
    },
    {
      "name": "GitHub",
      "icon": "github",
      "url": "https://github.com/mercadobitcoin/hotwheels"
    }
  ]
}
```

### Descrição dos parâmetros

- **id**: Identificador único da documentação. Deve ser um valor numérico inteiro, desde que não haja duplicidade.
- **fixed**: Indica se a documentação será exibida na aba de documentações fixadas. Caso não seja informado, o valor padrão será `false`.
- **name**: Nome da documentação.
- **group**: Grupo ao qual a documentação pertence.
- **description**: Descrição da documentação.
- **tags**: Tags que podem ser utilizadas para filtrar a documentação.
- **reference**: Objeto que contém informações sobre a documentação:
  - **title**: Título da documentação. Optional. Se não informado o `name` será considerado.
  - **source**: Caminho do arquivo ou URL externa da documentação. Se for um arquivo, o mesmo deve ficar dentro de `public/assets/docs/`.
    - Exemplo de arquivo: `./assets/docs/openapi.json`
    - Exemplo de URL externa: `https://mercadobitcoin.github.io/hotwheels`
  - **type**:
    - link: A documentação está disponível em um site externo.
    - iframe: A documentação externa será carregada diretamente na página do projeto.
    - openapi-redoc: A documentação será renderizada no Redoc, seguindo o padrão OpenAPI.
    - openapi-swagger: A documentação será renderizada no Swagger, seguindo o padrão OpenAPI.
    - markdown: A documentação será renderizada a partir de um arquivo no formato markdown.
    - html: A documentação será renderizada a partir de um arquivo no formato HTML.
- **actions**: Ações que podem ser realizadas com a documentação. Cada ação deve conter:
  - **name**: Nome da ação.
  - **icon**: Ícone que será exibido ao lado do nome da ação. Todos os ícones podem ser encontrados [nesse link](https://getuikit.com/docs/icon#library).
  - **url**: URL que será aberta ao clicar na ação.

Se você não tiver conhecimento suficiente para adicionar a documentação abrindo um PR, você pode abrir uma [issue](https://github.com/mercadobitcoin/dochub/issues/new?template=add-doc.md) solicitando a inclusão da documentação.

---

### Atualização automática da documentação (ainda não foi testado)

A idéia é que a documentação seja atualizada automaticamente a partir de um repositório de origem.
Para isso, é necessário que o projeto externo tenha um arquivo de documentação no formato OpenAPI (json/yml) ou Markdown (md).
A partir disso, é possível criar um fluxo de trabalho no GitHub Actions para abrir um PR com o arquivo de documentação.

Exemplo de fluxo de trabalho para sincronização de arquivo de documentação:

```yaml
name: Sync Doc and Manage Pull Request

on:
  push:
    branches:
      - main

permissions:
  contents: write  # Permissão para ler e escrever no conteúdo do repositório
  pull-requests: write  # Permissão para gerenciar pull requests

env:
  REPO_URL: https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/MY_USER/MY_REPO.git

jobs:
  sync-file:
    runs-on: ubuntu-latest

    steps:
      # Checkout do repositório atual
      - name: Checkout Current Repository
        uses: actions/checkout@v3

      # Extrair o nome do repositório atual
      - name: Extract Current Repository Name
        id: repo_name
        run: echo "REPO_NAME=${GITHUB_REPOSITORY##*/}" >> $GITHUB_ENV

      # Definir o nome do novo arquivo
      - name: Set New File Name
        run: echo "NEW_FILE_NAME=${{ env.REPO_NAME }}-openapi.json" >> $GITHUB_ENV

      # aqui pode ser feito o passo para gerar o arquivo de documentação

      # Copiar o arquivo desejado e renomear
      - name: Copy and Rename Doc File
        run: |
          mkdir -p temp-dir
          cp docs/openapi.json temp-dir/
          mv temp-dir/openapi.json temp-dir/${{ env.NEW_FILE_NAME }}

      # Configurar repositório de destino
      - name: Configure Target Repository
        run: |
          git config --global user.name "GitHub Actions Bot"
          git config --global user.email "actions@github.com"
          git clone --depth 1 --branch main $REPO_URL target-repo

      # Sincronizar arquivo com a branch de destino
      - name: Sync File to Branch
        run: |
          cd target-repo
          git checkout -B "${REPO_NAME}"
          cp ../temp-dir/${{ env.NEW_FILE_NAME }} ./
          git add ${{ env.NEW_FILE_NAME }}
          git commit -m "Sync doc file from ${{ env.REPO_NAME }} repository" || echo "No changes to commit"
          git push $REPO_URL "${REPO_NAME}" --force

      # Verificar se há PR aberto para a branch
      - name: Check Existing Pull Request
        id: check_pr
        uses: octokit/request-action@v2.x
        with:
          route: GET /repos/MY_USER/MY_REPO/pulls
          query: |
            {
              "head": "MY_USER:${{ env.REPO_NAME }}",
              "state": "open"
            }
          token: ${{ secrets.GITHUB_TOKEN }}

      # Criar PR se não existir
      - name: Create Pull Request if None Exists
        if: steps.check_pr.outputs.data == '[]'
        uses: peter-evans/create-pull-request@v5
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          commit-message: "Sync doc file from ${{ env.REPO_NAME }} repository"
          branch: ${{ env.REPO_NAME }}
          title: "Sync doc file from ${{ env.REPO_NAME }} repository"
          body: "This PR updates the doc file from the ${{ env.REPO_NAME }} repository."
          reviewers: ${{ github.actor }}

      # Adicionar reviewer ao PR existente
      - name: Add Reviewer to Existing Pull Request
        if: steps.check_pr.outputs.data != '[]'
        run: |
          pr_number=$(echo '${{ steps.check_pr.outputs.data }}' | jq '.[0].number')
          gh pr edit $pr_number --add-reviewer "${{ github.actor }}"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## Servidor de desenvolvimento

Instale as dependências:

```bash
npm install
```

Para iniciar um servidor de desenvolvimento local, execute:

```bash
npm start
```

Uma vez que o servidor esteja em execução, abra seu navegador e acesse `http://localhost:4200/`. A aplicação será recarregada automaticamente sempre que você modificar qualquer um dos arquivos fonte.

### Build

Para compilar o projeto, execute:

```bash
npm run build
```

Isso irá compilar seu projeto e armazenar os artefatos de build no diretório `dist/`. Por padrão, o build de produção otimiza sua aplicação para desempenho e velocidade.

### Executando o lint

Para verificar seu código em busca de erros de lint, execute:

```bash
npm run lint
```

### Executando testes unitários

Para executar os testes unitários com o [Karma](https://karma-runner.github.io), utilize o seguinte comando:

```bash
npm run test
```

### Atualizando dependências

Para atualizar as dependências do projeto, execute:

```bash
npm update
```

### Gerando uma nova versão

Recomenda-se que a geração de uma nova versão da aplicação seja realizada através do [GitHub Actions](https://github.com/mercadobitcoin/dochub/actions/workflows/release.yml).

Você pode gerar uma nova versão do seu projeto localmente, mas isso não é o ideal, pois o processo de build no GitHub Actions inclui a execução de testes e outros passos para garantir a qualidade do código.

Comandos disponíveis para gerar uma versão localmente:

```bash
npm run version:major
npm run version:minor
npm run version:patch
npm run version:premajor
npm run version:preminor
npm run version:prepatch
npm run version:prerelease
```

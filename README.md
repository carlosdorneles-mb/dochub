<p align="center">
  <a href="https://mercadobitcoin.github.io/dochub/" target="_blank" rel="noopener">
    <img src="public/images/logo.png" alt="DocHub Logo" height="70"/>
  </a>
</p>

DocHub is an initiative aimed at consolidating all API documentation for our company's services into a single, accessible, and intuitive repository. The goal is to facilitate access to information, ensure that documentation is always up to date, and promote collaboration among users.

With DocHub, we seek to improve integration between services, increase team efficiency, and foster a continuous learning environment, making communication and development more agile and effective.

## Add documentation

To add new documentation to the project, you must edit the `src/environments/docs.ts` file. The inclusion is done by adding an object to the `items` list. See an example below:

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

### Parameter description

- **id**: Identificador único da documentação. Pode ser qualquer valor, desde que não haja duplicatas no arquivo de settings.
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

If you do not have enough knowledge to add the documentation via opening a PR, you can open an [issue](https://github.com/mercadobitcoin/dochub/issues/new?template=add-doc.md) requesting the inclusion of the documentation.

### Automatic documentation update (not tested yet)

The idea is that the documentation is automatically updated from a source repository.
To do this, you need to create a documentation file in OpenAPI or Markdown format and make it available in a repository.
From there, you can create a workflow in GitHub Actions to synchronize the documentation file with the project repository.

Example workflow for synchronizing a documentation file:

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

## Development server

Install the dependencies:

```bash
npm install
```

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Building

To build the project run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running lint

To check your code for linting errors, run:

```bash
npm run lint
```

### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
npm run test
```

### Updating dependencies

To update the dependencies of the project, run:

```bash
npm update
```

### Generating a new version

It is recommended that the generation of a new version of the application be performed through [GitHub Actions](https://github.com/mercadobitcoin/dochub/actions/workflows/release.yml).

You can build a new version of your project locally, but this is not ideal because the build process in GitHub Actions includes running tests and other steps to ensure code quality.

Commands available for generating a version locally:

```bash
npm run version:major
npm run version:minor
npm run version:patch
npm run version:premajor
npm run version:preminor
npm run version:prepatch
npm run version:prerelease
```

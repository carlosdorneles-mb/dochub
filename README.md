<p align="center">
    <img src="public/images/logo.png" alt="DocHub" height="70"/>
</p>

DocHub é iniciativa que visa consolidar toda a documentação das APIs dos serviços da nossa empresa em um único repositório acessível e intuitivo. O objetivo é facilitar o acesso à informação, garantir que a documentação esteja sempre atualizada e promover a colaboração entre os usuários.

Com o DocHub, buscamos aprimorar a integração entre os serviços, aumentar a eficiência das equipes e fomentar um ambiente de aprendizado contínuo, tornando a comunicação e o desenvolvimento mais ágeis e eficazes.

## Adicionar documentação

Para adicionar uma nova documentação ao projeto, você deve editar o arquivo de `public/assets/docs.json`. A inclusão é feita adicionando um objeto à lista de `items`. Veja um exemplo abaixo:

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

Se precisar adicionar uma documentação externa de forma simples, acesse [este link](https://github.com/mercadobitcoin/dochub/edit/main/public/assets/docs.json),
faça a inclusão diretamente no arquivo `public/assets/docs.json` e abra um PR sem a necessidade de clonar o projeto localmente.

### Descrição dos parâmetros

- **id**: Identificador único da documentação. Pode ser qualquer valor, desde que não haja duplicatas no arquivo de settings.
- **fixed**: Indica se a documentação será exibida na aba de documentações fixadas. Caso não seja informado, o valor padrão será `false`.
- **name**: Nome da documentação.
- **group**: Grupo ao qual a documentação pertence.
- **description**: Descrição da documentação.
- **tags**: Tags que podem ser utilizadas para filtrar a documentação.
- **reference**: Objeto que contém informações sobre a documentação:
  - **title**: Título da documentação. Optional. Se não informado o `name` será considerado.
  - **source**: Caminho do arquivo ou URL externa da documentação.
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

### Atualização automática da documentação

A idéia é que a documentação seja atualizada automaticamente a partir de um repositório de origem.
Para isso, é necessário criar um arquivo de documentação no formato OpenAPI ou Markdown e disponibilizá-lo em um repositório.
A partir disso, é possível criar um fluxo de trabalho no GitHub Actions para sincronizar o arquivo de documentação com o repositório do projeto.

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

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

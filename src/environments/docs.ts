import {DocTypeEnum, IDoc} from '@models/doc.model';

export const docs: IDoc[] = [
  {
    id: 1,
    fixed: true,
    name: "Hotwheels",
    group: "BFF",
    description: "Aplicação responsável por orquestrar as chamadas de serviços e fornecer uma API unificada, otimizada e padronizada para os clientes.",
    tags: [
      "hotwheels",
      "bff"
    ],
    reference: {
      title: null,
      type: DocTypeEnum.Link,
      source: "https://mercadobitcoin.github.io/hotwheels"
    },
    actions: [
      {
        name: "Chat comunidade",
        icon: "comments",
        url: "https://chat.google.com/room/AAAAnBZgx9Y?cls=7"
      },
      {
        name: "Chat notificações",
        icon: "bell",
        url: "https://chat.google.com/room/AAAAiw-9upQ?cls=7"
      },
      {
        name: "GitHub",
        icon: "github",
        url: "https://github.com/mercadobitcoin/hotwheels"
      }
    ]
  },
  {
    id: 2,
    fixed: true,
    name: "Extrato 2.0",
    group: "Customer Data",
    description: "Documentação que explica como funciona o extrato 2.0, como testar e como configurar ambientes de dev-stack.",
    tags: [
      "extrato",
      "statement",
    ],
    reference: {
      title: null,
      type: DocTypeEnum.Link,
      source: "https://docs.google.com/document/d/1pCwGw4Q2QqvwZ6A1h6WtKHXBOTE7JgosJrjHyk7jn70/view?tab=t.0#heading=h.2teebe9grzfv"
    },
    actions: [
      {
        name: "Chat do time",
        icon: "comments",
        url: "https://chat.google.com/room/AAAAZKBoGSc?cls=7"
      },
      {
        name: "GitHub",
        icon: "github",
        url: "https://github.com/mercadobitcoin/banco_central"
      }
    ]
  },
  {
    id: 3,
    name: "Staking",
    group: "Passive Earnings",
    description: "Aplicação responsável por manipular os dados dos clientes de Renda Passiva.  Documentação com detalhes dos fluxos da aplicação e documentação de API.",
    tags: [
      "staking",
      "passive",
      "earnings",
      "api"
    ],
    reference: {
      title: null,
      type: DocTypeEnum.Link,
      source: "https://mercadobitcoin.github.io/staking"
    },
    actions: [
      {
        name: "Chat do time",
        icon: "comments",
        url: "https://chat.google.com/room/AAAAgiVj9EI?cls=7"
      },
      {
        name: "Chat notificações",
        icon: "comments",
        url: "https://chat.google.com/room/AAAA_n7NpP0?cls=7"
      },
      {
        name: "GitHub",
        icon: "github",
        url: "https://github.com/mercadobitcoin/staking"
      }
    ]
  },
  {
    id: 4,
    name: "Staking Validator",
    group: "Passive Earnings",
    description: "Aplicação responsável por manipular a configuração de validadores de Renda Passiva. Documentação com detalhes dos fluxos da aplicação e documentação de API.",
    tags: [
      "staking",
      "validator",
      "passive",
      "earnings",
      "api"
    ],
    reference: {
      title: null,
      type: DocTypeEnum.Link,
      source: "https://mercadobitcoin.github.io/staking-validator"
    },
    actions: [
      {
        name: "Chat do time",
        icon: "comments",
        url: "https://chat.google.com/room/AAAAgiVj9EI?cls=7"
      },
      {
        name: "Chat notificações",
        icon: "comments",
        url: "https://chat.google.com/room/AAAA_n7NpP0?cls=7"
      },
      {
        name: "GitHub",
        icon: "github",
        url: "https://github.com/mercadobitcoin/staking-validator"
      }
    ]
  },
  {
    id: 5,
    name: "UNI",
    group: "Web",
    description: "Aplicação web responsável por gerenciar a interface front-end do Mercado Bitcoin, garantindo uma experiência de usuário eficiente e intuitiva.",
    tags: [
      "uni",
      "frontend",
      "wow",
      "web",
    ],
    reference: {
      title: null,
      type: DocTypeEnum.Link,
      source: "https://mercadobitcoin.github.io/uni"
    },
    actions: [
      {
        name: "Chat notificações",
        icon: "comments",
        url: "https://chat.google.com/room/AAAArT9FSk8?cls=6"
      },
      {
        name: "GitHub",
        icon: "github",
        url: "https://github.com/mercadobitcoin/uni"
      }
    ]
  },
  {
    id: 6,
    name: "Staking Utils",
    group: "Lib Python",
    description: "Biblioteca Python com códigos reutilizáveis para aplicações de Renda Passiva.",
    tags: [
      "python",
      "staking",
      "utils",
      "biblioteca",
      "library"
    ],
    reference: {
      title: null,
      type: DocTypeEnum.Link,
      source: "https://mercadobitcoin.github.io/staking-utils"
    },
    actions: [
      {
        name: "Chat notificações",
        icon: "bell",
        url: "https://chat.google.com/room/AAAAWGBHEd8?cls=7"
      },
      {
        name: "GitHub",
        icon: "github",
        url: "https://github.com/mercadobitcoin/staking-utils"
      }
    ]
  },
  {
    id: 7,
    name: "Python Metrics",
    group: "Lib Python",
    description: "Biblioteca Python que auxilia na configuração e geração de métricas utilizando OpenTelemetry.",
    tags: [
      "python",
      "metrics",
      "metricas",
      "biblioteca",
      "library",
    ],
    reference: {
      title: null,
      type: DocTypeEnum.Link,
      source: "https://mercadobitcoin.github.io/mb-python-metrics"
    },
    actions: [
      {
        name: "Chat notificações",
        icon: "comments",
        url: "https://chat.google.com/room/AAAA8kihGdI?cls=7"
      },
      {
        name: "GitHub",
        icon: "github",
        url: "https://github.com/mercadobitcoin/mb-python-metrics"
      }
    ]
  },
  {
    id: 8,
    name: "Criação e configuração de ambiente de Renda Passiva",
    group: "Passive Earnings",
    description: "Documentação com o passo a passo de como configurar um ambiente com as aplicações de Renda Passiva.",
    tags: [
      "staking",
      "validator",
      "passive",
      "earnings",
      "confluence"
    ],
    reference: {
      title: null,
      type: DocTypeEnum.Link,
      source: "https://mb-2tm.atlassian.net/wiki/x/ZQDVO"
    },
    actions: [
      {
        name: "Chat do time",
        icon: "comments",
        url: "https://chat.google.com/room/AAAAgiVj9EI?cls=7"
      }
    ]
  },
  {
    id: 9,
    name: "Cadastro de novos produtos de Renda Passiva",
    group: "Passive Earnings",
    description: "Documentação com passo a passo de como cadastrar um novo produto de Renda Passiva.",
    tags: [
      "staking",
      "validator",
      "passive",
      "earnings",
      "confluence"
    ],
    reference: {
      title: null,
      type: DocTypeEnum.Link,
      source: "https://mb-2tm.atlassian.net/wiki/x/PgAhP"
    },
    actions: [
      {
        name: "Chat do time",
        icon: "comments",
        url: "https://chat.google.com/room/AAAAgiVj9EI?cls=7"
      }
    ]
  }
]

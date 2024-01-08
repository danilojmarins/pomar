# Pomar

Aplicação para gerenciamento de um Pomar.

Tecnologias utilizadas:

- TypeScript
- Node.js
- Express
- React
- Styled-Components
- Oracle PL/SQL
- Jest
- Docker

## Setup do Projeto

Para clonar o repositório, execute o seguinte comando no terminal:

```
git clone https://github.com/danilojmarins/pomar.git
```

Para rodar o projeto, tenha o Docker Engine (Linux) ou Docker Desktop (Windows) instalado em sua máquina.

> Se o seu SO for o Windows, certifique-se de ativar a virtualização da CPU na BIOS.

Na pasta raíz do projeto, com o arquivo `compose.yaml`, execute o seguinte comando:

```
docker compose up
```

O Docker fará todo o processo de baixar as imagens necessárias no Registry, montar os Volumes e Networks e subir os Containers. Essa etapa pode demorar um pouco.

Ao todo, três Containers são inicializados: client, server e oracledb. O banco de dados já é inicializado com alguns registros nas tabelas. Depois de rodar os testes unitários, o servidor ouvirá a porta 5000 e o client a porta 3000.

Para acessar o website, acesse `http://localhost:3000`.

Para encerrar todos os containers, juntamente com os volumes, execute:

```
docker compose down --volumes
```

## DER

![DER](/readme_images/db_diagram.png)

A imagem acima apresenta o Diagrama Entidade Relacionamento das entidades da aplicação. A aplicação possui quatro entidades principais: Espécie, Árvore, Grupo e Colheita. E uma entidade de relacionamento para a relação Muitos-para-Muitos das árvores e grupos.

Todas as entidades possuem um id (chave primária) no formato de um uuid v4. Esse id é criado pela própria aplicação no momento em que a classe da entidade é instanciada. Todos os atributos das classes das entidades são privados e possuem métodos getters. Todos os atributos são definidos no construtor da classe, e qualquer violação de suas regras básicas lança um erro.

Os atributos das entidades implementam o conceito de Objetos de Valor do Domain-Driven Design. Esses objetos são utilizados em diversas entidades, como id, descrição, data etc. E possuem regras bem definidas para sua criação.

## Arquitetura

![Arquitetura](/readme_images/clean_architecture.jpg)

Nesse projeto, foram utilizados conceitos da Arquitetura Limpa, representada pela imagem acima. As entidades, casos de uso e regras de negócio são mantidas no centro da aplicação, e não possuem dependências externas. As únicas dependências dos casos de uso e entidades são utilitários com implementações genéricas.

Os casos de uso acessam o repositório, que faz consultas ao banco de dados, através do conceito da inversão de dependência. O repositório é uma dependência injetada no caso de uso. Isso permite com que a regra do fluxo da dependência na aplicação seja mantida, preservando as regras de negócio.

O contrato que estabelece os métodos que cada repositório deve implementar é um gateway, na forma de uma interface TypeScript.

## Frontend

![Frontend](/readme_images/frontend.png)

O frontend da aplicação, desenvolvido em React, apresenta cinco páginas principais, uma para o relatório de colheitas com filtros e outras quatro para cada entidade: Colheitas, Árvores, Grupos e Espécies. A página lista todos os registros de determinada entidade, apresentando um formulário para o cadastro e edição de novos registros. Também é possível excluir registros (CASCADE).

Tanto o formulário quanto o card de apresentação da entidade são componentes. Também foi criado um contexto com um componente para exibir o resultado (sucesso ou fracasso) de cada requisição enviada ao servidor.
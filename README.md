# Pomar

Aplicação para gerenciamento de um Pomar.

## Setup do Projeto

Para clonar o projeto, execute o seguinte comando no terminal:

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

## Arquitetura
Nesse projeto, foram utilizados conceitos da Arquitetura Limpa, representada pelo modelo abaixo:

![Arquitetura](/readme_images/clean_architecture.jpg)

As entidades, casos de uso e regras de negócio são mantidas no centro da aplicação, e não possuem dependências externas. As únicas dependências dos casos de uso e entidades são utilitários com implementações genéricas.

Os casos de uso acessam o repositório, que faz consultas ao banco de dados, através do conceito de inversão de dependência. O repositório é uma dependência injetada no caso de uso. Isso permite com que a regra do fluxo da dependência na aplicação seja mantida, preservando as regras de negócio.
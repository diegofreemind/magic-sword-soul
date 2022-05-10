# MVP THA

## Requisitos

Para esse projeto é necessário instalar as versões

https://github.com/nvm-sh/nvm

- [v16.15.0](https://nodejs.org/en/blog/release/v16.15.0/) do node
- [1.22.18](https://github.com/yarnpkg/yarn/releases) do yarn

## Instalação dos pacotes

Executar o comando `yarn` no diretório raiz do projeto

<br>

## Variáveis de ambiente

Incluir um arquivo `.env` na raiz do projeto com os valores

```
PORT=8080
EXCEPTIONS_LOG='exceptions.log'
REJECTIONS_LOG='rejections.log'
AUTO_GENERATE_CHARACTER=1 # [0=desativado, 1=ativado]
AUTO_GENERATE_QUANTITY=10 # Quantidade de personagens
LOG_LEVEL='info' # [error, warn, info, http, verbose, debug, silly]
```

<br>

## Executando a aplicação

Para executar em modo de desenvolvimento

`yarn run start:dev`

Para executar em modo de produção

- `yarn run build`
- `yarn run start:prod`

<br>

---

<br>

### Para criar um novo personagem

<br>

```shell
curl --location --request POST 'http://localhost:8080/character' \
--data-raw '{
    "name": "Gusnmg_Hujn",
    "profession": "mage"
}'
```

```javascript
{
    "id": "bb28913e-6087-4581-8715-7aac4e84e922",
    "name": "Gusnmg_Hujn",
    "profession": "mage",
    "life": 12,
    "skill": 6,
    "strength": 5,
    "intelligence": 10,
    "status": "alive"
}
```

---

<br>

### Para listar os personagens

( é possível filtrar por `status=[alive, dead]` ou `profession=[warrior,thief, mage]` )

<br>

```shell
curl 'http://localhost:8080/character?status=alive&pageNumber=0&pageSize=10'
```

```javascript
[
  {
    id: '93df74ef-c11c-42ce-a5f4-6a5fdeffcec7',
    name: 'Kenneth_Ross',
    profession: 'thief',
    life: 15,
    skill: 10,
    strength: 4,
    intelligence: 4,
    status: 'alive',
  },
  {
    id: '8158ed02-6fa4-4500-9056-7077fd068220',
    name: 'Oscar_Harrington',
    profession: 'warrior',
    life: 20,
    skill: 5,
    strength: 10,
    intelligence: 5,
    status: 'alive',
  },
];
```

---

<br>

### Para criar uma nova batalha

( informa quais os jogadores participantes )

<br>

```shell
curl --location --request POST 'http://localhost:8080/battle' \
--header 'Content-Type: application/json' \
--data-raw '{
    "players": [
        "93df74ef-c11c-42ce-a5f4-6a5fdeffcec7",
        "8158ed02-6fa4-4500-9056-7077fd068220"
    ]
}'
```

```javascript
{
    "id": "d4d5e24e-24f6-4f51-973f-102044c23fbd",
    "players": [
        {
            "id": "93df74ef-c11c-42ce-a5f4-6a5fdeffcec7",
            "name": "Kenneth_Ross",
            "profession": "thief",
            "life": 15,
            "skill": 10,
            "strength": 4,
            "intelligence": 4,
            "status": "alive"
        },
        {
            "id": "8158ed02-6fa4-4500-9056-7077fd068220",
            "name": "Oscar_Harrington",
            "profession": "warrior",
            "life": 20,
            "skill": 5,
            "strength": 10,
            "intelligence": 5,
            "status": "alive"
        }
    ],
    "playersQuantity": 2,
    "rounds": [],
    "status": "closed"
}
```

---

<br>

### Para iniciar uma batalha

( informa o id da batalha criada )

<br>

```shell
curl --location --request PATCH 'http://localhost:8080/battle/d4d5e24e-24f6-4f51-973f-102044c23fbd'
```

```javascript
{
   "id":"d4d5e24e-24f6-4f51-973f-102044c23fbd",
   "players":[
      {
         "id":"93df74ef-c11c-42ce-a5f4-6a5fdeffcec7",
         "name":"Kenneth_Ross",
         "profession":"thief",
         "life":15,
         "skill":10,
         "strength":4,
         "intelligence":4,
         "status":"alive"
      },
      {
         "id":"8158ed02-6fa4-4500-9056-7077fd068220",
         "name":"Oscar_Harrington",
         "profession":"warrior",
         "life":20,
         "skill":5,
         "strength":10,
         "intelligence":5,
         "status":"alive"
      }
   ],
   "playersQuantity":2,
   "rounds":[
      {
         "id":"7859e8b5-370b-46aa-80df-f60956bd9a0b",
         "type":"initial"
      }
   ],
   "starterPlayer":"8158ed02-6fa4-4500-9056-7077fd068220",
   "status":"active"
}
```

---

<br>

### Para executar uma rodada

<br>

( informa qual o jogador ofensivo e qual o jogador defensivo - assim como o id de batalha )

```shell
curl --location --request POST 'http://localhost:8080/round' \
--header 'Content-Type: application/json' \
--data-raw '{
    "defensive":"8158ed02-6fa4-4500-9056-7077fd068220",
    "offensive":"93df74ef-c11c-42ce-a5f4-6a5fdeffcec7",
    "battleId":"d4d5e24e-24f6-4f51-973f-102044c23fbd"
}'
```

```javascript
{
    "battle": {
        "id": "d4d5e24e-24f6-4f51-973f-102044c23fbd",
        "players": [
            {
                "id": "93df74ef-c11c-42ce-a5f4-6a5fdeffcec7",
                "name": "Kenneth_Ross",
                "profession": "thief",
                "life": 1,
                "skill": 10,
                "strength": 4,
                "intelligence": 4,
                "status": "alive"
            },
            {
                "id": "8158ed02-6fa4-4500-9056-7077fd068220",
                "name": "Oscar_Harrington",
                "profession": "warrior",
                "life": 0,
                "skill": 5,
                "strength": 10,
                "intelligence": 5,
                "status": "dead"
            }
        ],
        "playersQuantity": 2,
        "rounds": [
            {
                "id": "7859e8b5-370b-46aa-80df-f60956bd9a0b",
                "type": "initial"
            },
            {
                "id": "662c4969-8c56-460d-a0af-e6743fa1ea6e",
                "type": "ongoing"
            },
            {
                "id": "12d2658c-23aa-4ce1-bf93-880b38b2fe3a",
                "type": "ongoing"
            },
            {
                "id": "5f4543bd-d492-41e3-8352-e46cc97e8976",
                "type": "closing"
            }
        ],
        "winnerPlayer": "93df74ef-c11c-42ce-a5f4-6a5fdeffcec7",
        "starterPlayer": "8158ed02-6fa4-4500-9056-7077fd068220",
        "status": "finished"
    },
    "round": {
        "id": "12d2658c-23aa-4ce1-bf93-880b38b2fe3a",
        "battleId": "d4d5e24e-24f6-4f51-973f-102044c23fbd",
        "offensive": "93df74ef-c11c-42ce-a5f4-6a5fdeffcec7",
        "defensive": "8158ed02-6fa4-4500-9056-7077fd068220",
        "type": "ongoing",
        "timestamp": "2022-05-10T06:10:28.338Z",
        "calculatedSpeed": [],
        "calculatedAttack": 6,
        "calculatedDamage": -3
    }
}
```

---

<br>

### Visualiza os logs da batalha

( informa o id de batalha )

<br>

```shell
curl --location --request GET 'http://localhost:8080/battle/summary/d4d5e24e-24f6-4f51-973f-102044c23fbd'
```

```javascript
{
    "battleId": "d4d5e24e-24f6-4f51-973f-102044c23fbd",
    "winner": "Kenneth_Ross",
    "summary": {
        "rounds": [
            {
                "message": "Oscar_Harrington (0) foi mais veloz que o Kenneth_Ross (0), e irá começar!",
                "metadata": {
                    "id": "7859e8b5-370b-46aa-80df-f60956bd9a0b",
                    "timestamp": "2022-05-10T06:07:12.223Z",
                    "type": "initial"
                }
            },
            [
                {
                    "message": "Oscar_Harrington atacou Kenneth_Ross com 3 de dano, Kenneth_Ross com 12 pontos de vida restantes;",
                    "metadata": {
                        "id": "662c4969-8c56-460d-a0af-e6743fa1ea6e",
                        "timestamp": "2022-05-10T06:07:46.435Z",
                        "type": "ongoing"
                    }
                },
                {
                    "message": "Kenneth_Ross atacou Oscar_Harrington com 6 de dano, Oscar_Harrington com 14 pontos de vida restantes;",
                    "metadata": {
                        "id": "c8f5874f-8613-4154-b17a-bdb444dce665",
                        "timestamp": "2022-05-10T06:08:00.344Z",
                        "type": "ongoing"
                    }
                },
                {
                    "message": "Oscar_Harrington atacou Kenneth_Ross com 0 de dano, Kenneth_Ross com 12 pontos de vida restantes;",
                    "metadata": {
                        "id": "6455655b-0766-45d9-976e-45960ba8c6f9",
                        "timestamp": "2022-05-10T06:08:39.664Z",
                        "type": "ongoing"
                    }
                },
                {
                    "message": "Kenneth_Ross atacou Oscar_Harrington com 1 de dano, Oscar_Harrington com 13 pontos de vida restantes;",
                    "metadata": {
                        "id": "c9dd414c-a2e1-46bd-8e01-693a16218d54",
                        "timestamp": "2022-05-10T06:08:51.687Z",
                        "type": "ongoing"
                    }
                },
                {
                    "message": "Oscar_Harrington atacou Kenneth_Ross com 5 de dano, Kenneth_Ross com 7 pontos de vida restantes;",
                    "metadata": {
                        "id": "95d64f4f-b297-4f19-9893-501d2c9f05d0",
                        "timestamp": "2022-05-10T06:09:02.509Z",
                        "type": "ongoing"
                    }
                },
                {
                    "message": "Kenneth_Ross atacou Oscar_Harrington com 7 de dano, Oscar_Harrington com 6 pontos de vida restantes;",
                    "metadata": {
                        "id": "ca1d33c8-8ed5-4877-a214-e34267e2430d",
                        "timestamp": "2022-05-10T06:09:19.574Z",
                        "type": "ongoing"
                    }
                },
                {
                    "message": "Oscar_Harrington atacou Kenneth_Ross com 2 de dano, Kenneth_Ross com 5 pontos de vida restantes;",
                    "metadata": {
                        "id": "000d8d5e-c34b-4f6b-960b-1691cc6d9660",
                        "timestamp": "2022-05-10T06:09:34.689Z",
                        "type": "ongoing"
                    }
                },
                {
                    "message": "Kenneth_Ross atacou Oscar_Harrington com 3 de dano, Oscar_Harrington com 3 pontos de vida restantes;",
                    "metadata": {
                        "id": "025416e6-b211-4518-8726-23fd6fad79a0",
                        "timestamp": "2022-05-10T06:10:00.567Z",
                        "type": "ongoing"
                    }
                },
                {
                    "message": "Oscar_Harrington atacou Kenneth_Ross com 4 de dano, Kenneth_Ross com 1 pontos de vida restantes;",
                    "metadata": {
                        "id": "ea5a992e-cf98-4b3e-8b01-a7f11422f380",
                        "timestamp": "2022-05-10T06:10:14.947Z",
                        "type": "ongoing"
                    }
                },
                {
                    "message": "Kenneth_Ross atacou Oscar_Harrington com 6 de dano, Oscar_Harrington com 0 pontos de vida restantes;",
                    "metadata": {
                        "id": "12d2658c-23aa-4ce1-bf93-880b38b2fe3a",
                        "timestamp": "2022-05-10T06:10:28.338Z",
                        "type": "ongoing"
                    }
                }
            ],
            {
                "winnerPlayerName": "Kenneth_Ross",
                "message": "Kenneth_Ross venceu a batalha! Kenneth_Ross ainda tem 1 pontos de vida restantes!",
                "metadata": {
                    "id": "5f4543bd-d492-41e3-8352-e46cc97e8976",
                    "timestamp": "2022-05-10T06:10:28.338Z",
                    "type": "closing"
                }
            }
        ]
    },
    "text": [
        "Oscar_Harrington (0) foi mais veloz que o Kenneth_Ross (0), e irá começar!",
        "Oscar_Harrington atacou Kenneth_Ross com 3 de dano, Kenneth_Ross com 12 pontos de vida restantes;",
        "Kenneth_Ross atacou Oscar_Harrington com 6 de dano, Oscar_Harrington com 14 pontos de vida restantes;",
        "Oscar_Harrington atacou Kenneth_Ross com 0 de dano, Kenneth_Ross com 12 pontos de vida restantes;",
        "Kenneth_Ross atacou Oscar_Harrington com 1 de dano, Oscar_Harrington com 13 pontos de vida restantes;",
        "Oscar_Harrington atacou Kenneth_Ross com 5 de dano, Kenneth_Ross com 7 pontos de vida restantes;",
        "Kenneth_Ross atacou Oscar_Harrington com 7 de dano, Oscar_Harrington com 6 pontos de vida restantes;",
        "Oscar_Harrington atacou Kenneth_Ross com 2 de dano, Kenneth_Ross com 5 pontos de vida restantes;",
        "Kenneth_Ross atacou Oscar_Harrington com 3 de dano, Oscar_Harrington com 3 pontos de vida restantes;",
        "Oscar_Harrington atacou Kenneth_Ross com 4 de dano, Kenneth_Ross com 1 pontos de vida restantes;",
        "Kenneth_Ross atacou Oscar_Harrington com 6 de dano, Oscar_Harrington com 0 pontos de vida restantes;",
        "Kenneth_Ross venceu a batalha! Kenneth_Ross ainda tem 1 pontos de vida restantes!"
    ]
}
```

<br>

As requests também podem ser [importadas via postman](https://www.getpostman.com/collections/5416476e6949d2e89f13)

<br>

---

## Executando os testes

Para executar todos os testes

`yarn run test`

Para executar os testes de unidade

`yarn run test:unit`

Para executar os testes de integração

`yarn run test:integration`

Para visualizar a cobertura de testes

`yarn run test --coverage`

<br>

## Decisões tomadas

- Incluí uma configuração para a criação automática de personagens para facilitar os testes;
- Separei as as operações de criação de batalha e inicialização de batalha ( gerando um round ) para evitar acoplamento entre as funcionalidades desse caso de uso.
- Incluí a visualização das labels de personagens com a composição de seus movimentos de ataque e velocidade através de métodos de suas respectivas classes.
- No problema não estava claro como deveriam ser executadas as operações, decidi expor as funcionalidades via REST api.

```

```

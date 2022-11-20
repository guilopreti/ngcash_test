<h1  align="center">API - NG.CASH</h1>

Essa aplicação é uma API de gerenciamento de contas, com criação de usuários e transações, além de suas listagens e filtragens, seguindo o diagrama e as regras de negócio especificadas no teste.

Realizei também o deploy da aplicação no Heroku: https://ngcash-guilopreti.herokuapp.com/

##

<h2 align="center"> Desenvolvido com:</h2>
<div align="center" style="display: inline_block">
  <img align="center" alt="Typescript" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg">
  <img align="center" alt="Node" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg">
  <img align="center" alt="postgresql" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg">
  <img align="center" alt="docker" height="30" width="40" src="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png">
  <img align="center" alt="typeorm" height="30" width="40" src="https://seeklogo.com/images/T/typeorm-logo-F243B34DEE-seeklogo.com.png" />
 </div>
 
   #

<div align="center" style="display: inline_block">
 <h2  align="center">Rotas</h2>
</div>

<div align="center" style="display: inline_block"> 
<h3>Users</h3>
</div>

<div align="left" style="display: inline_block">

Rota para criação de nova conta que já se inicia com um balance de R$ 100,00 e realização do login para geração do token de autorização com 24h de validade.

`POST /users - Criar Conta - FORMATO DA REQUISIÇÃO`

> ```json
> {
>   "username": "John",
>   "password": "A2345678"
> }
> ```

`POST /users - Criar Conta - FORMATO DA RESPOSTA - STATUS 201`

> ```json
> {
>   "username": "John",
>   "account": {
>     "id": "1a9952d4-5eac-4ba8-b144-8742471ce62a",
>     "balance": 100
>   },
>   "id": "asdhu13sa-sdh98723-asd9899f-sdf4g5d"
> }
> ```

Para a criação da nova conta é necessário que o username ainda não tenha sido registrado e tenha no mínimo 3 caracteres, e que a senha seja composta por pelo menos 8 caracteres com ao menos um número e uma letra maiúscula.

`POST /users/login - Gerar token - FORMATO DA REQUISIÇÃO`

> ```json
> {
>   "username": "John",
>   "password": "A2345678"
> }
> ```

`POST /users/login - Gerar token - FORMATO DA RESPOSTA - STATUS 200`

> ```json
> {
>   "token": "d14w56q1w56q1dq7-wqd4d4s1adsa-dwq4dqw44w4dqqw4dqw54"
> }
> ```

</div>

<div align="center" style="display: inline_block">
<h3>Account</h3>
</div>

<div align="left" style="display: inline_block">

Rota para visualização do balance da conta de um usuário, é necessário passar o token de autorização para acessar esta rota e ela apenas retorna a conta do usuário logado.

`GET /account - Visualizar Conta - FORMATO DA REPOSTA - STATUS 200`

> ```json
> {
>   "id": "1a9952d4-5eac-4ba8-b144-8742471ce62a",
>   "balance": "100"
> }
> ```

</div>

<div align="center" style="display: inline_block">
<h3>Transactions</h3>
</div>

<div align="left" style="display: inline_block">

Rota para criação de transações entre os usuários e de visualização dessas transações realizadas, todas as rotas precisam do token de autorização para serem acessadas.

`POST /transactions - Criar Transação - FORMATO DA REQUISIÇÃO`

> ```json
> {
>   "username": "Pedro",
>   "value": 50
> }
> ```

`POST /transactions - Criar Transação - FORMATO DA RESPOSTA - STATUS 201`

> ```json
> {
>   "value": 50,
>   "debitedAccount": {
>     "id": "eda503ad-4be2-4632-93bc-24278cebcf7a",
>     "username": "Pedro"
>   },
>   "creditedAccount": {
>     "id": "1a9952d4-5eac-4ba8-b144-8742471ce62a",
>     "username": "John"
>   },
>   "id": "asdhu13sa-sdh98723-asd9899f-sdf4g5d",
>   "createdAt": "2022-11-20T09:18:49.446Z"
> }
> ```

Nesta rota de criação são feitas as verificações para que a transação não aconteça caso o usuário não tenha balance suficiente, ou tente realizar a transação para si mesmo.

Todas as outras rotas são rotas de listagem de transações e o formato de resposta delas segue o mesmo formato da resposta da rota de criação, então irei apenas descrever quais são e suas funções. Como todas elas também necessitam do token de autorização, em nenhuma listagem aparecerá transações da qual o usuário logado não fez parte.

`GET /transactions - Lista todas as transações que o usuário logado participou. `

`GET /transactions/date/chronological - Lista todas as transações que o usuário logado participou em ordem cronológica. `

`GET /transactions/date/reverse - Lista todas as transações que o usuário logado participou em ordem cronológica reversa. `

`GET /transactions/cashin - Lista todas as transações que o usuário logado recebeu. `

`GET /transactions/cashin/chronological - Lista todas as transações que o usuário logado recebeu em ordem cronológica. `

`GET /transactions/cashin/reverse - Lista todas as transações que o usuário logado recebeu em ordem cronológica reversa. `

`GET /transactions/cashout - Lista todas as transações que o usuário logado enviou. `

`GET /transactions/cashout/chronological - Lista todas as transações que o usuário logado enviou em ordem cronológica. `

`GET /transactions/cashout/reverse - Lista todas as transações que o usuário logado enviou em ordem cronológica reversa. `

`GET /transactions/:transaction_id - Mostra uma transação que o usuário logado participou, especificada pelo id no parametro. `

</div>

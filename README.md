
# Consulta dados MV



## Autenticação

```http
  POST /api/auth
```
#### Headers
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Content-Type` | `application/json` | **Obrigatório**|

#### Query Params
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `secretKey` | `string` | **Obrigatório**|

#### Body
```json
{
	"user": string,
    "password": string
}
```

#
## Pacientes agendados

```http
  POST /api/ambulatory/schedule/patients
```
#### Headers
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Content-Type` | `application/json` | **Obrigatório**|
| `authorization` | `token + ${auth}` | **Obrigatório**|

#### Body
```json
{
    "startDate": string,
    "endDate": string, 
    "companyId": number,
    "scheduleItensCode": string
}
```
#
## Dados gerais do paciente

```http
  POST /api/patient
```
#### Headers
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Content-Type` | `application/json` | **Obrigatório**|
| `authorization` | `token + ${auth}` | **Obrigatório**|

#### Body
```json
{
    "external_ref_id": string,
}
```
#
## Exames de imagem

```http
  POST /api/exam/image
```
#### Headers
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Content-Type` | `application/json` | **Obrigatório**|
| `authorization` | `token + ${auth}` | **Obrigatório**|

#### Body (Código do pedido de exame: CD_PED_RX)
```json
{
    "external_ref_id": string,
}
```
#
## Exames laboratoriais

```http
  POST /api/exam/laboratory
```
#### Headers
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Content-Type` | `application/json` | **Obrigatório**|
| `authorization` | `token + ${auth}` | **Obrigatório**|

#### Body (Código do pedido de exame: CD_PED_LAB)
```json
{
    "external_ref_id": string,
}
```
#
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`WRITE_CONNECT_STRING`

`WRITE_USER`

`WRITE_PASSWORD`

`JWT_SECRET`

`SECRET_KEY`

`PORT`



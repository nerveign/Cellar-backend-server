# User API Spec

## Register User

Endpoint : POST /api/v1/register

Request Body :

```jsonc
{
    "username": "Tiffanxaa",
    "fullName": "Xazza",
    "email": "tiffanxaa@gmail.com",
    "profileImg": "xaa.jpg", //optional
    "password": "tiffanxaa192",
}
```

Response Body (Success):

```json
{
    "data": {
        "_id": "192301123493430100",
        "username": "Tiffanxaa",
        "fullName": "Xazza"
    }
}
```

Response Body (Failed):

```json
{
    "errors": "All field must not blank"
}
```

## Login User

Enpoint : POST /api/v1/login

Request Body :

```json
{
    "data": {
        "_id": "192301123493430100",
        "username": "Tiffanxaa",
        "fullName": "Xazza"
    }
}
```

Response Body (Success):

```json
{
    "data": {
        "_id": "192301123493430100",
        "username": "Tiffanxaa",
        "fullName": "Xazza"
    }
}
```

Response Body (Failed):

```json
{
    "errors": "Email or Password is wrong"
}
```

## Get User

Endpoint: GET /api/v1/user/profile

Request Header:

- jwt : cookie token

Response Body (Success):

```json
{
    "data": {
        "_id": "192301123493430100",
        "username": "Tiffanxaa",
        "fullName": "Xazza"
    }
}
```

Response Body (Failed):

```json
{
    "errors": "Unauthorized"
}
```

## Update User

Endpoint : PATCH/PUT /api/v1/user/profile/update

Request Header:

- jwt : cookie token

Request Body (Success):

```json
{
    "data": {
        "_id": "192301123493430100",
        "username": "Tiffanxaa",
        "fullName": "Xazza"
    }
}
```

Response Body (Failed):

```json
{
    "errors": "Unauthorized"
}
```

## Delete User

Endpoint: DELETE /api/v1/user/profile

Request Header:

- jwt : cookie token

Response Body (Success):

```json
{
    "message": "Delete account successfully"
}
```

Response Body (Failed):

```json
{
    "errors": "Unauthorized"
}
```

## Logout User

Endpoint : POST /api/v1/logout

Request Header:

- jwt : cookie token

Response Body (Success):

```json
{
    "message": "Logout account successfully"
}
```

Response Body (Failed):

```json
{
    "errors": "Unauthorized"
}
```

# User API Spec

## Register User

Endpoint : POST /api/v1/register

Request Body :

```jsonc
{
    "username": "holyservant",
    "fullName": "Holy Springer",
    "email": "holyservant@gmail.com",
    "password": "Ganteng123!",
}
```

Response Body (Success):

```json
{
    "data": {
        "_id": "68758fad361cc738a2d05138",
        "username": "holyservant",
        "fullName": "Holy Springer"
    }
}
```

Response Body (Failed):

```json
{
    "message": "Username must be at least 1 character"
}
```

## Login User

Enpoint : POST /api/v1/login

Request Body :

```json
{
    "email": "holyservant@gmail.com",
    "password": "Ganteng123!"
}
```

Response Body (Success):

```json
{
    "data": {
        "_id": "68758fad361cc738a2d05138",
        "username": "holyservant",
        "fullName": "Holy Springer"
    }
}
```

Response Body (Failed):

```json
{
    "message": "Email or Password is wrong"
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
        "id": "68758fad361cc738a2d05138",
        "username": "holyservant",
        "fullName": "Holy Springer",
        "email": "holyservant@gmail.com",
        "profileImg": "https://res.cloudinary.com/dlczbr5rk/image/upload/v1752825538/user-profile-image/ekmdey85hpje4p7ob7tf.jpg"
    }
}
```

Response Body (Failed):

```json
{
    "errors": "Unauthorized"
}
```

## Get User (params id)

Endpoint: GET /api/v1/user/profile/:id

Request Header:

- jwt : cookie token

Response Body (Success):

```json
{
    "data": {
        "id": "68758fad361cc738a2d05138",
        "username": "holyservant",
        "fullName": "Holy Springer",
        "email": "holyservant@gmail.com",
        "profileImg": "https://res.cloudinary.com/dlczbr5rk/image/upload/v1752825538/user-profile-image/ekmdey85hpje4p7ob7tf.jpg"
    }
}
```

Response Body (Failed):

```json
{
    "errors": "Unauthorized"
}
```

## Get All User

Endpoint: GET /api/v1/user/

Request Header:

- jwt : cookie token

Response Body (Success):

```json
{
    "data": [
        {
            "id": "68758fad361cc738a2d05138",
            "username": "holyservant",
            "fullName": "Holy Springer",
            "email": "holyservant@gmail.com",
            "profileImg": "https://res.cloudinary.com/dlczbr5rk/image/upload/v1752825538/user-profile-image/ekmdey85hpje4p7ob7tf.jpg"
        },
        {
            "id": "6875fccd9b4c1d60363b0a3f",
            "username": "nerveign",
            "fullName": "Rizqo",
            "email": "nerveign@gmail.com",
            "profileImg": ""
        }
    ]
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
        "_id": "68758fad361cc738a2d05138",
        "username": "holyservant",
        "fullName": "Holy Springer"
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

Endpoint: DELETE /api/v1/user/profile/delete

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
    "errors": "Unauthorized, you are not logged in"
}
```

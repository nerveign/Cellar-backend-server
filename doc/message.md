# Message API Spec

## Get Message

Endpoint: GET /api/v1/user/message

Request Header :

- jwt : Cookie token

Response Body (Success):

```json
{
    "data": {
        "receiverId": "68758fad361cc738a2d05138",
        "senderId": "6875821d36sadc738a27u00213",
        "text": "How are you",
        "image": "https://res.cloudinary.com/dlczbr5rk/image/upload/v1752825538/user-messages-image/ekmdey85hpje4p7ob7tf.jpg",
        "createdAt": "2018:200:2321",
        "updatedAt": "2018:200:2321"
    }
}
```

Response Body (Error):

```json
{
    "errors": "Unauthorized"
}
```

## Send Message

Endpoint: GET /api/v1/user/message/:id

Request Header :

- jwt : Cookie token

Request Body:

```jsonc
{
    "text": "How are you",
    "image": "me.jpg", // optional
}
```

Response Body (success):

```json
{
    "data": {
        "receiverId": "68758fad361cc738a2d05138",
        "senderId": "6875821d36sadc738a27u00213",
        "text": "How are you",
        "image": "https://res.cloudinary.com/dlczbr5rk/image/upload/v1752825538/user-messages-image/ekmdey85hpje4p7ob7tf.jpg",
        "createdAt": "2018:200:2321",
        "updatedAt": "2018:200:2321"
    }
}
```

Response Body (Error):

```json
{
    "errors": "Unauthorized"
}
```

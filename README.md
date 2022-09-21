# Tours API

Live API Link [tourAPI](https://tours-gules.vercel.app/).

## Details

Tour API for Get all Tours with shorting, pagination, limiting, 
get single tours, update single tour, get top 3 viewed tour, get top 3 cheapest tour

## 1. Get All tours:

```
https://tours-gules.vercel.app/api/v1/tours
```

## Get Limit with pagination tours:

```
https://tours-gules.vercel.app/api/v1/tours?page=2&limit=2
```

### Short tours:

```
https://tours-gules.vercel.app/api/v1/tours?sort=price
```
### Get only field :

```
https://tours-gules.vercel.app/api/v1/tours?fields=name,price
```

## 3. Add a new tours :

```
https://tours-gules.vercel.app/api/v1/tours
```
## 3. Get a tour:

```
https://tours-gules.vercel.app/api/v1/tours/:id
```


## 4. update a tour:

```
https://tours-gules.vercel.app/api/v1/tours/:id
```

---

### update tour data :

```
{
    "name": "Las Vegas Helicopter Night Flight",
    "description": "See the bright lights of the Las Vegas Strip and the surrounding region during this nighttime helicopter flight.",
    "price": 189.99,
    "location": "las vegas",
    "duration": "3 days",
    "isGuide": "no",
    "viewed": 0,
    "food": "first day and night"
  }

```

## 5. Get top 3 viewed tours :

```
https://tours-gules.vercel.app/api/v1/tour/trending
```

## 6. Get top 3 cheapest tours :

```
https://tours-gules.vercel.app/api/v1/tour/cheapest
```

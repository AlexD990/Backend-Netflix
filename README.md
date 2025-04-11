# New Features: Save Movies by ID

## Endpoints

### Save a Movie
**POST** `/api/v1/movie/save`
- **Body**: `{ "movieId": "123" }`
- Saves a movie by its ID.

### Get Saved Movies
**GET** `/api/v1/movie/saved`
- Retrieves all saved movie IDs.


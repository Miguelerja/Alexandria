# Alexandria
​
## Description

Alexandria is an app for book lovers that consider their books as something more than an object but a vessel of histories. The concept is simple. Users can create books in the database that won't be just the book but that especific copy and its history. Then they will liberate this book wherever they want with a clue for other book lovers to find it and become part of this book's story.
​

## User Stories
​
- **404:** As an anonimous/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.
- **Signup:** As an anonimous I can sign up in the platform so that I can start saving favorite books.
- **Login:** As a user I can login to the platform so I can acces the map and interact with it.
- **Logout:** As a user I can logout from the platform so no one else can use it.
- **Add books** As a user I can add a book to the Database so I can liberate the physical copy with an identifier that allows the founder to discover and interact with the books' story.
- **Geolocate books** As a user I can see in a map the books in the area and locate the aproximate area they are located in.
- **Access books file** As a user I can check the book's file to see the clue and story behind as well as general info about it.
- **Declare lost** As a user I can declare a book as lost. After three markers the book will be removed from the database.
- **Capture book** As a user I can insert the books code and capture it taking out of the map.
​
## Backlog
​
- QR code generation
- Photo clues (blurried)
- Goodreads API
- Events
- Story
- Comments
- Book path in the map
- Audio stories
- Gamifying

# Client
​
## Routes

| Method | Path | Component | Permissions | Behavior | 
|--------|------|--------|--| -------|
| `get`  | `/` | HomePageComponent | public | just promotional copy|
| `post` | `/auth/signup` | SignupPageComponent| anon only| signup form, link to login, navigate to homepage after signup|
| `post` | `/auth/login` | LoginPageComponent | anon only |login form, link to signup, navigate to homepage after login |
| `post` | `/auth/logout` | n/a| anon only | navigate to homepage after logout, expire session |
| `get`  | `/books` | RestaurantListPageComponent| public | shows all books, links to details, search books by name
| `post` | `/books` | RestaurantCreatePageComponent | user only | creates a new restaurant, navigates to restaurant's detail page after creation
| `put` | `/books/:id` | RestaurantDetailPageComponent  | public/user | details of one restaurant, if logged in - button to add to favorite, show star if in favorites already
| `get` | `/profile/me` | ProfilePageComponent | user only | my details, my favorite books, books created by me
| `get` | `**` | NotFoundPageComponent | public | 
​
## Components
​
Pages:

- Map
- Login
- Signup

Components:

- Login form
- Signup form
- Button
- Sliding menu
- Create form
- Card
- Story
​
​
## Services
​
- Auth Service
 - auth.login(user)
 - auth.signup(user)
 - auth.logout()
 - auth.me()
 - auth.getUser() // synchronous

- Book Service
 - book.list()
 - book.create(data)
 - book.detail(id)
 - book.modify(id)
​
# Server
​
## Models
​
User model
​
```
username - String // required
email - String // required & unique
password - String // required
location - Array // required
```
​
Book model
​
```
qr code - String // required
Info - Object // required
Status - String // required
Strikes - Number // required
Story - Object
Clue - string // required
Coords - Array // required
History-Coords - Array
```

Transactions model

```
bookId - ObjectId // required
userThatFrees - ObjectId // required
userThatHunts - ObjectId // required
```
​
## API Endpoints (backend routes)
​
- GET /auth/me
 - 404 if no user in session
 - 200 with user object

- POST /auth/signup
 - 401 if user logged in
 - body:
  - username
  - email
  - password
 - validation
  - fields not empty (422)
  - user not exists (409)
 - create user with encrypted password
 - store user in session
 - 200 with user object

- POST /auth/login
 - 401 if user logged in
 - body:
  - username
  - password
 - validation
  - fields not empty (422)
  - user exists (404)
  - passdword matches (404)
 - store user in session
 - 200 with user object

- POST /auth/logout
 - body: (empty)
 - 204


- POST /alexandria/book/:id
  - Set a strike on book
  -If less than 3 update. If 3 delete.


- GET /alexandria
 - Print books on map
 - Print user on map

- POST /book
 - body:
  - Info:
    - name
    - author
    - synopsis
  - Clue
  - History

 - validation
  - fields not empty
 - create book
  - Status: freed
  - QR
  - Strikes: 0
  - Coordinates
 - 200 with book object

## Links
​
### Git
​
The url to your repository and to your deployed project
​
[Client repository Link](http://github.com)
[Server repository Link](http://github.com)
​
[Deploy Link](http://heroku.com)
​
### Slides
​
The url to your presentation slides
​
[Slides Link](http://slides.com)
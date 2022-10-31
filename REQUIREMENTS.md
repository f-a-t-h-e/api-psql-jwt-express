## API Endpoints

- All routes data are accessed from res.body.data
- Login and Register don't send res.body.data but res.body.user
- [POST] /register & [Patch] /api/v1/users/:id & [POST] /login are the only routes that will give/update tokens

#### Products

- Index [GET] /api/v1/products
- Show [GET] /api/v1/products/:id
- Create [token required] [POST] /api/v1/products
  [- Update [token required] [Patch] /api/v1/products/:id
  ,- Delete [token required] [DELETE] /api/v1/products/:id ]
- [OPTIONAL] Top 5 most popular products [GET] /api/v1/products/top/:num # WHERE num is the number of the top products
- [OPTIONAL] Products by category (args: product category) [GET] /api/v1/products/category/:cat # WHERE cat is the catagory name

#### Users

- Index [token required] [GET] /api/v1/users
- Show [token required] [GET] /api/v1/users/:id
- Create N[token required] [POST] /register
  [- Update [token required] [Patch] /api/v1/users/:id
  ,- Delete [token required] [DELETE] /api/v1/users/:id
  ,- Login [POST] /login]

#### Orders

- Current Order by user (args: user id)[token required] [GET] /api/v1/orders/:id
- [OPTIONAL] Completed Orders by user (args: user id)[token required] [GET] /api/v1/orders
  (- Update [token required] [Patch] /api/v1/orders/:id
  ,- Create [token required] [POST] /api/v1/orders
  ,- Delete [token required] [DELETE] /api/v1/orders/:id )

## Data Shapes

#### Product

- id [string]
- name [string]
- price [string]
- [OPTIONAL] category [string]

#### User

- user_id [string]
- firstName [string]
- lastName [string]
- password [string]

#### Orders

- order_id [string]
- id of each product in the order [string]
- quantity of each product in the order [number]
- user_id [string]
- status of order (active or complete) [false:"active"|true:"complete"]


#### Database_schema 
users
- user_id uuid PRIMARY KEY [uuid]
- email VARCHAR(100) [string]
- first_name VARCHAR(30) [string]
- last_name VARCHAR(30) [string]
- password CHAR(60) [hash_string]
- date TIMESTAMP [date]

products
- product_id uuid PRIMARY KEY [uuid]
- user_id uuid REFERENCES users(user_id) [uuid]
- name VARCHAR(30) [string]
- price FLOAT [float]
- catagory VARCHAR(15) [string]
- date TIMESTAMP [date]

orders
- order_id uuid PRIMARY KEY [uuid]
- user_id uuid REFERENCES users(user_id) [uuid]
- status BOOLEAN [boolean]
- date TIMESTAMP [date]

bills
- bill_id uuid PRIMARY KEY [uuid]
- user_id uuid REFERENCES users(user_id) [uuid]
- order_id uuid REFERENCES orders(order_id) [uuid]
- product_id uuid REFERENCES products(product_id) [uuid]
- quantity INTEGER [integer]
- date TIMESTAMP [date]

## API Endpoints

#### Products

- Index [GET] /api/v1/products
- Show [GET] /api/v1/products/:id
- Create [token required] [POST] /api/v1/products
  [- Update [token required] [Patch] /api/v1/products/:id
  ,- Delete [token required] [DELETE] /api/v1/products/:id ]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required] [GET] /api/v1/users
- Show [token required] [GET] /api/v1/users/:id
- Create N[token required] [POST] /api/v1/users
  [- Update [token required] [Patch] /api/v1/users/:id
  ,- Delete [token required] [DELETE] /api/v1/users/:id ]

#### Orders

- Current Order by user (args: user id)[token required] [GET] /api/v1/orders/:id
- [OPTIONAL] Completed Orders by user (args: user id)[token required] [GET] /api/v1/orders
  [- Update [token required] [Patch] /api/v1/orders/:id
  ,- Create [token required] [POST] /api/v1/orders
  ,- Delete [token required] [DELETE] /api/v1/orders/:id ]

## Data Shapes

#### Product

- id [string]
- name [string]
- price [string]
- [OPTIONAL] category

#### User

- id [string]
- firstName [string]
- lastName [string]
- password [string]

#### Orders

- id [string]
- id of each product in the order [string]
- quantity of each product in the order [string]
- user_id [string]
- status of order (active or complete) ["active"|"complete"]

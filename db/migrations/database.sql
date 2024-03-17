CREATE TYPE item_type AS ENUM ('perishable', 'non-perishable');
CREATE TYPE zone AS ENUM ('central', 'east', 'west', 'north','south');

CREATE TABLE Organization (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE Item (
  id SERIAL PRIMARY KEY,
  type item_type NOT NULL,
  description VARCHAR(255) NOT NULL
);

CREATE TABLE Pricing (
  id SERIAL PRIMARY KEY,
  organization_id INT NOT NULL,
  item_id INT NOT NULL,
  type zone NOT NULL,
  base_distance_in_km FLOAT NOT NULL,
  km_price FLOAT NOT NULL,
  fixed_price FLOAT NOT NULL,
  FOREIGN KEY (organization_id) REFERENCES Organization(id),
  FOREIGN KEY (item_id) REFERENCES Item(id)
);

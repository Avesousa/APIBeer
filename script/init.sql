-- Create table BEER
CREATE TABLE beer(
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    brewery VARCHAR(100) NOT NULL,
    country VARCHAR(30) NOT NULL,
    price INTEGER NOT NULL,
    currency VARCHAR(3) NOT NULL,
    CONSTRAINT beer_pk PRIMARY KEY (id)
);

-- Insert a row on table
INSERT INTO beer (name, brewery, country, price, currency)
VALUES ("Heineken", "Heineken", "Argentina", 8.20, 'USD');
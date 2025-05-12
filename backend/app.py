from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2
import os

app = Flask(__name__)
CORS(app)

DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

def get_connection():
    return psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )

@app.route('/api/products', methods=['GET'])
def get_products():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, name TEXT, price FLOAT, image_url TEXT)")
    cur.execute("SELECT * FROM products")
    rows = cur.fetchall()
    if not rows:
        cur.execute("""
            INSERT INTO products (name, price, image_url)
            VALUES 
                ('Pizza', 8.99, '/images/pizza.jpg'),
                ('Burger', 5.99, '/images/burger.jpg'),
                ('Pasta', 7.49, '/images/pasta.jpg')
        """)
        conn.commit()
        cur.execute("SELECT * FROM products")
        rows = cur.fetchall()
    cur.close()
    conn.close()
    products = [{"id": r[0], "name": r[1], "price": r[2], "image_url": r[3]} for r in rows]
    return jsonify(products)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)

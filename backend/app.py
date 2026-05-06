from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from config import db, config_database
from resources.product import ProductListResource, ProductResource

def app_start():
    app = Flask(__name__)
    CORS(app)
    config_database(app)

    api = Api(app)
    api.add_resource(ProductListResource, '/products')
    api.add_resource(ProductResource, '/products/<int:product_id>')

    with app.app_context():
        db.create_all()
    return app

app = app_start()
if __name__ == '__main__':
    app.run(debug=True)
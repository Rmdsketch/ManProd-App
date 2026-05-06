from flask_restful import Resource
from flask import request
from config import db
from models.product import Product
from schemas.product import product_schema, products_schema
from marshmallow import ValidationError


def not_found():
    return {"message": "product not found"}, 404

class ProductListResource(Resource):
    def get(self):
        products = Product.query.all()
        return {"data": products_schema.dump(products)}, 200

    def post(self):
        json_data = request.get_json()
        if not json_data:
            return {"message": "No input data provided"}, 400

        try:
            product = product_schema.load(json_data)
        except ValidationError as err:
            return {"errors": err.messages}, 400

        db.session.add(product)
        db.session.commit()

        return {"message": "Product created", "data": product_schema.dump(product)}, 201


class ProductResource(Resource):
    def get(self, product_id):
        product = Product.query.get(product_id)
        if not product:
            return not_found()
        return {"data": product_schema.dump(product)}, 200

    def put(self, product_id):
        product = Product.query.get(product_id)
        if not product:
            return not_found()

        json_data = request.get_json()
        if not json_data:
            return {"message": "No input data provided"}, 400

        try:
            updated_product = product_schema.load(json_data, instance=product)
        except ValidationError as err:
            return {"errors": err.messages}, 400

        db.session.commit()
        return {"message": "Product updated", "data": product_schema.dump(updated_product)}, 200

    # def patch(self, product_id):
    #     product = Product.query.get(product_id)
    #     if not product:
    #         return not_found()

    #     json_data = request.get_json()
    #     if not json_data:
    #         return {"message": "No input data provided"}, 400

    #     try:
    #         updated_product = product_schema.load(json_data, instance=product, partial=True)
    #     except ValidationError as err:
    #         return {"errors": err.messages}, 400

    #     db.session.commit()
    #     return {"message": "Product updated", "data": product_schema.dump(updated_product)}, 200

    def delete(self, product_id):
        product = Product.query.get(product_id)
        if not product:
            return not_found()

        db.session.delete(product)
        db.session.commit()
        return {"message": "Product deleted"}, 200
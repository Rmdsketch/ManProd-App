from config import ma
from models.product import Product
from marshmallow import fields, validate
from marshmallow import EXCLUDE

class ProductSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Product
        load_instance = True
        unknown = EXCLUDE

    name = fields.String(required=True, validate=validate.Length(min=1))
    description = fields.String(required=True)
    price = fields.Integer(required=True)
    stock = fields.Integer(required=True)
    category = fields.String(required=True)
    is_active = fields.Boolean(dump_only=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

product_schema = ProductSchema()
products_schema = ProductSchema(many=True)
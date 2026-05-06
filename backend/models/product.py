from config import db
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime,default=datetime.utcnow,nullable=False)
    updated_at = db.Column(db.DateTime,default=datetime.utcnow,onupdate=datetime.utcnow,nullable=False)

    def __repr__(self):
        return f"<Product {self.name}>"
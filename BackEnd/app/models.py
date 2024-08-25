from bson import ObjectId
from flask_pymongo import PyMongo
from app import mongo

def get_user_collection():
    return mongo.db.users

def get_product_collection():
    return mongo.db.products

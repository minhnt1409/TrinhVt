from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from bson import ObjectId
from .models import get_product_collection

main_bp = Blueprint('main_bp', __name__)

@main_bp.route('/products', methods=['POST'])
@jwt_required()
def create_product():
    data = request.get_json()
    name = data.get('name')
    price = data.get('price')

    if not name or not price:
        return jsonify({'message': 'Missing fields'}), 400
    
    product_collection = get_product_collection()
    product_id = product_collection.insert_one({'name': name, 'price': price}).inserted_id
    return jsonify({'id': str(product_id), 'message': 'Product created successfully'}), 201

@main_bp.route('/products', methods=['GET'])
def get_products():
    product_collection = get_product_collection()
    products = product_collection.find()
    return jsonify([{'id': str(product['_id']), 'name': product['name'], 'price': product['price']} for product in products]), 200

@main_bp.route('/products/<product_id>', methods=['GET'])
def get_product(product_id):
    product_collection = get_product_collection()
    product = product_collection.find_one({'_id': ObjectId(product_id)})
    
    if not product:
        return jsonify({'message': 'Product not found'}), 404
    
    return jsonify({'id': str(product['_id']), 'name': product['name'], 'price': product['price']}), 200

@main_bp.route('/products/<product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    data = request.get_json()
    name = data.get('name')
    price = data.get('price')

    if not name or not price:
        return jsonify({'message': 'Missing fields'}), 400
    
    product_collection = get_product_collection()
    result = product_collection.update_one({'_id': ObjectId(product_id)}, {'$set': {'name': name, 'price': price}})
    
    if result.matched_count == 0:
        return jsonify({'message': 'Product not found'}), 404
    
    return jsonify({'message': 'Product updated successfully'}), 200

@main_bp.route('/products/<product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    product_collection = get_product_collection()
    result = product_collection.delete_one({'_id': ObjectId(product_id)})
    
    if result.deleted_count == 0:
        return jsonify({'message': 'Product not found'}), 404
    
    return jsonify({'message': 'Product deleted successfully'}), 200

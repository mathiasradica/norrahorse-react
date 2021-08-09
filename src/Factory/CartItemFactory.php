<?php

namespace App\Factory;

use App\Entity\Cart;
use App\Entity\CartItem;
use App\Entity\Product;

class CartItemFactory
{
    /**
     * Creates an item for a product.
     */
    public function createItem(Product $product, int $quantity): CartItem
    {
        $item = new CartItem();
        $item->setProduct($product);
        $item->setQuantity($quantity);

        return $item;
    }
}
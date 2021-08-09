<?php

namespace App\Entity;

class CartItem
{
    /**
     * @var Product 
     */
    private $product;

    /**
     * @var int
     */
    private $quantity;

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): self
    {
        $this->product = $product;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(?int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }
    
    public function equals(CartItem $item): bool
    {
        return $this->getProduct()->getUrl() == $item->getProduct()->getUrl();
    }
    
    public function getTotal(): float
    {
        return $this->getProduct()->getPrice() * $this->getQuantity();
    }
}

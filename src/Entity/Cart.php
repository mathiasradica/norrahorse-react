<?php

namespace App\Entity;

use App\Entity\Product;

class Cart
{
    /**
     * @var Array
     */
    private $items;

    public function __construct()
    {
        $this->items = [];
    }

    public function getItems(): Array
    {
        return $this->items;
    }

    public function addItem(CartItem $item)
    {
        $existing = false;

        foreach ($this->getItems() as $existingItem) {

            if ($existingItem->equals($item)) {
                
                $existingItem->setQuantity(
                    
                    $existingItem->getQuantity() + $item->getQuantity()
                );

                $existing = true;
                break;
            }
        }

        if(!$existing){
            $this->items[] = $item;
        }
    }

    public function removeItem(CartItem $item)
    {
        foreach($this->getItems() as $index => $_item){
            
            if($item==$_item){
                
                \array_splice($this->items, $index, 1);
            }
        }

    }

    public function removeItemByUrl(string $url)
    {
        $items=$this->getItems();

        foreach($items as $item){
            
            if($item->getProduct()->getUrl()==$url){
                
                $this->removeItem($item);
                
                break;
            }
        }
    }

    public function removeItems()
    {
        foreach ($this->getItems() as $item) {
            
            $this->removeItem($item);
        }

    }

    public function getTotal(): float
    {
        $total = 0.00;

        foreach ($this->getItems() as $item) {
            
            $total += $item->getTotal();
        }

        return $total;
    }

    public function getTotalVat(): float
    {
        $totalVat = 0.00;

        foreach ($this->getItems() as $item) {
            
            $totalVat += $item->getTotal()*$item->getProduct()->getVat();
        }

        return $totalVat;
    }

    public function changeQuantity(string $url, $quantity){
        
        $items=$this->getItems();

        foreach($items as $item){
            
            if($item->getProduct()->getUrl()==$url){
                $item->setQuantity($quantity);
                break;
            }
        }
    }
}

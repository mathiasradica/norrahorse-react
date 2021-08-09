<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Product;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $file=__DIR__ . '\product_data.json';
        $src=file_get_contents($file);
        $data=json_decode($src, false);
        $products=$data->products;

        foreach($products as $prod){
            $product = new Product();
            $product->setTitle($prod->title);
            $product->setUrl($prod->url);
            $product->setImageUrl($prod->imageUrl);
            $product->setPrice($prod->price);
            $product->setVat($prod->vat);
            $product->setShortDescription($prod->shortDescription);
            $product->setLongDescription($prod->longDescription);
            $product->setInStore($prod->inStore);
            $product->setStock($prod->stock);

            $sellingPoints=$prod->sellingPoints;
            $arr=[];
            foreach($sellingPoints as $sp){
                $arr[]=$sp;
            }
            $product->setSellingPoints($arr);

            $contents=$prod->contents;
            $arr=[];
            foreach($contents as $key=>$c){
                $arr[$key]=$c;
                
            }
            $product->setContents($arr);

            $moreInformation=$prod->moreInformation;
            $arr=[];
            foreach($moreInformation as $key=>$i){
                $arr[$key]=$i;
            }
            $product->setMoreInformation($arr);

            $usageRate=$prod->usageRate;
            $arr=[];
            foreach($usageRate as $key=>$u){
                $arr[$key]=$u;
            }
            $product->setUsageRate($arr);

            $features=$prod->features;
            $arr=[];
            foreach($features as $key=>$f){
                $arr[$key]=$f;
            }
            $product->setFeatures($arr);

            $manager->persist($product);
        }
        
        $manager->flush();
    }
}

<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Product;
use App\Entity\Cart;
use App\Storage\CartSessionStorage;
use App\Factory\CartItemFactory;
use Symfony\Component\Serializer\SerializerInterface;

class ProductController extends AbstractController{
    
    private $_cartSessionStorage;
    private $_cartItemFactory;
    private $_serializer;

    public function __construct(CartSessionStorage $cartSessionStorage, CartItemFactory $cartItemFactory, SerializerInterface $serializer){
        
        $this->_cartSessionStorage = $cartSessionStorage;
        $this->_cartItemFactory = $cartItemFactory;
        $this->_serializer = $serializer;
    }

    /**
     * @Route("/", name="home_page", methods={"GET"})
     */
    public function index(): Response {
        
        return $this->render('index.html.twig');
    }

    /**
     * @Route("/{reactRouter}", name="pages", defaults={"reactRouting": null}, methods={"GET"})
     */
    public function routes(): Response {
        
        return $this->render('index.html.twig');
    }

    /**
     * @Route("/api/product/products", name="product_list", methods={"GET"})
     */
    public function list(): Response {
        
        $products=$this->getDoctrine()->getRepository(Product::class)->findAll();
        
        $serializedProducts = $this->_serializer->serialize($products, 'json');
        
        return new Response($serializedProducts);
    }

    /**
     * @Route("/api/product/{url}", name="product_details", methods={"GET"})
     */
    public function details(string $url): Response {
        
        $product=$this->getDoctrine()->getRepository(Product::class)->findOneBy(['url'=>$url]);

        $serializedProduct = $this->_serializer->serialize($product, 'json');
        
        return new Response ($serializedProduct);
    }

    /**
     * @Route("/api/product/add", name="add_item_to_cart", methods={"POST"})
     */
    public function addToCart(Request $request): Response {
        
        $product=$this->getDoctrine()->getRepository(Product::class)->findOneBy(['url'=>$request->get('product')]);
        
        $quantity=$request->get('quantity');

        $cartItem=$this->_cartItemFactory->createItem($product, $quantity);
        
        $cart=$this->_cartSessionStorage->getCart();
        
        $cart->addItem($cartItem);
        
        $this->_cartSessionStorage->setCart($cart);
        
        return $this->json($cart);
    }
}

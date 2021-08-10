<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Cart;
use App\Storage\CartSessionStorage;
use App\Entity\Product;
use Symfony\Component\Serializer\SerializerInterface;

class CartController extends AbstractController
{
    private $_cartSessionStorage;

    private $_serializer;

    public function __construct(CartSessionStorage $cartSessionStorage, SerializerInterface $serializer){
        
        $this->_cartSessionStorage = $cartSessionStorage;

        $this->_serializer = $serializer;
    }

    /**
     * @Route("/checkout/{reactRouter}", name="checkout", defaults={"reactRouting": null}, methods={"GET"})
     */
    public function index(){

        return $this->render('index.html.twig');
    }

    /**
     * @Route("/api/cart/get", name="get_cart", methods={"GET"})
     */
    public function getCart(): Response {
        
        $cart=$this->_cartSessionStorage->getCart();

        $serializedCart = $this->_serializer->serialize($cart, 'json');
        
        return new Response($serializedCart);
    }

    /**
     * @Route("/api/cart/remove/{url}", name="remove_item", methods={"GET"})
     */
    public function removeItem(string $url): Response
    {
        $cart=$this->_cartSessionStorage->getCart();

        $cart->removeItemByUrl($url);
        
        $this->_cartSessionStorage->setCart($cart);

        $serializedCart = $this->_serializer->serialize($cart, 'json');

        return new Response();
    }

    /**
     * @Route("/api/cart/change", name="change_quantity", methods={"POST"})
     */
    public function changeQuantity(Request $request): Response
    {
        $cart=$this->_cartSessionStorage->getCart();

        $cart->changeQuantity($request->get('url'), $request->get('quantity'));

        $this->_cartSessionStorage->setCart($cart);

        return new Response();
    }

    /**
     * @Route("/api/cart/clear", name="clear_cart", methods={"GET"})
     */
    public function clearCart(): Response{

        $cart=$this->_cartSessionStorage->getCart();

        $cart->removeItems();
        
        $this->_cartSessionStorage->setCart($cart);

        return new Response();
    }
}
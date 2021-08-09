<?php

namespace App\Storage;

use App\Entity\Cart;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Serializer\SerializerInterface;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\ArrayDenormalizer;
use Symfony\Component\PropertyInfo\Extractor\ReflectionExtractor;

/**
 * Class CartSessionStorage
 * @package App\Storage
 */

class CartSessionStorage
{
    const CART_KEY_NAME= 'cart_id';
    /**
     * The session storage.
     *
     * @var SessionInterface
     */
    private $_session;

    /**
     * The serializer
     *
     * @var SerializerInterface
     */
    private $_serializer;

    /**
     * CartSessionStorage constructor.
     *
     * @param SessionInterface $session
     * @param SerializerInterface $serializer
     */
    public function __construct(SessionInterface $session, SerializerInterface $serializer)
    {
        $this->_session = $session;
        $this->_serializer = $serializer;
    }

    /**
     * Gets the cart in session.
     *
     * @return Cart
     */
    public function getCart(): ?Cart
    {

        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer(
            null,
            null,
            null,
            new ReflectionExtractor()),
            new ArrayDenormalizer()];

        $serializer = new Serializer($normalizers, $encoders);

        return $this->_session->get(self::CART_KEY_NAME) ? $serializer->deserialize($this->_session->get(self::CART_KEY_NAME), Cart::class, 'json') : new Cart();
    }

    /**
     * Sets the cart in session.
     *
     * @param Cart $cart
     */
    public function setCart(Cart $cart): void
    {
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];

        $serializer = new Serializer($normalizers, $encoders);

        $this->_session->set(self::CART_KEY_NAME, $serializer->serialize($cart, 'json'));
    }
}

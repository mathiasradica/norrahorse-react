/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

import axios from 'axios'

ReactDOM.render(<App />, document.getElementById('root'));

//Footer accordion

let acc = document.getElementsByClassName("accordion_button");

if (acc) {
    for (let i = 0; i < acc.length; i++) {

        acc[i].addEventListener("click", function () {
            
            this.classList.toggle("open")
            
            let panel = this.nextElementSibling
            
            if (panel.style.maxHeight) {
                
                panel.style.maxHeight = null
            
            } else {
                
                panel.style.maxHeight = panel.scrollHeight + "px"
            }
        });
    }
}

//Shipping accordion

export function toggleShippingAccordion() {

    let accordionButtons = document.getElementsByClassName('accordion_button')

    let panels = document.getElementsByClassName('shipping-accordion-panel')

    for (let i = 0; i < accordionButtons.length; i++) {

        accordionButtons[i].classList.toggle("open")

        if (panels[i].style.maxHeight) {

            panels[i].style.maxHeight = null
        } else {

            panels[i].style.maxHeight = panels[i].scrollHeight + "px"
        }
    }
}

// Shipping form validation

export function validateForm() {

    let valid = true

    $('input').each((index, element) => {

        if (!element.checkValidity()) {

            valid = false

            $(element).next().text('Vaadittu kenttä.')

            $(element).css('border', '1px solid #e1771f')

            $(element).prev().css('color', '#e1771f')

        } else {

            $(element).next().text('')

            $(element).css('border', '1px solid lightgray')

            $(element).prev().css('color', '#5f5f5f')
        }
    })

    return valid
}

// Shopping cart

export function getCart() {

    $.get("/api/cart/get", data => {

        if (data.items.length > 0) {

            $(".shopping-cart-summary").removeClass("invisible")

            $(".shopping-cart-items-count").text(data.items.length)

            $(".shopping-cart-total").html(data.total.toFixed(2) + "&nbsp;&euro;")

        } else {

            $(".shopping-cart-summary").addClass("invisible")
        }

    }, 'json')
}

export function validateReduceQuantity() {

    let input = $('.quantity-input').val()

    if (parseInt(input) > 0) {

        $('.quantity-input').val(parseInt(input) - 1)

        return true
    }
    if (parseInt(input.value) === 0) {

        $('.nonpositive-quantity-warning').removeClass('d-none')
    }
}

export function validateIncreaseQuantity() {

    let input = $('.quantity-input').val()

    if (parseInt(input) < 100) {

        $('.quantity-input').val(parseInt(input) + 1)

        return true
    }
}

export function changeQuantity() {

    let input = $('.quantity-input').val()

    let url = $('.url-input').val()

    $.post('api/cart/change', { quantity: parseInt(input), url: url })
    .then(() => focusPage())
}

export function validateQuantity() {

    let input = $('.quantity-input').val()

    if (parseInt(input) > 0 && parseInt(input) < 100) {

        addToCart()

        $('.nonpositive-quantity-warning').addClass('d-none')
        $('.quantity-warning').addClass('d-none')

        return true

    } else if (parseInt(input) < 1) {

        $('.nonpositive-quantity-warning').removeClass('d-none')
        $(".add-cart-confirmed").addClass("d-none")

    } else {

        $('.quantity-warning').removeClass('d-none')
        $(".add-cart-confirmed").addClass("d-none")

    }
}

export function blurPage() {

    $('.page-container').css('opacity', 0.5)

    $('.spinner-border').removeClass('d-none')
}

export function focusPage() {

    $('.page-container').css('opacity', 1)
    $('.spinner-border').addClass('d-none')
}

function addToCart() {

    $(".order-btn").css("opacity", 0.5)
    $(".order-btn-spinner-border").removeClass("d-none")

    $.post("/api/product/add",
        { 'product': $('.url-input').val(), 'quantity': $('.quantity-input').val() },
        () => {

            $(".add-cart-confirmed").removeClass("d-none")
            $(".order-btn").css("opacity", 1)
            $(".order-btn-spinner-border").addClass("d-none")

            return true
        })
}

export function removeItem(url) {

    axios.get("api/cart/remove/" + url).then(() => focusPage())
}

export function toggleExpandedTotalAndTaxTable() {

    if ($('.expanded-total-and-tax-table-container').hasClass('d-none')) {

        $('.expanded-total-and-tax-table-container').removeClass('d-none')
        $('.shipping-form-container').addClass('d-none')
        $('.shipping-progress-indicator-container').addClass('d-none')
        $('.shipping-mobile-header-container').addClass('d-none')
        $('.shipping-main-content-container').removeClass('mt-4')

    } else {

        $('.expanded-total-and-tax-table-container').addClass('d-none')
        $('.shipping-form-container').removeClass('d-none')
        $('.shipping-progress-indicator-container').removeClass('d-none')
        $('.shipping-mobile-header-container').removeClass('d-none')
        $('.shipping-main-content-container').addClass('mt-4')
    }
}

// Product accordion and tabs

export function productAccordion() {

    let productAcc = document.getElementsByClassName(
        "product_accordion_button"
    );

    for (let i = 0; i < productAcc.length; i++) {
        productAcc[i].addEventListener("click", accordionButtonClick);
    }

    let productFeaturesAcc = document.getElementsByClassName(
        "product_features_accordion_button"
    );

    for (let i = 0; i < productFeaturesAcc.length; i++) {
        productFeaturesAcc[i].addEventListener("click", () =>
            productFeaturesAccordionButtonClick(i));
    }
}

export function accordionButtonClick(accordionButton) {

    let productAcc = document.getElementsByClassName(
        "product_accordion_button"
    );

    let tabList = document.getElementById('tab-list')
    tabList.className = ''
    let productPanels = document.getElementsByClassName("product_panel");
    let tabs = document.getElementsByClassName("tab");

    for (let i = 0; i < productAcc.length; i++) {

        if (accordionButton !== productAcc[i] && accordionButton.parentElement !== productAcc[i]) {

            tabs[i].classList.add('d-none')
            productPanels[i].style.maxHeight = null
            productAcc[i].classList.remove('open')

        } else {

            tabList.classList.add('tab' + productAcc[i].id.substring('product-accordion-button'.length))
            document.getElementById('tab' + productAcc[i].id.substring('product-accordion-button'.length)).classList.remove('d-none')
            productPanels[i].style.maxHeight = productPanels[i].scrollHeight + "px"
            productAcc[i].classList.add('open')
        }
    }
}

export function toggle(tab) {

    let tabList = document.getElementById('tab-list')
    let productPanels = document.getElementsByClassName('product_panel')
    let tabs = document.getElementsByClassName('tab')
    let productAcc = document.getElementsByClassName(
        "product_accordion_button"
    );

    tabList.className = ""
    tabList.classList.add(tab)

    for (let i = 0; i < tabs.length; i++) {

        tabs[i].classList.add('d-none')

        if (productAcc[i].id !== 'product-accordion-button' + tab.substring('tab'.length)) {
            
            productPanels[i].style.maxHeight = null
            productAcc[i].classList.remove('open')
        
        } else {
            
            productPanels[i].style.maxHeight = productPanels[i].scrollHeight + "px"
            productAcc[i].classList.add('open')
        }
    }

    document.getElementById(tab).classList.remove('d-none')
}


// Product features accordion

export function productFeaturesAccordionButtonClick() {

    document.getElementsByClassName("product_features_accordion_button")[0].classList.toggle("open")

    document.getElementsByClassName("product_features_accordion_button")[1].classList.toggle("open")

    let productFeaturesPanel1 = document.getElementsByClassName("product_features_accordion_button")[0].nextElementSibling
    let productPanel1 = document.getElementsByClassName("product_features_accordion_button")[0].parentElement.parentElement
    let productFeaturesPanel2 = document.getElementsByClassName("product_features_accordion_button")[1].nextElementSibling
    let productPanel2 = document.getElementsByClassName("product_features_accordion_button")[1].parentElement.parentElement

    if (productFeaturesPanel1.style.maxHeight) {

        productFeaturesPanel1.style.maxHeight = null
        productFeaturesPanel2.style.maxHeight = null

    } else {

        if ($(".product-features-table").html() === "") {

            $(".product-features-spinner-border").removeClass("d-none")

            let url = window.location.pathname.split("/").pop()

            $.get("api/product/" + url, {}, function (data) {

                $(".product-features-spinner-border").addClass("d-none")

                $.each(data.features, function (key, value) {

                    $(".product-features-table").html(`<tr><td>${key}</td><td>${value}</td></tr>`)
                })

                productFeaturesPanel1.style.maxHeight = productFeaturesPanel1.scrollHeight + "px"
                productPanel1.style.maxHeight = productFeaturesPanel1.scrollHeight + productPanel1.scrollHeight + "px"
                productFeaturesPanel2.style.maxHeight = productFeaturesPanel1.scrollHeight + "px"
                productPanel2.style.maxHeight = productFeaturesPanel1.scrollHeight + productPanel1.scrollHeight + "px"
            }, 'json')
        }

        productFeaturesPanel1.style.maxHeight = productFeaturesPanel1.scrollHeight + "px"
        productPanel1.style.maxHeight = productFeaturesPanel1.scrollHeight + productPanel1.scrollHeight + "px"
        productFeaturesPanel2.style.maxHeight = productFeaturesPanel1.scrollHeight + "px"
        productPanel2.style.maxHeight = productFeaturesPanel1.scrollHeight + productPanel1.scrollHeight + "px"
    }
}

//Product carousel

let minPerSlide

export function handleNextLink(nextLink) {

    let items = document.querySelectorAll('#productCarousel .carousel-item')

    let currentIndex = $('#productCarousel .active').index()

    if (currentIndex + 1 === items.length - minPerSlide) {

        nextLink.classList.add("disabled")
    } else {

        nextLink.classList.remove("disabled")
    }
}

export function myFunction() {

    let xs = window.matchMedia("(max-width: 575px)")
    let sm = window.matchMedia("(min-width: 576px) and (max-width: 767px)")
    let md = window.matchMedia("(min-width: 768px) and (max-width: 991px)")
    let lg = window.matchMedia("(min-width: 992px)")

    xs.addListener(myFunction2)
    sm.addListener(myFunction2)
    md.addListener(myFunction2)
    lg.addListener(myFunction2)

    document.querySelector('#productCarousel .carousel-item').classList.add('active')

    myFunction2(xs)
    myFunction2(sm)
    myFunction2(md)
    myFunction2(lg)
}

function myFunction2(x) {

    if (x.matches) {

        if (x.media == "(max-width: 575px)") {

            minPerSlide = 2

        } else if (x.media == "(min-width: 576px) and (max-width: 767px)") {

            minPerSlide = 3

        } else if (x.media == "(min-width: 768px) and (max-width: 991px)") {

            minPerSlide = 4

        } else if (x.media == "(min-width: 992px)") {

            minPerSlide = 5

        }

        myFunction3(minPerSlide)
    }
}

function myFunction3(minPerSlide) {

    let nextLink = $('.carousel-control-next')

    let items = document.querySelectorAll('#productCarousel .carousel-item')

    let numPerSlide = items[0].childElementCount

    if (numPerSlide === 1) {

        items.forEach((el) => {

            let next = el.nextElementSibling

            for (let i = 1; i < minPerSlide; i++) {

                if (!next) {

                    next = items[0]
                }

                let cloneChildren = $(next).children()
                let cloneChild = $(cloneChildren).first().clone(true)
                cloneChild.appendTo(el)
                next = next.nextElementSibling
            }
        })
    } else if (numPerSlide < minPerSlide) {

        items.forEach((el) => {
            let next = el.nextElementSibling

            if (!next) {

                next = items[0]
            }

            let i = numPerSlide

            while (i < minPerSlide) {

                let cloneChild = next.cloneNode(true)
                let j = numPerSlide - 1
                let nextChild = cloneChild.children[j]

                while (nextChild && i < minPerSlide) {

                    el.appendChild(nextChild)
                    nextChild = cloneChild.children[++j]
                    i++
                }

                next = next.nextElementSibling

                if (!next) {

                    next = items[0]
                }
            }
        })

        $('#productCarousel .active')[0].classList.remove('active')
        $('#productCarousel .carousel-item')[0].classList.add('active')

        nextLink[0].classList.remove("disabled")

    } else if (numPerSlide > minPerSlide) {

        items.forEach((el) => {

            for (let i = numPerSlide - 1; i > minPerSlide - 1; i--) {

                el.removeChild(el.children[i])
            }
        })

        $('#productCarousel .active')[0].classList.remove('active')
        $('#productCarousel .carousel-item')[0].classList.add('active')

        nextLink[0].classList.remove("disabled")
    }
}

// Product details

export function loadProduct(product) {

    setTimeout(() => {

        $(".add-to-cart-form").removeClass("invisible")
        $(".order-btn").css("opacity", 1)

        if ($(".in-store")) {

            $(".in-store-circle").addClass("fas fa-circle").css("opacity", 1)
            $(".in-store").text(product.inStore).css("opacity", 1)
            $(".product-details-wait-spinner-border").addClass("d-none")
        }

        $(".vat").text(`Sis. ALV:n (${parseInt(product.vat * 100)}%)`)
        $(".price").html(product.price + " &euro;")

    }, 1000)

}

// Product list details

export function loadProducts(products) {

    products.map((product => {

        $(".price." + product.url).html(product.price + " &euro;")
        $(".vat." + product.url).text(`Sis. ALV:n (${parseInt(product.vat * 100)}%)`)

        if ($(".in-store")) {

            $(".in-store-circle." + product.url).addClass("fas fa-circle").css("opacity", 1)
            $(".in-store." + product.url).text(product.inStore).css("opacity", 1)
        }
    }))
}

// Side navigation

export function openNav() {

    document.getElementById("mySidenav").style.width = "100%"
    $("body").css("overflow-y", "hidden")
}

export function closeNav() {

    document.getElementById("mySidenav").style.width = "0"
    $("body").css("overflow-y", "auto")
}
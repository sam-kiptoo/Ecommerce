var stripeFormModule = $(".stripe-payment-form")
var stripeToken = stripeFormModule.attr("data-token")
var stripeNextUrl = stripeFormModule.attr("data-next-url")
var stripeTemplate = $.templates("#stripeTemplate")
var stripeTemplateContext = {
  nextUrl: stripeNextUrl,
  publish_key: stripeToken,
}
var stripeTemplateHtml = stripeTemplate.render(stripeTemplateContext)
stripeFormModule.html(stripeTemplateHtml)

    // https secure site when live
    var paymentForm = $(".payment-form")
    if (paymentForm.length > 1){
        alert("Only one payment form is allowed per page")
        paymentForm.css('display', 'none')
    }
    else if (paymentForm.length == 1) {
    
    var pubKey = paymentForm.attr('data-token')
    var nextUrl = paymentForm.attr('data-next-url')
        // Create a Stripe client
    var stripe = Stripe(pubKey);
    
    // Create an instance of Elements
    var elements = stripe.elements();
    
    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    
    // Create an instance of the card Element
    var card = elements.create('card', {style: style});
    
    // Add an instance of the card Element into the `card-element` <div>
    card.mount('#card-element');
    
    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', function(event) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });
    
    // Handle form submission
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
    
      stripe.createToken(card).then(function(result) {
        if (result.error) {
          // Inform the user if there was an error
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server
          stripeTokenHandler(nextUrl, result.token);
        }
      });
    });
    
    function stripeTokenHandler(nextUrl, token){
        var paymentMethodEndpoint = '/cart/billing-create'
        var data = {
            'token': token.id
        }
        $.ajax({
            data: data,
            url: paymentMethodEndpoint,
            method: "POST",
            success: function(data){
                // console.log("here is teh data-",data)
                if (nextUrl) {
                    window.location.href = nextUrl
                } else {
                    window.location.reload()
                }
            },
            error: function(error){
                console.log(error)
            }
        })
    }
    }
$(document).ready(function () {
    $('.slider_wrapper').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        autoplay:true
    });


    // geting the path params
    let fetchData = () => {
        const queryString =  window.location.search;
        if (queryString == '') return

        const urlParams = new URLSearchParams(queryString);
        const id =  urlParams.get('id')
        if (!id) return

        let coupon =  urlParams.get('coupon')
        coupon = !coupon ? '' : coupon;

        // let addon =  urlParams.get('addon')
        // addon = !addon ? '' : addon;



        let bodyData =  {
            subscriptions: [{
                planId: id
            }]
        }
        
        if(coupon != ''){
            bodyData.subscriptions[0].coupon = coupon
        }

           
            // $.ajax({
            //     type: 'POST',
            //     url: 'https://panel.priceactionltd.com/apiv2/stripe/payment.php',
            //     dataType: 'json',
            //     data: JSON.stringify(bodyData),
            //     success: function(resp){
            //         console.log(resp);
            //     }
            // });


            fetch('https://panel.priceactionltd.com/apiv2/stripe/payment.php', {
                method: 'POST',
                body: JSON.stringify(bodyData)
              })
              .then(response => response.json())
              .then(result => {
                console.log('Success:', result);
                let {amountDue,discount,plan,planName,subTotal,total} = result.subscriptions[0];
                
                $('#subTotal').text(subTotal)
                $('#pName').text(planName)
                $('#disAm').text(discount)
                $('#total').text(total)



              })
              .catch(error => {
                console.error('Error:', error);
              });

    }
    fetchData()


    // clockDown

    function startTimer(duration, display) {
      var timer = duration, minutes, seconds;
      setInterval(function () {
          minutes = parseInt(timer / 60, 10)
          seconds = parseInt(timer % 60, 10);
  
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
  
          display.text(minutes + ":" + seconds);
  
          if (--timer < 0) {
              timer = duration;
          }
      }, 1000);
  }
  
  var fiveMinutes = 60*2.93333,
          display = $('.clockDown');
      startTimer(fiveMinutes, display);



  








})
$(document).ready(function () {
    $('.slider_wrapper').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        autoplay: true
    });


    // geting the path params
    let fetchData = () => {
        const queryString = window.location.search;
        if (queryString == '') return

        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')
        if (!id) return

        let coupon = urlParams.get('coupon')
        coupon = !coupon ? '' : coupon;

        // let addon =  urlParams.get('addon')
        // addon = !addon ? '' : addon;



        let bodyData = {
            subscriptions: [{
                planId: id
            }]
        }

        if (coupon != '') {
            bodyData.subscriptions[0].coupon = coupon
        }
        fetch('https://panel.priceactionltd.com/apiv2/stripe/payment.php', {
                method: 'POST',
                body: JSON.stringify(bodyData)
            })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
                let {
                    amountDue,
                    discount,
                    plan,
                    planName,
                    subTotal,
                    total
                } = result.subscriptions[0];

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
        var timer = duration,
            minutes, seconds;
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

    var fiveMinutes = 60 * 2.93333,
        display = $('.clockDown');
    startTimer(fiveMinutes, display);


    // exit popup
    $('.close_icon').on('click', function () {
        $('.exit_overlay').removeClass('active')
    })
    $('.applyButton').on('click', function () {
        $('.exit_overlay').removeClass('active')
    })


    function exitPopUp() {
        $('.exit_overlay').addClass('active');
        var twoMinutes = 60 * 2.93333,
            displayTime = $('.couponClock');
        startTimer(twoMinutes, displayTime);
        setTimeout(function () {
            $('.exit_overlay').removeClass('active')

            console.log('done');
        }, 153500);
    }
    let iWidth = window.innerWidth;
    if (iWidth < 768) {
        var dtPercentDown = new ExitIntent(function () {
            var dtPercentUp = new ExitIntent(exitPopUp, {
                trigger: 'scrollUp',
                percentUp: 2
            })

        }, {
            trigger: 'scrollDown',
            percentDown: 5
        });
    } else {
        var dtPercentDown = new ExitIntent(exitPopUp, {
            trigger: 'exitIntent'
        });
    }




    let notifyMe = () => {
        // Notification
        var hover = false;
        var numItems = 4; //this will be total number

        // Below put headline text such as name or title for example: "Jon Tim","ABC XYZ" separate by ,
        let Notifydata = [{
                ProductName: "Scalp 6 Month Subscription",
                subTitle: "Someone in Ontario, Canada purchased a",
                image: "assets/images/scalp-6.png"
            },
            {
                ProductName: "Scalp 12 Month Subscription",
                subTitle: "Someone in Mexico City, Mexico purchased:",
                image: "assets/images/scalp-12.png"
            },
            {
                ProductName: "Forex 12 Month Subscription",
                subTitle: "Someone in Tokyo, Japan purchased:",
                image: "assets/images/forex-12.png"
            },
            {
                ProductName: "Forex 6 Month Subscription",
                subTitle: "Someone in Rome, Italy purchased:",
                image: "assets/images/forex-6.png"
            }
        ]
        // Below put Description that's means it's goes below name or title for example: "he bought lens","he is my awesome clients" separate by ,

        var i = Math.floor((Math.random() * numItems) - 1);
        console.log('i :', i);
        var flag = true;

        $("#someone-purchased img").attr('src', Notifydata[i].image);
        $("#someone-purchased b").text(Notifydata[i].ProductName);
        $("#someone-purchased span").text(Notifydata[i].subTitle);

        function changeClass() {
            if (!hover) {
                $("#someone-purchased").toggleClass('fade-in fade-out');
                if ($(".fade-in").length == 0) {
                    flag = true;
                } else {
                    flag = false;
                }
                if (flag) {
                    setTimeout(function myFunction() {
                        $("#someone-purchased img").attr('src', Notifydata[i].image);
                        $("#someone-purchased b").text(Notifydata[i].ProductName);
                        $("#someone-purchased span").text(Notifydata[i].subTitle);
                        i = Math.floor((Math.random() * numItems) - 1);
                    }, 5000);
                }
            }
        }
        $("#someone-purchased").mouseover(function () {
            hover = true;
        });
        $("#someone-purchased").mouseout(function () {
            hover = false;
        });


        let x = setInterval(changeClass, 5000);

        $('.NcloseIcon').on('click', function () {
            clearInterval(x);
            $("#someone-purchased").toggleClass('fade-in fade-out');
            setTimeout(function () {
                x = setInterval(changeClass, 10000);
            }, 10000)
        })


        console.log('started');
    }

    if (iWidth < 768) {
        var dtPercentDown = new ExitIntent(notifyMe, {
            trigger: 'scrollDown',
            percentDown: 6
        });
    } else {
        notifyMe()
    }

})
function passwordEyeHandler() {
    $(".fa-eye, .fa-eye-slash").click(function () {
        let pass = $(this).parent().find('input:password');
        let txt = $(this).parent().find('input:text');
        console.log(pass.length, txt.length, pass[0], txt[0])
        if (pass.length) {
            console.log("pass")
            pass.prop({ type: "text" });
        }
        else if (txt.length) {
            console.log("txt")
            txt.prop({ type: "password" });
        }

        $(this).toggleClass("fa-eye");
        $(this).toggleClass("fa-eye-slash")

    })

}

var pagesFunctions = {
    updateNavPicker: function (consoles) {
        console.log("updating navbar picker")
        $(".nav .selectpicker").selectpicker('val', consoles);
    },
    gamecard: function () {
        setTimeout(() => {
            /*$(".rent-btn").click(ev => {
              let modal = ev.target;
              let limit = 1;
              while (!modal.classList.contains("modal") && limit++ < 20) {
                modal = modal.parentElement.querySelector(".modal")
                  ? modal.parentElement.querySelector(".modal")
                  : modal.parentElement;
              }
              $(modal).modal("show");
            });*/
            $("game-card .game-card").click(function () {
                $(this)
                    .parent()
                    .find(".game-page.modal")
                    .modal("show");
            });
        }, 10);
    },
    profile: function () {
        function resizeInput() {
            $(this).attr("size", $(this).val().length + 1);
        }
        $('app-profile input[type="text"]')
            // event handler
            .keyup(resizeInput)
            // resize on page load
            .each(resizeInput);
        $("app-profile  .edit-btn").click(() => {
            console.log(222);
            $("input").each(function () {
                console.log($(this));
                resizeInput.bind(this)();
            });
        });
    },
    browse: function () {
        var el = document.querySelector(".duration-range");
        if (el) multirange(el);
        el = document.querySelector(".year-range");
        if (el) multirange(el);
    },
    libCard: function () {
        $(document).ready(function () {
            console.log("liba");
            $("lib-card .game-card .delete-btn").click(function () {
                $(this)
                    .parent()
                    .parent()
                    .find(".delete-modal")
                    .modal("show");
            });
            $("lib-card .game-card .show-btn").click(function () {
                $(this)
                    .parent()
                    .parent()
                    .find(".show-modal")
                    .modal("show");
            });
            $("lib-card .game-card .return-btn").click(function () {
                $(this)
                    .parent()
                    .parent()
                    .find(".return-modal")
                    .modal("show");
            });
            $("lib-card .game-card .btn.return").click(function () {
                $(".modal").modal("hide");
            });
        });
    },
    libraryPage: function () {

        function handler(th) {
            var $input = $(th).hasClass("ghost") ? $(".duration-range") : $(th);
            var val = $input.val();
            if (val.split(",").length > 1) {
                val = val.split(",").map(i => {
                    return i - 0;
                });
            } else {
                val -= 0;
            }
            var min = $input.attr("min") - 0;
            var max = $input.attr("max") - 0;
            console.log(min, val, max);

            if ($(th).hasClass("duration-range")) {
                $("label[for='duration-min']").text(
                    val[0] + (val[0] == 1 ? " week" : " weeks")
                );
                $("label[for='duration-min']").css(
                    "left",
                    (100 * (val[0] - min)) / (max - min) + "%"
                );
                $("label[for='duration-max']").text(
                    val[1] + (val[1] == 1 ? " week" : " weeks")
                );
                $("label[for='duration-max']").css(
                    "left",
                    (100 * (val[1] - min)) / (max - min) + "%"
                );
            }
        }

        setTimeout(() => {
            $(".pill.interactive").click(function () {
                $(this).toggleClass("active");
            });
            /* 
                  $("#new-game-modal #submit-new-game").click(() => {
                    $("#new-game-modal").modal("toggle");
                  });
             */
            $("input").on("input", function () {
                var $input = $(this).hasClass("ghost") ? $(".duration-range") : $(this);
                handler(this);
            });
            if ($(".duration-range").length) handler($(".duration-range")[0]);
            console.log("library");
            var el = document.querySelector(".game-modal .duration-range");
            if (el) multirange(el);

            $("input").on("input", function () {
                var $input = $(this).hasClass("ghost") ? $(".duration-range") : $(this);
                handler(this);
            });
            if ($(".duration-range").length) {
                handler($(".duration-range").eq(0));
            }
        }, 200);
    }
};

function nestedDepth($el) {
    if ($el.prop("tagName").toLowerCase() == "body") return 1;
    return 1 + nestedDepth($el.parent());
}

document.addEventListener("keydown", function (ev) {
    if (ev.code == "Escape") {
        //close modals if 
        if ($(".modal:visible").length && ($("#rate-borrower:visible").length == 0)) {
            console.log("closing modals");
            let max = -1;
            let el = null;
            for (let i = 0; i < $(".modal:visible").length; i++) {
                let a = $(".modal:visible").eq(i);
                let b = nestedDepth(a);
                if (b > max) {
                    el = a;
                    max = b;
                }
            }
            window.eee = el;
            $(el).modal("hide");
            //$(".modal:visible").modal("close");
        }

        else if (($("#rate-borrower:visible").length)) {
            $(".modal:visible .error-message").show()
        }

        //close notif if
        if ($(".notifications:not(.hidden)").length) {
            $(".notifications").addClass("hidden");
            $(".fa-bell").removeClass("clicked");
        }
    }


});

document.addEventListener("click", function (ev) {
    let bell = document.querySelector(".nav .fa-bell");
    let notifList = document.querySelector(".notifications")
    if (!(ev.path.includes(bell) || ev.path.includes(notifList))) {
        if ($(".notifications.hidden").length == 0) {
            $(".notifications").addClass("hidden");
            $(".fa-bell").removeClass("clicked");
        }
    }
})


function showToast(text, extraClass) {
    var x = document.getElementById("snackbar");
    if (extraClass)
        x.className = "show " + extraClass;
    else
        x.className = "show";
    x.innerHTML = text;
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

setTimeout(() => {
    $(document).ready(function () {

        /* 1. Visualizing things on Hover - See next part for action on click */
        $('#stars li').on('mouseover', function () {
            var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

            // Now highlight all the stars that's not after the current hovered star
            $(this).parent().children('li.star').each(function (e) {
                if (e < onStar) {
                    $(this).addClass('hover');
                } else {
                    $(this).removeClass('hover');
                }
            });

        }).on('mouseout', function () {
            $(this).parent().children('li.star').each(function (e) {
                $(this).removeClass('hover');
            });
        });


        /* 2. Action to perform on click */
        $('#stars li').on('click', function () {
            var onStar = parseInt($(this).data('value'), 10); // The star currently selected
            var stars = $(this).parent().children('li.star');

            for (i = 0; i < stars.length; i++) {
                $(stars[i]).removeClass('selected');
            }

            for (i = 0; i < onStar; i++) {
                $(stars[i]).addClass('selected');
            }

            // JUST RESPONSE (Not needed)
            var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
            var msg = "";
            if (ratingValue > 1) {
                msg = "Thanks! You rated this " + ratingValue + " stars.";
            } else {
                msg = "We will improve ourselves. You rated this " + ratingValue + " stars.";
            }

            let meName = $(".user-info .user b").text();
            if (json && json.pending_reviews) {
                for (let email in json.pending_reviews) {
                    if (getUser && getUser(email)) {
                        let bName = getUser(email).first_name + " " + getUser(email).last_name;
                        let lender = null
                        if (meName == bName && (lender = json.pending_reviews[email].pop())) {
                            let lenderName = getUser(lender).first_name + " " + getUser(lender).last_name;
                            setTimeout(() => {
                                $("#rate-borrower").modal("show");
                                $("#rate-borrower .error-message").hide();
                                $("#rate-borrower").attr("data-email", lender);
                                $("#rate-borrower").attr("data-type", "lender");
                                $("#rate-borrower .modal-header").text("Rate " + lenderName);
                            }, 1200)
                        }
                    }
                }
                let mine = json.pending_reviews
            }
            responseMessage(ratingValue);

        });


    });


    function responseMessage(rating) {
        showToast("Your review was sent. Thanks for your feedback!");

        let personType = $("#rate-borrower").data("type");
        let personEmail = $("#rate-borrower").data("email");
        if (personType == "lender") {
            rateLender(personEmail, rating)
        } else {
            rateBorrower(personEmail, rating)
        }


        setTimeout(() => {
            $(".modal").modal("hide");
        }, 1000);
        setTimeout(() => {
            $(".star.selected").removeClass("selected")
        }, 1200)
    }
}, 200)
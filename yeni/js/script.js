// var toggler = document.getElementsByClassName("caret");
// var i;

// for (i = 0; i < toggler.length; i++) {
//   toggler[i].addEventListener("click", function() {
//     this.parentElement.querySelector(".nested").classList.toggle("active");
//     this.classList.toggle("caret-down");
//   });
// }


function list_child(element) {
    $(element).parent().parent().children('.nested').toggleClass("active");
    $(element).toggleClass("caret-down");
    save_all_input();

}


function add_child(element) {
    if ($('.inputvalue').length == 0) {

        if ($(element).parent().parent().parent().children("ul").length == 0) {
            $(element).parent().parent().prepend('<span class="caret caret-down" onclick="list_child(this)"></span>');
            $(element).parent().parent().parent().append('<ul class="nested"><li><span class="node"><span class="name"><input type="text" class="inputvalue"><i class="fa-solid fa-check correcticon" onclick="save(this)"></i></span><span class="icons"><i class="fa-solid fa-pen-to-square" onclick="edit_child(this)"></i><i class="fa-solid fa-user-plus" onclick="add_child(this)"></i><i class="fa-solid fa-trash-can" onclick="delete_child(this)"></i></span></span></li></ul>');
            $(element).parent().parent().parent().children("ul").addClass("active");

        } else {
            $(element).parent().prevAll(".caret").addClass("caret-down");
            $(element).parent().parent().parent().children("ul").addClass("active");
            $(element).parent().parent().parent().children("ul").append('<li><span class="node"><span class="name"><input type="text" class="inputvalue"><i class="fa-solid fa-check correcticon" onclick="save(this)"></i></span><span class="icons"><i class="fa-solid fa-pen-to-square" onclick="edit_child(this)"></i><i class="fa-solid fa-user-plus" onclick="add_child(this)"></i><i class="fa-solid fa-trash-can" onclick="delete_child(this)"></i></span></span></li>');

        }
        $('.inputvalue').focus();

    } else {
        $('.inputvalue').css("border", "1px solid red");
    }



}
function check_child() {

    $('ul').each(function () {

        if ($(this).children().length == 0) {
            $(this).remove();
        }

    });
    $('li').each(function () {

        if ($(this).children("ul").length == 0) {
            $(this).children().children(".caret").remove();
        }

    });

}
function delete_child(element) {
    var result = confirm('Are you sure you want to delete this node ?');
    if (!result) {
        return false;
    } else {
        $(element).parent().parent().parent().remove();
        check_child();
    }

}
function edit_child(element) {

    if ($('.inputvalue').length == 0) {
        $(element).parent().prev().html("<input type='text' class='inputvalue'><i class='fa-solid fa-check correcticon' onclick='save(this,save_data())'></i>");
        $('.inputvalue').focus();
    } else {
        $('.inputvalue').css("border", "1px solid red");
    }
}
function save_data() {
    
}
function save(element, callback) {

    var value = $('.inputvalue').val();
    $(element).parent().text(value);
    if (callback == 'function') {
        save_data();

    }
    //$('*').blur();

    //console.log(value);
}

function save_all_input() {
    $('.inputvalue').each(function () {
        var value = $(this).val();
        if (value.trim() != "") {
            $(this).parent().text(value);

        } else {
            $(this).parent().parent().parent().remove();
            check_child();
        }
    })
}
//$(document).blur();



// function onElementFocused(e)
// {
//     if (e && e.target)
//         document.activeElement = e.target == document ? null : e.target;
// } 

// if (document.addEventListener) 
//     document.addEventListener("focus", onElementFocused, true);
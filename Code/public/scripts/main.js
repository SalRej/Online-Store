

applyFilters();

$('.menu-icon').click(function(){
    const menu =$('.menu');
    if(menu.css('display')=="none"){
        menu.css('display',"block");
    }else{
        menu.css('display',"none");
    }
})

$('.show-filters-button').click(function(){

    $(".menu-container").toggle("1000");

    // $(this).css({
    //     "-webkit-transform": "rotate(180deg)",
    //     "-moz-transform": "rotate(180deg)",
    //     "transform": "rotate(180deg)" /* For modern browsers(CSS3)  */
    // });;
})
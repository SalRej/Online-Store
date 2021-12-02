
const updatePrice=(size,color)=>{
    //if th curren size and color match with any of those in the db 
    //the put the price from the db

    for(let variant of product.variants){
        if(variant.variation_values.color == color && variant.variation_values.size == size){          
           $('.item-price').text(variant.price);
        }
    }

}

const updateColor = (chosenColor) =>{
    //What this function does

    //1.Descktop
    //pick all images witch choseon color and view_type = large 
    //put them before the bootm arrow of the slider(not after the first arrow becouse the order get reversed)
    //and append them to class(mainImage)
    //then loop trough all of them and set the opacity lower exept the firt image which is chosen by defoult
    //and hide all image from class(mainImage) which are not chosen 

    //2.Mobile
    //pick all images witch choseon color and view_type = large 
    //append the to class(mainImage)
    //create small circles which are going to stand under the main image
    //and indicate how many picture there are and on which the user is currnetly on

    const mainImage = $('.main-image');
    mainImage.empty();//clear the contrainer from the previous images


    //container for small circles at the bottom of the main image
    //which indicate on which image you are at the moment
    //as well as how many image are there (only mobile)
    const smallCircles = $('.small-circles');
    smallCircles.empty();
    let setFirst = false;//bool to set the first circle with color 

    //pick the bottom arrow and put all image before it (descktop only)
    const arrowDown = $('.arrow-down');
    //clear the slide from all images
    $('.slide-image-descktop').remove();
    //loop trough all images which are of type large and has a color variation == the chosen color
    for(let imageGroup of product.image_groups){

        if (imageGroup.view_type == "large" && imageGroup.variation_value == chosenColor){
            for(let image of imageGroup.images){
                //create new image element and append it to the container
                //i create two couse i appent the same image to 2 containers
                //and can't appent one element to two 
                const img1 = $("<img>",{class:'slide-image'});
                img1.attr("src",`../../../images/${image.link}`);
                const img2=$("<img>",{class:'slide-image-descktop'});
                img2.attr("src",`../../../images/${image.link}`);          

               mainImage.append(img1);
               arrowDown.before(img2);

               const circle = $("<div>",{class:"circle"});
               if(setFirst==false){
                   circle.css("background-color","grey");
                   setFirst=true;
               }
               smallCircles.append(circle); 
            }
        }
    }

    //lower the opacity every image exept the chosen one (Descktop)
    $('.slide-image-descktop').each(function(index){
        if(index == 0){
            $(this).css("opacity","1");
            $(this).css({"border-style":"solid","border-color":"red"})
            $('.slide-image').eq(0).css("display","inline-block");
        }else{
            $(this).css("opacity","0.5");
            $('.slide-image').eq(index).css("display","none");
        }
    })

}

const moveImagesMobile =()=>{
    //What this function does
    //every time an arrow is clicked
    //it changes the mainImage to be the next one or previous one depending on which arrow is clicked
    //and adjust the small circles below to point at which image im currenty on

    let cuurentImageIndex = 0;
    //rotates the image for the right arrow so it points right
    $('.right-arrow').css({
        "-webkit-transform": "rotate(180deg)",
        "-moz-transform": "rotate(180deg)",
        "transform": "rotate(180deg)" /* For modern browsers(CSS3)  */
    });

    $('.left-arrow').click(function(){

        //if the index is > 0 i can deacrese it to go to the left image
        //if its not swap to the last image 
        if(cuurentImageIndex>0){
            cuurentImageIndex--;
        }else if(cuurentImageIndex == 0){
            cuurentImageIndex = $('.slide-image').length-1;
        }
        $('.slide-image').each(function(index){
            if(index == cuurentImageIndex){
                $(this).css("display","block");
            }else{
                $(this).css("display","none");
            }
        })
        //change the color of the current circle to grey to indicate where i am 
        $('.circle').each(function(index){
            if(cuurentImageIndex==index){
                $(this).css("background-color","grey");
            }else{
                $(this).css("background-color","white");
            }
        })
    
    })
    //do the same for the right arrow 
    $('.right-arrow').click(function(){

        if(cuurentImageIndex<$('.slide-image').length-1){
            cuurentImageIndex++;
        }else if(cuurentImageIndex == $('.slide-image').length-1){
            cuurentImageIndex=0;
        }
        $('.slide-image').each(function(index){
            if(index == cuurentImageIndex){
                $(this).css("display","block");
            }else{
                $(this).css("display","none");
            }
        })
        $('.circle').each(function(index){
            if(cuurentImageIndex==index){
                $(this).css("background-color","grey");
            }else{
                $(this).css("background-color","white");
            }
        })
    })   
}
const moveImagesDescktop =()=>{
    //What this function does
    // every time an arrow is clicked 
    //it puts next image in mainImage depending on which arrow you pressed
    //set the opacity of every image lower than 1 exept to the chosen one 

    //rotate the up arrow so it points to the top 
    $('.arrow-up').css({
        "-webkit-transform": "rotate(180deg)",
        "-moz-transform": "rotate(180deg)",
        "transform": "rotate(180deg)" /* For modern browsers(CSS3)  */
    });

    let currentImageIndex = 0;

    $('.arrow-up').click(function(){
        if(currentImageIndex>0){
            currentImageIndex--;
        }else if(currentImageIndex == 0){
            currentImageIndex = $('.slide-image-descktop').length-1;
        }

        $('.slide-image-descktop').each(function(index){
            if(index == currentImageIndex){
                $(this).css("opacity","1");
                $(this).css({"border-style":"solid","border-color":"red"})
                $('.slide-image').eq(index).css("display","inline");
            }else{
                $(this).css("opacity","0.5");
                $(this).css({"border-style":"none"});
                $('.slide-image').eq(index).css("display","none");
            }
        })

    })
    $('.arrow-down').click(function(){
        if(currentImageIndex<$('.slide-image').length-1){
            currentImageIndex++;
        }else if(currentImageIndex == $('.slide-image').length-1){
            currentImageIndex=0;
        }

        console.log("image " + currentImageIndex);
        $('.slide-image-descktop').each(function(index){
            console.log("index " + index);
            if(index == currentImageIndex){
                $(this).css("opacity","1");
                $(this).css({"border-style":"solid","border-color":"red"})
                $('.slide-image').eq(index).css("display","inline-block");
            }else{
                $(this).css("opacity","0.5");
                $(this).css({"border-style":"none"});
                $('.slide-image').eq(index).css("display","none");
            }
        })
        console.log("=======")

    })
}
const updateQuantity = () =>{
    //if i click symbol take the text node of the middle child 
    //increment or decrement it 
    $('.quantity .wraper').children().eq(0).click(function(){
        let num =  $('.quantity .wraper').children().eq(1).text();
        num = parseInt(num);

        if(num>1){
            num--;
        }
        $('.quantity .wraper').children().eq(1).text(num);
    })

    $('.quantity .wraper').children().eq(2).click(function(){
        let num =  $('.quantity .wraper').children().eq(1).text();
        num = parseInt(num);

        num++;

        $('.quantity .wraper').children().eq(1).text(num);
    })
}
if(typeof(product)!='undefined'){

    let currentColor = product.image_groups[1].variation_value;
    let currentSize;
    if(typeof(product.variation_attributes[1])!='undefined'){
        
        currentSize = product.variation_attributes[1].values[0].name;
    }
    updateColor(currentColor);

    $('.color-variation').each(function(){
        //every time i click on a image i take the id which is the color variant
        $(this).click(function(){
            const chosenColor = $(this).attr('id');
            currentColor=chosenColor;  
            updateColor(chosenColor);
            updatePrice(currentSize,currentColor);
        })
    })
    
    $('.size-variant').each(function(){
        //every time i click on size pick that size and chage the style so i know which size im currently on
        $(this).click(function(){
            //takes the chosen size
            currentSize=$(this).text();
            updatePrice(currentSize,currentColor);

            $('.size-variant').each(function(){
                if(currentSize!=$(this).text()){
                    $(this).css({"border-color":"grey"
                    ,"border-width":"1px"});
                }else{
                    $(this).css({
                                "border-color":"red",
                                "border-width":"2px",
                                "border-bottom-width":"4px"
                                });
                }
            })
        })
    })

    //appends the long description of the prouct 
    //im doing it here couse i had probles doing it in the ejs file
    $('.description .drop-down p').append(product.long_description);

    moveImagesMobile();
    moveImagesDescktop();

    //hide and show description when arrow image is pressed
    $('.description .drop-down .icon').click(function(){
        $('.description .drop-down p').toggle("1000");
    })

    updateQuantity();

    $( "#currency" ).on("change",function() {
        $("#currencyForm").submit();
    })

    //set the chosen value in the options
    $("option").each(function(){
        if($(this).text()==currencyName){
            $(this).attr('selected',true);
        }
    })
    const price = Math.floor((product.price * 4.3869) /currencyValue);
    $(".item-price").text(price);
}
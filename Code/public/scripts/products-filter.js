
const applyFilters = ()=>{
    if(typeof(products)!='undefined'){

        //find min max price of a product
        let min = 1000;
        let max = 0;
        products.map((product)=>{
            if(product.price<min){
                min=product.price;
            }
            if(product.price>max){
                max=product.price+1;
            }
        })
    
        //set the min and max price of the product to the slider
        //using js couse i didn't find a solution with jquery
        document.getElementById('price-slider').min=min;
        document.getElementById('price-slider').max=max;
        let slider = $('#price-slider');
        slider.val(max);
        $(".min-price").text(min);
        $(".max-price").text(max);
        $('#value').text("Value:" + slider.val());
        slider.on("input change",function(){
            $('#value').text("Value:" + slider.val());
        });
    
        //there are duplicate id's and what happens is when i pres on a lable
        //it chesk all other checkboxes with this (diplicate) id 
        //so i remove every duplicate
        let choseVariantHolder = $(".chose-variant-holder");
        const colorVariants = $(".color-variant-checkbox");
        const idDuplicatesCheck=[];
        let j =0 ;
        colorVariants.each(function(){
            if(idDuplicatesCheck.includes($(this).attr("id"))){
                choseVariantHolder.get(j).remove();
            }else{
                idDuplicatesCheck.push($(this).attr("id"));
            }
            j++;
        })
    
        //find all diffrent size the current products has
        let sizeTypes = new Set();
        for(let product of products){
          for(let variation of product.variation_attributes){
            if(variation.name=='Size'){
              for(let values of variation.values){
                sizeTypes.add(values.name);
              }
            }
          }
        }
        //append all size variatns as a chekboxes 
        //into container
        for(type of sizeTypes){
            let label = $("<label>",{for:type,text:type});
            let checkbox =$("<input>",{class:"size-checkbox",type:"checkbox",id:type});
            $(".size-variants").append(checkbox);
            $(".size-variants").append(label);
        }
    
        $('.submit-filters').click(function(){
    
            //push the id of every cheked box in chosenColors
            const chosenColors = [];
            colorVariants.each(function(){
                if($(this).prop('checked')){
                    chosenColors.push($(this).attr("id"));
                }
            })
            //push the id of every cheked box in chosenSizes
            const chosenSizes = [];
            const sizeVariants = $(".size-checkbox");
            sizeVariants.each(function(){
                if($(this).prop('checked')){
                    chosenSizes.push($(this).attr('id'));
                }
            })
    
            let cards = document.querySelectorAll(".card");
            let i = 0;//index for cards
            let countProducts = 0;//how many products are displayed
    
            for(product of products){
                //boolean to chek which products to show
    
                let toShow=true;
                if(product.price>slider.val()){
                    toShow=false;
                }
                //if lenght is 0 it means thaht nothing is cheked and show all
                if(chosenColors.length>0){
                    for(imageGroup of product.image_groups){
                        if(imageGroup.view_type=="swatch"){
                            if(!chosenColors.includes(imageGroup.variation_value) && typeof(imageGroup.variation_value)!='undefined'){     
                                toShow=false;
                                
                            }
                        }
                    }
                }
                if(chosenSizes.length>0){
                    for(let variation of product.variation_attributes){
                        if(variation.name=='Size'){   
                        
                            let doesInclude = false;
                            for(let values of variation.values){
                                if(chosenSizes.includes(values.name)){
                                    doesInclude=true;
                                }
                            }
                            if(doesInclude==false){
                                toShow=false;
                            }
                        }
                    }
                }
    
                if(toShow===true){
                    cards[i].style.display="block";
                    countProducts++;
                }else{
                    cards[i].style.display="none";
                }
                i++;
            }
            $(".num-products").text(countProducts+" ITEMS");
        })

        const dropDownBar= $(".drop-down-descktop,.drop-down-mobile");
        dropDownBar.each(function(){
            $(this).click(function(){
                let parrent = $(this).parent().parent();
                parrent.children().eq(1).toggle("1000");
            })
        })
        
        //every link in class(category) if his id = curren main category then add a chek mark infront of it 
        $(".category a").each(function(){
            if($(this).attr("id")==mainCategory.id){
                const text = $(this).text();
                $(this).text("✓" + text);
                $(this).addClass("checked");
            }
        })
        //every link in class(product type) if his id = curren subCategory then add a chek mark infront of it 
        $(".product-type a").each(function(){
            if($(this).attr("id")==products[0].primary_category_id){
                const text = $(this).text();
                $(this).text("✓" + text);
                $(this).addClass("checked");
            }
        })

        $(".reset-filters button").click(function(){
            $('.size-checkbox').each(function(){
                $(this).prop('checked', false);
            })
            $('.color-variant-checkbox').each(function(){
                $(this).prop('checked', false);
            })
        })

    }
}

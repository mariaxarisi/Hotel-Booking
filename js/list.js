document.addEventListener("DOMContentLoaded", ()=>{
    
    $("#check-in").datepicker({minDate: 0,});
    $("#check-out").datepicker({minDate: 0,});
    
    const minGap = 10;
    const $slider1 = document.querySelector("#slider1");
    const $slider2 = document.querySelector("#slider2");
    const $rangeMin = document.querySelector("#rangeMin");
    const $rangeMax = document.querySelector("#rangeMax");

    $slider1.oninput = function(){
        if(parseInt($slider2.value)-parseInt($slider1.value) <= minGap)
            $slider1.value = parseInt($slider2.value)-minGap;
        $rangeMin.innerHTML = `${$slider1.value}&euro;`;
    }
    $slider2.oninput = function(){
        if(parseInt($slider2.value)-parseInt($slider1.value) <= minGap)
            $slider2.value = parseInt($slider1.value)+minGap;
        $rangeMax.innerHTML = `${$slider2.value}&euro;`;
    }
    $("#check-in").on("change", function() {
        let checkIn = $(this).val();
        $("#check-out").datepicker("option", "minDate", checkIn);
    });
    $("#check-out").on("change", function() {
        let checkOut = $(this).val();
        $("#check-in").datepicker("option", "maxDate", checkOut);
    });
})
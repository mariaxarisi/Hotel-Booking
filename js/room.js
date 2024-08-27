document.addEventListener("DOMContentLoaded", ()=>{
    const $form = document.querySelector("form");
    const $textarea = document.querySelector("#review");
    const $stars = document.querySelectorAll(".add-review  i");
    const $submit = document.querySelector("#submit");
    const $reviews = document.querySelector(".reviews ol");

    class Review{
        constructor(stars, reviewText, date){
            this.stars = stars;
            this.reviewText = reviewText;
            this.date = date;
        }
        reset(){
            this.stars = 0;
            this.reviewText = "";
            this.date = 0;
        }
        allValid(){
            if(this.stars!=0 && this.reviewText!=0){
                $submit.classList.remove("disabled");
                $submit.classList.add("active");
                $submit.disabled = false;
            }
            else{
                $submit.classList.add("disabled");
                $submit.classList.remove("active");
                $submit.disabled = true;
            }
        }
        createReview(){
            let $li = document.createElement("li");
            $li.innerHTML = `username_default
                            <i class="fa-solid fa-star ${this.stars>=1?"yellow-star":""}"></i>
                            <i class="fa-solid fa-star ${this.stars>=2?"yellow-star":""}"></i>
                            <i class="fa-solid fa-star ${this.stars>=3?"yellow-star":""}"></i>
                            <i class="fa-solid fa-star ${this.stars>=4?"yellow-star":""}"></i>
                            <i class="fa-solid fa-star ${this.stars==5?"yellow-star":""}"></i>
                            <div>${this.reviewText}</div>
                            <div class="time">Add time: ${String(this.date.getDate()).padStart(2, '0')}-${String(this.date.getMonth() + 1).padStart(2, '0')}-${this.date.getFullYear()}
                                                        ${String(this.date.getHours()).padStart(2, '0')}:${String(this.date.getMinutes()).padStart(2, '0')}:${String(this.date.getSeconds()).padStart(2, '0')}</div>`;
            return $li;
        }
    }

    let reviews = new Array();
    let review = new Review(0, "", 0);
    
    $stars.forEach((star, index) => {
        star.addEventListener("mouseenter", ()=>{
            for(let i=1; i<=index+1; i++)
                document.querySelector(`#star${i}`).classList.add("yellow-star");
        })
        star.addEventListener("mouseleave", ()=>{
            for(let i=1; i<=5; i++)
                document.querySelector(`#star${i}`).classList.remove("yellow-star");
        })
    });
    $stars.forEach((star, index)=>{
        star.addEventListener("click", (e)=>{
            for(let i=1; i<=index+1; i++)
                document.querySelector(`#star${i}`).style.color = "#ffd000";
            for(let i=index+2; i<6; i++)
                document.querySelector(`#star${i}`).style.color = "rgb(192, 191, 191)";
            review.stars = index+1;
            review.allValid();
        })
    })
    $textarea.addEventListener("input", (e)=>{
        review.reviewText = e.target.value;
        review.allValid();
    })
    $form.addEventListener("submit", (e)=>{
        e.preventDefault();
        review.date = new Date();
        $reviews.appendChild(review.createReview());
        reviews.push(new Review(review.stars, review.reviewText, review.date));
        review.reset();
        review.allValid();
        $textarea.value = "";
        $stars.forEach((star)=>{
            star.style.color = "";
        })
    })
})  
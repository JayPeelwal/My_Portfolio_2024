function valueSetters() {
    gsap.set("#nav a", {
        y: "-100%",
        opacity: 0
    });
    gsap.set("#home span .child", {
        y: "100%"
    })
    gsap.set("#home .row img", {
        opacity: 0
    })
    document.querySelectorAll("#Visual>g>g>path, #Visual>g>g>polyline").forEach(function(character) {
        if (character && typeof character.getTotalLength === 'function') {
            var length = character.getTotalLength();

            // Set initial stroke properties
            character.style.strokeDasharray = length;
            character.style.strokeDashoffset = length;

            // Use GSAP to animate the strokeDashoffset from the total length to 0
        } else {
            console.error('Character or getTotalLength method is undefined', character);
        }
    });
}

function revealToSpan() {
    document.querySelectorAll(".reveal")
        .forEach(function(elem) {
            let spanParent = document.createElement("span");
            let spanChild = document.createElement("span");

            spanParent.classList.add("parent");
            spanChild.classList.add("child");

            spanChild.innerHTML = elem.innerHTML;
            spanParent.appendChild(spanChild);

            elem.innerHTML = "";
            elem.appendChild(spanParent);
        })

}

function loaderAnimation() {


    var tl = gsap.timeline();
    tl
        .from("#loader .child span", {
            x: 100,
            duration: 1,
            stagger: .2,
            ease: Power3.easeInOut
        })
        .to("#loader .parent .child", {
            y: "-110%",
            duration: 0.4,
            ease: Circ.easeInOut
        })
        .to("#loader", {
            height: "0",
            top: 0,
            duration: 1,
            delay: -0.6,
            ease: Circ.easeInOut
        })
        .to("#green", {
            height: "100%",
            top: "0",
            duration: 1,
            delay: -0.6,
            ease: Circ.easeInOut
        })
        .to("#green", {
            height: "0%",
            duration: 1,
            delay: -0.4,
            ease: Circ.easeInOut,
            onComplete: function() {
                animateHomepage();
            }

        })
}

function animateSvg() {

    gsap.to("#Visual>g>g>path, #Visual>g>g>polyline ", {
        strokeDashoffset: 0,
        duration: 2.5,
        delay: -0.8,
        ease: "power1.inOut"
    })

}

function animateHomepage() {


    var tl = gsap.timeline();
    tl
        .to("#nav a", {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: .03,
            ease: Expo.easeInOut,
        })
        .to("#home .parent .child", {
            y: 0,
            duration: 1.2,
            delay: -0.1,
            stagger: 0.3,
            ease: Expo.easeInOut,
        })
        .to("#home .row img", {
            opacity: 1,
            ease: Expo.easeInOut,
            onComplete: function() {
                animateSvg();
            }
        })
}

function locoInitialize() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
    });
}
function cardHover() {
    document.addEventListener("DOMContentLoaded", function () {
        const workSection = document.getElementById('work');
        const elemContainer = document.getElementById('elem');

        document.querySelectorAll("#images .cnt").forEach(cnt => {
            cnt.addEventListener("mouseenter", (event) => {
                const color = event.currentTarget.querySelector('img').dataset.color;

                // Apply grayscale to hovered image
                event.currentTarget.querySelector('img').style.filter = "grayscale(1)";

                // Change work section background color
                workSection.style.backgroundColor = color;

                // Show elem container and position
                elemContainer.style.opacity = 1;
                updateElemPosition(event);
            });

            cnt.addEventListener("mousemove", (event) => {
                updateElemPosition(event);
            });

            cnt.addEventListener("mouseleave", (event) => {
                // Reset grayscale
                event.currentTarget.querySelector('img').style.filter = "grayscale(0)";

                // Reset work section background color
                workSection.style.backgroundColor = '#fff'; // Default background color

                // Hide elem container
                elemContainer.style.opacity = 0;
            });
        });

        // Function to update position of elemContainer
        function updateElemPosition(event) {
            elemContainer.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
        }
    });


   }


// function cardHover() {
//     document.querySelectorAll(".cnt")
//         .forEach(function (cnt) {
//             var showingImage;
//             cnt.addEventListener("mousemove", (dets) => {
//                 document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity = 1;
//                 showingImage  = dets.target;
//                     document.querySelector("#cursor").children[dets.target.dataset.index].style.transform = `translate( ${dets.clientX}px, ${dets.clientY}px)`;
//                 showingImage.style.filter = "grayscale(1)";
//                 document.querySelector("#work").style.backgroundColor = "#" + dets.target.color;
//             })

//             cnt.addEventListener("mouseleave", (dets) => {
//                 document.querySelector("#cursor").children[showingImage.dataset.index].style.opacity = 0;
//                 showingImage.style.filter = "grayscale(0)"   
//                 document.querySelector("#work").style.backgroundColor = "#fff"
//             })
//         })
// } 
 


revealToSpan();
valueSetters();
loaderAnimation();
locoInitialize();
cardHover();

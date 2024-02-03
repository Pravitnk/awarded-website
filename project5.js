console.log('project 5');
//-> smooth scrolling
//       locomotive js and css
//-> gsap
//      
//
//-> scrolltrigger

// import LocomotiveScroll from 'locomotive-scroll';

var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

//function to vary circle
function circleVary() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener('mousemove', function (dets) {
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

        // var xdiff = dets.clientX - xprev;
        xprev = dets.clientX;

        // var ydiff = dets.clientY - yprev;
        yprev = dets.clientY;
        // console.log('x'+xdiff, 'y'+ydiff)

        mousecircle(xscale, yscale);

        timeout = setTimeout(function () {
            document.querySelector('#circlebar').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`
        }, 100);
    });
}

circleVary();

//function to move a circle along with mouse
function mousecircle(xscale, yscale) {
    window.addEventListener('mousemove', function (dets) {
        // console.log(dets.clientX);
        document.querySelector('#circlebar').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`
    })
}


mousecircle();
//function to animate the first page
function firstpageanimation() {
    var tl = gsap.timeline();

    tl.from('#nav', {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo
    })
        .to('.boundingelem', {
            y: 0,
            ease: Expo.easeInOut,
            duration: 1.5,
            delay: -1,
            stagger: .2
        })
        .from('#herofooter', {
            y: -10,
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut,

        })
}

firstpageanimation();

// --> secomd page code
// animation to display the images
document.querySelectorAll('.elem').forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener('mouseleave', function (dets) {

        gsap.to(elem.querySelector('img'), {
            opacity: 0,
            ease: Power3,
            duration: 0.5
        });
    });

    elem.addEventListener('mousemove', function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;

        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(elem.querySelector('img'), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.7)
        });
    });
});

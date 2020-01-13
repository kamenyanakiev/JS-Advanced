function test() {
    const btn = document.querySelector('.hover-button');
    console.dir(btn);
    btn.addEventListener('mouseover', function(){alert("alert")});
}
test();
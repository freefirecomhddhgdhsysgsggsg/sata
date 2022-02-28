function copyToClipboard() {
    const str = document.getElementById('item-to-copy').innerText;
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

function $(query) {
    return document.querySelector(query)
}

function $$(query) {
    return document.querySelectorAll(query)
}

async function getData() {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    const data = await res.json()
    console.log(data)

    updateUI(data)
}

function updateUI(data) {
    const container = $('#crypto-list')
    let html = ''

    data.forEach((item, index) => {
        const div = `
        <div class='crypto-item' id='${index == 0 && 'wheat'}'>
            <div class='info'>
                <img src='${item.image}' />
                <h4 class='name'>${item.name}</h4>
            </div>
            <div class='price'>${item.current_price} USD</div>
        </div>
    `
        html += div;
    })

    container.innerHTML = html;
}


window.onload = function() {

    getData()
}
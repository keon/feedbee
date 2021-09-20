(async function() {
    const open = require('open');

    let session = await open('http://localhost:8080');

    console.log('Feedbee: Development environment opened in browser ✅');
})();
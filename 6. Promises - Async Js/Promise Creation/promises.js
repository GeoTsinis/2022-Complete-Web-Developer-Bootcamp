const fakeRequest = () => {
    return new Promise((resolve, reject) => {
        const rand = Math.random();
        setTimeout(() => {
            if (rand < 0.7) {
                resolve('YOUR FAKE DATA');
            }
            reject('Request Error!')
        }, 1000)
    })
}

fakeRequest('/dogs/1')
.then((data) => {
    console.log("DONE WITH REQUEST");
    console.log("Data: ", data);
})
.catch((err) => {
    console.log("OHH NO!", err);
})
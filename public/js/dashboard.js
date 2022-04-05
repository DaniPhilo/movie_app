const logOut = async () => {
    await fetch('http://localhost:3000/logout', {
        method: 'POST'
    });
    window.location.href = 'http://localhost:3000'
}
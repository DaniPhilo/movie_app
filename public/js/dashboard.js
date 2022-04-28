const logOut = async () => {
    await fetch('/logout', {
        method: 'POST'
    });
    window.location.href = '/'
}
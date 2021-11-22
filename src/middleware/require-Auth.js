export default function(store, next) {
    if (!store.state.isLoggedIn)
    {
        console.log("not logged in");
    }
    else {
        next()
    }
}

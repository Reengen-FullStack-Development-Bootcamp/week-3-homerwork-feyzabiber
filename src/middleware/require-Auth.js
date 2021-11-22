export default function(store, next) {
    if (!store.state.isLoggedIn)
    {
        console.log("not Admin");
    }
    else {
        next()
    }
}

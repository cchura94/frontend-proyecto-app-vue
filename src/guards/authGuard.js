export const authGuard = function(to, from, next){
    try {
        console.log(from)
        const authUser = JSON.parse(localStorage.getItem("authUser"))
        if(authUser && authUser.access_token){
            /* if(to.name == 'Login'){
                next({name: 'Admin'})
            } */
            next()
        }else{
            localStorage.clear();
            next({name: 'Login'});
        }
    }catch(error){
        localStorage.clear();
        next({name: 'Login'})
    }
}
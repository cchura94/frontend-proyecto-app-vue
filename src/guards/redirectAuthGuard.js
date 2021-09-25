export const redirect = function(to, from, next){
    try {
        const authUser = JSON.parse(localStorage.getItem("authUser"))
        if(authUser && authUser.access_token){
            if(from.name == 'Login'){
                next({name: 'Admin'})
            }
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
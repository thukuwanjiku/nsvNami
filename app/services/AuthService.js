var localstorage = require( "nativescript-localstorage" );

export default class AuthService{
    isLoggedIn(){
        return localstorage.getItem('isLoggedIn');
    }

    login(user){
        var registeredUser = JSON.parse(localstorage.getItem('auth_user'));
        var success = user.email === registeredUser.email && user.password === registeredUser.password;
        if(!success){
            return false
        }
        localstorage.setItem('isLoggedIn', true);
        return true;
    }

    logout(){
        localstorage.removeItem('isLoggedIn');
    }

    register(user){
        localstorage.setItem('auth_user', JSON.stringify(user));
        return true;
    }
}
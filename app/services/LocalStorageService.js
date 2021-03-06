/**
 * Module to handle user data saved on localstorage
 */

angular
  .module('AppModule')
  .factory('LocalStorageService', function () {
    const service = {}

    service.SaveUser = SaveUser
    service.IsLogedIn = IsLogedIn
    service.CleanUser = CleanUser
    service.GetUserId = GetUserId
    service.GetUser = GetUser

    return service

    /**
     * Saves user email and user id to localstorage
     * @param {object} user - object user returned by API
     */

    function SaveUser(user) {
      if (!localStorage.useremail || localStorage.useremail === "undefined") {
        localStorage.useremail = user.email
        localStorage.userid = user.id
        localStorage.userFirstName = user.firstName
        localStorage.userLastName = user.lastName
      }
    }

    /**
     * Returns user id from localstorage
     */

    function GetUserId() {
      return localStorage.userid
    }

    /**
    * Returns user id from localstorage
    */

    function GetUser() {
      return {
        id: localStorage.userid,
        email: localStorage.useremail,
        firstName: localStorage.userFirstName,
        lastName: localStorage.userLastName
      }
    }

    /**
     * Verifies if user is loged in
     * User is loged in if localstorage has `useremail` and `userid`
     */

    function IsLogedIn() {
      return localStorage.useremail && localStorage.useremail !== "undefined" && localStorage.userid && localStorage.userid !== "undefined"
    }

    /**
     * Removes User data from localstorage
     */

    function CleanUser() {
      localStorage.useremail = undefined
      localStorage.userid = undefined
    }
  })

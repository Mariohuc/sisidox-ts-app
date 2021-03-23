import Vue from "vue";
import { DateTime } from "luxon";
import axios from "axios";
import VueScrollTo from 'vue-scrollto';
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

import Notifications from 'vue-notification';
  
Vue.use(Notifications)
Vue.use(VueScrollTo)
Vue.use(Loading)

axios.defaults.headers['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
/*
  For more detail about how to use Maps Embed of Google
  check https://developers.google.com/maps/documentation/embed/get-started?hl=es_419 
 */
// Variable name mustn't contain '-', but a file name can do of course

new Vue({
  el: '#welcome',
  data: () => ({
    isLogged: false,
    authUser: {},
    current_place: null,
    places: [
      {
        label: 'Farmacias',
        map_embed_source: 'https://www.google.com/maps/embed/v1/search?q=farmacias%20cerca%20de%20mi&key=AIzaSyCyzI6WMD8tmq7krGGbDJx17cJk8kgNZ3s'
      },
      {
        label: 'Hospitales',
        map_embed_source: 'https://www.google.com/maps/embed/v1/search?q=hospitales%20cerca%20de%20mi&key=AIzaSyCyzI6WMD8tmq7krGGbDJx17cJk8kgNZ3s'
      }
    ],
    place_index: 0,
    current_time: '',
    keyword: '',
    isValid: false,
    isSending: false,
    email: '',
    password : '',
    loginFormErrors: {},
  }),
  mounted(){
    this.current_place = this.places[this.place_index];

    this.updateTime();

    Vue.nextTick(()=> this.getAuthUser());
  },
  watch: {
    place_index(val){
      this.current_place = this.places[val];
    }
  },
  methods:{
    getAuthUser(){
      axios.get('/api/auth/getUser').then(({ data }) => {
        this.authUser = data;
        this.isLogged = true;
      }).catch((error) => console.error(error));
    },
    updateTime(){
      this.current_time = DateTime.now().toFormat('hh:mm:ss a');
      setTimeout( () => this.updateTime(), 500 )
    },
    submitSearchForm(){
      this.$refs.search_form.submit()
      this.isSending = true;
    },
    scrollOnStart(){
      if ($(this).parents('.nav-menu, .mobile-nav').length) {
        $('.nav-menu .active, .mobile-nav .active').removeClass('active');
        $(this).closest('li').addClass('active');
      }

      if ($('#welcome').hasClass('mobile-nav-active')) {
        $('#welcome').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        $('.mobile-nav-overly').fadeOut();
      }
      
    },
    openLoginModal(){
      this.email = this.password = '';
      $('#loginMoldal').modal('show');
    },
    closeLoginModal(){
      $('#loginMoldal').modal('hide');
    },
    validateLoginForm(){
      this.loginFormErrors = {};
      if( !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email) ) 
        this.loginFormErrors.email = 'Por favor ingresa un email valido';

      if( !/^(\w+\S+)$/.test(this.password) )
        this.loginFormErrors.password = 'Por favor ingresa una contraseña';

      return ( Object.keys(this.loginFormErrors).length > 0 ) ? false : true ;
    },
    signIn(){
      let loader = this.$loading.show({
        // Optional parameters
        loader: 'spinner',
        container: this.$refs.loadingContainer,
        canCancel: false,
      });

      if(this.validateLoginForm()){
        axios.post('/api/auth/login', { email: this.email, password: this.password })
          .then( result => { this.closeLoginModal(); this.getAuthUser(); loader.hide() })
          .catch(error => { this.notifyLoginError('Error, email o contraseña incorrecta'); loader.hide() })
      }
    },
    notifyLoginError(msg){
      this.$notify({
        group: 'foo',
        type: 'error',
        text: msg
      });
    },
    logout(){
      axios.get('/api/auth/logout')
          .then(result => window.location.href = '/' )
          .catch(error => alert('Error, intente de nuevo'))
    }
  }
});

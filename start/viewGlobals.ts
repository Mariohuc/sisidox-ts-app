/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import View from '@ioc:Adonis/Core/View'

View.global('supportWhatsappLink', () => {
  const number = '51964810483';
  const message = 'Hola, necesito ayuda!';

  return `https://api.whatsapp.com/send?phone=${number}&text=${encodeURI(message)}`;
});
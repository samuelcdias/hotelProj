const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   dt_entrada: {
      type: Date,
      required: true
   },
   dt_saida: {
      type: Date,
      required: true
   },
   tipoQuarto: {
      type: String
   },
   cliente: {
      type: mongoose.ObjectId,
      ref: 'Cliente', // Nome do model referenciado
      required: true
   }   
})

/*
   Parâmetros do método mongoose.model()
   1º -> Nome do modelo
   2º -> Estrutura (esquema) do modelo
   3º -> Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no
      MongoDB
*/
module.exports = mongoose.model('Reserva', esquema, 'reservas')
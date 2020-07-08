const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   numero: {
      type: Number,
      required: true,
      unique: true
   },
   nro_camas: {
      type: Number,
      required: true,
      min: 1,
      max: 5
   },
   cama_casal: {
      type: Boolean,
      default: false,
   },
   descricao: {
      type: String
   },
   cama_extra: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 3
   },
   dt_manutencao: {
      type: Date
   },
   status: {
      type: String,
      required: true,
      default: 'Disponível',
      enum: ['Disponível','Em manutenção','Executando Limpeza', 'Ocupado', 'Indisponível', 'Desativado']
   },
   preco_alta: {
      type: Number,
      required: true
   },
   preco_baixa: {
      type: Number,
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
module.exports = mongoose.model('Quarto', esquema, 'quartos')
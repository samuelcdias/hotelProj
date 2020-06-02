const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   numero: {
      type: Number,
      required: true,
      unique: true
   },
   nroCamas: {
      type: Number,
      required: true,
      min: 1,
      max: 5
   },
   camaCasal: {
      type: Boolean,
      required: true
   },
   descricao: {
      type: String
   },
   camaExtra: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 3
   },
   dtManutencao: {
      type: Date
   },
   status: {
      type: String,
      required: true,
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
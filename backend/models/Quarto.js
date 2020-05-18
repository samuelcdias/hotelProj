const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   numero: {
       type: Number,
       required: true,
       unique: true
   },
   tipo: {
      type: String,
      required: true
   },
   descricao: {
      type: String
   },
   dtManutencao: {
      type: Date
   },
   status: {
      type: String,
      required: true,
      enum: ['Disponível','Em manutenção','Executando Limpeza', 'Ocupado', 'Indisponível', 'Desativado']
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
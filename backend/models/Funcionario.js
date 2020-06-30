const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   nome: {
      type: String,
      required: true
   },
   cpf: {
      type: String,
      required: true,
      index: { unique: true } // Não deixa repetir CPF no cadastro
   },
   rg: {
      type: String,
      required: true
   },
   endereco: {
      type: String,
      required: true
   },
   telefone: {
      type: String,
      required: true
   },
   email: {
      type: String
   },
   data_nascimento: {
      type: Date,
      required: true
   },
   funcao_area: {
      type: String,
      required: true,
      enum: ['SG','CZ','AT', 'GE']
   // SG = Serviços Gerais
   // CZ = Cozinheiro
   // AT = Atendente
   // GE = Gerente
   }
})

/*
   Parâmetros do método mongoose.model()
   1º -> Nome do modelo
   2º -> Estrutura (esquema) do modelo
   3º -> Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no
      MongoDB
*/
module.exports = mongoose.model('Funcionario', esquema, 'funcionarios')